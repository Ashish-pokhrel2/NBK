const db = require("../config/db");

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
        const { name, faculty, year, email, number } = req.body;

        if (!name || !faculty || !year || !email || !number) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields: name, faculty, year, email, and number'
            });
        }

        const data = await db.query(
            `INSERT INTO student (name, faculty, year, email, number) VALUES (?, ?, ?, ?, ?)`,
            [name, faculty, year, email, number]
        );

        res.status(201).send({
            success: true,
            message: 'New student record created successfully'
        });
    } catch (error) {
        console.log(error);
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

const { name, faculty, year, email, number } = req.body;

        const data = await db.query(
            `UPDATE student SET name = ?, faculty = ?, year = ?, email = ?, number = ? WHERE email = ?`,
            [name, faculty, year, email, number, studentEmail]
        );

        if (data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'No student found with this email to update'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Student updated successfully'
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

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
