const db = require("../config/db");
const bcrypt = require('bcrypt');

// ================= GET ALL STUDENTS =================
const getStudents = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM student');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No students found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Students retrieved successfully',
            totalStudents: data[0].length,
            data: data[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting students',
            error
        });
    }
};

// ================= GET STUDENT BY EMAIL =================
const getStudentById = async (req, res) => {
    try {
        const studentEmail = req.params.email;
        if (!studentEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Email'
            });
        }

        const data = await db.query('SELECT * FROM student WHERE email = ?', [studentEmail]);

        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Student retrieved successfully',
            studentDetails: data[0][0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting student by Email',
            error
        });
    }
};

// ================= CREATE STUDENT =================
const createStudent = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { name, faculty, year, email, number, password } = req.body;

        console.log("Extracted values:", { name, faculty, year, email, number, password: password ? "***" : "missing" });

        if (!name || !faculty || !year || !email || !number || !password) {
            console.log("Validation failed - missing fields");
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields: name, faculty, year, email, number, and password'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await db.query(
            `INSERT INTO student (Name, Faculty, Year, Email, Number, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, faculty, year, email, number, hashedPassword]
        );

        res.status(201).send({
            success: true,
            message: 'New student record created successfully',
            studentInfo: {
                name,
                email,
                number,
                message: 'Student can now log in using their Registration Number (Number field) and password'
            }
        });
    } catch (error) {
        console.log(error);
        // Check for duplicate entry error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send({
                success: false,
                message: 'Student with this email already exists'
            });
        }
        res.status(500).send({
            success: false,
            message: 'Error in creating student',
            error
        });
    }
};

// ================= UPDATE STUDENT =================
const updateStudent = async (req, res) => {
    try {
        const studentEmail = req.params.email;
        if (!studentEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Email or Provide Email'
            });
        }

        const { name, faculty, year, email, number, password } = req.body;

        let updateQuery = `UPDATE student SET Name = ?, Faculty = ?, Year = ?, Email = ?, Number = ?`;
        let updateParams = [name, faculty, year, email, number];

        // If password is provided, hash it and include in update
        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateQuery += `, password = ?`;
            updateParams.push(hashedPassword);
        }

        updateQuery += ` WHERE Email = ?`;
        updateParams.push(studentEmail);

        const data = await db.query(updateQuery, updateParams);

        if (data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'No student found with this email to update'
            });
        }

        res.status(200).send({
            success: true,
            message: password ? 'Student updated successfully (including password)' : 'Student updated successfully',
            studentInfo: {
                name,
                email,
                number,
                message: 'Student can log in using their Registration Number (Number field) and password'
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating student',
            error
        });
    }
};

// ================= DELETE STUDENT =================
const deleteStudent = async (req, res) => {
    try {
        const studentEmail = req.params.email;
        if (!studentEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Email or Provide Email'
            });
        }

        await db.query(`DELETE FROM student WHERE email = ?`, [studentEmail]);

        res.status(200).send({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting student',
            error
        });
    }
};

// ================= TOGGLE LOGIN ACCESS =================
const toggleLoginAccess = async (req, res) => {
    try {
        const studentEmail = req.params.email;
        const { loginAccess } = req.body;

        if (!studentEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Email'
            });
        }

        const data = await db.query(
            'UPDATE student SET loginAccess = ? WHERE Email = ?',
            [loginAccess, studentEmail]
        );

        if (!data || data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).send({
            success: true,
            message: `Login access ${loginAccess ? 'enabled' : 'disabled'} successfully`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating login access',
            error
        });
    }
};

// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
    try {
        const studentEmail = req.params.email;
        const { newPassword } = req.body;

        if (!studentEmail || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'Email and new password are required'
            });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const data = await db.query(
            'UPDATE student SET password = ? WHERE Email = ?',
            [hashedPassword, studentEmail]
        );

        if (!data || data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
            newPassword: newPassword
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in resetting password',
            error
        });
    }
};

// ================= GENERATE RANDOM PASSWORD =================
const generatePassword = async (req, res) => {
    try {
        const studentEmail = req.params.email;

        if (!studentEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Email'
            });
        }

        // Generate random password
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newPassword = '';
        for (let i = 0; i < 8; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const data = await db.query(
            'UPDATE student SET password = ? WHERE Email = ?',
            [hashedPassword, studentEmail]
        );

        if (!data || data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'New password generated successfully',
            newPassword: newPassword
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in generating password',
            error
        });
    }
};

// ================= BULK PASSWORD GENERATION =================
const bulkGeneratePasswords = async (req, res) => {
    try {
        const { studentEmails } = req.body;

        if (!studentEmails || !Array.isArray(studentEmails) || studentEmails.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Student emails array is required'
            });
        }

        const results = [];
        const saltRounds = 10;

        for (const email of studentEmails) {
            try {
                // Generate random password
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let newPassword = '';
                for (let i = 0; i < 8; i++) {
                    newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
                }

                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

                const data = await db.query(
                    'UPDATE student SET password = ? WHERE Email = ?',
                    [hashedPassword, email]
                );

                if (data && data[0].affectedRows > 0) {
                    results.push({ email, newPassword, success: true });
                } else {
                    results.push({ email, error: 'Student not found', success: false });
                }
            } catch (error) {
                results.push({ email, error: error.message, success: false });
            }
        }

        res.status(200).send({
            success: true,
            message: 'Bulk password generation completed',
            results: results
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in bulk password generation',
            error
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    toggleLoginAccess,
    resetPassword,
    generatePassword,
    bulkGeneratePasswords
};
