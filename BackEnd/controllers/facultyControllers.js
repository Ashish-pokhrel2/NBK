const db = require("../config/db");

// ================= GET ALL FACULTY =================
const faculty = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM faculty');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No faculty found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Faculty retrieved successfully',
            totalFaculty: data[0].length,
            data: data[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting faculty',
            error
        });
    }
};

// ================= GET FACULTY BY EMAIL =================
const getFacultyByEmail = async (req, res) => {
    try {
        const facultyEmail = req.params.CollegeEmail;
        if (!facultyEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Email'
            });
        }

        const data = await db.query('SELECT * FROM faculty WHERE CollegeEmail = ?', [facultyEmail]);

        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Faculty not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Faculty retrieved successfully',
            facultyDetails: data[0][0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting faculty by email',
            error
        });
    }
};

// ================= CREATE FACULTY =================
const createFaculty = async (req, res) => {
    try {
        const { Name, CollegeEmail, Qualification, Department, Description } = req.body;

        if (!Name || !CollegeEmail || !Qualification || !Department || !Description) {
            return res.status(400).send({
                success: false,
                message: 'All fields (Name, CollegeEmail, Qualification, Department, Description) are required'
            });
        }

        await db.query(
            'INSERT INTO faculty (Name, CollegeEmail, Qualification, Department, Description) VALUES (?, ?, ?, ?, ?)',
            [Name, CollegeEmail, Qualification, Department, Description]
        );

        res.status(201).send({
            success: true,
            message: 'Faculty created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating faculty',
            error
        });
    }
};

// ================= UPDATE FACULTY =================
const updateFaculty = async (req, res) => {
    try {
        const facultyEmail = req.params.CollegeEmail;
        const { Name, Qualification, Department, Description } = req.body;

        if (!Name || !Qualification || !Department || !Description) {
            return res.status(400).send({
                success: false,
                message: 'Name, Qualification, Department, and Description are required'
            });
        }

        const data = await db.query(
            'UPDATE faculty SET Name = ?, Qualification = ?, Department = ?, Description = ? WHERE CollegeEmail = ?',
            [Name, Qualification, Department, Description, facultyEmail]
        );

        if (data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Faculty not found or no changes made'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Faculty updated successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating faculty',
            error
        });
    }
};

// ================= DELETE FACULTY =================
const deleteFaculty = async (req, res) => {
    try {
        const facultyEmail = req.params.CollegeEmail;
        if (!facultyEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Email'
            });
        }

        const data = await db.query('DELETE FROM faculty WHERE CollegeEmail = ?', [facultyEmail]);

        if (data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Faculty not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Faculty deleted successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting faculty',
            error
        });
    }
};

module.exports = {
    faculty,
    getFacultyByEmail,
    createFaculty,
    updateFaculty,
    deleteFaculty
};
