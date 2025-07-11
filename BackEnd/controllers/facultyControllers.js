const db = require("../config/db");

// ================= GET ALL FACULTY =================
const faculty = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM faculty ORDER BY Name ASC');
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
        let { 
            Name, 
            CollegeEmail, 
            Qualification, 
            Position,
            Hierarchy,
            EmploymentType,
            Phone
        } = req.body;

        if (!Name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required'
            });
        }

        // Generate college email if not provided
        if (!CollegeEmail) {
            // Convert name to lowercase, replace spaces with dots, and remove special characters
            const namePart = Name.toLowerCase()
                .replace(/\s+/g, '.')
                .replace(/[^\w.]/g, '');
            
            // Use the first name + last name format for email
            CollegeEmail = `${namePart}@nbk.edu.np`;
        } else if (!CollegeEmail.endsWith('@nbk.edu.np')) {
            // Ensure email ends with correct domain
            const localPart = CollegeEmail.split('@')[0];
            CollegeEmail = `${localPart}@nbk.edu.np`;
        }

        // Check if email already exists
        const existingFaculty = await db.query('SELECT * FROM faculty WHERE CollegeEmail = ?', [CollegeEmail]);
        if (existingFaculty[0].length > 0) {
            return res.status(400).send({
                success: false,
                message: `Email ${CollegeEmail} is already in use`
            });
        }

        await db.query(
            `INSERT INTO faculty (
                Name, CollegeEmail, Qualification, Position, Hierarchy, EmploymentType, Phone
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                Name, CollegeEmail, Qualification || '', Position || '',
                Hierarchy || 'faculty', EmploymentType || 'Full Time', Phone || ''
            ]
        );

        res.status(201).send({
            success: true,
            message: 'Faculty created successfully',
            faculty: {
                Name,
                CollegeEmail,
                Qualification: Qualification || '',
                Position: Position || '',
                Hierarchy: Hierarchy || 'faculty',
                EmploymentType: EmploymentType || 'Full Time',
                Phone: Phone || ''
            }
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
        const { 
            Name, 
            Qualification, 
            Position,
            Hierarchy,
            EmploymentType,
            Phone
        } = req.body;

        if (!Name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required'
            });
        }

        // Check if faculty exists before updating
        const checkFaculty = await db.query('SELECT * FROM faculty WHERE CollegeEmail = ?', [facultyEmail]);
        if (!checkFaculty[0].length) {
            return res.status(404).send({
                success: false,
                message: `Faculty with email ${facultyEmail} not found`
            });
        }

        const data = await db.query(
            `UPDATE faculty SET 
                Name = ?, Qualification = ?, Position = ?, Hierarchy = ?, EmploymentType = ?, Phone = ?
            WHERE CollegeEmail = ?`,
            [
                Name, Qualification || '', Position || '',
                Hierarchy || 'faculty', EmploymentType || 'Full Time', Phone || '', facultyEmail
            ]
        );

        if (data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Faculty not found or no changes made'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Faculty updated successfully',
            updated: {
                Name,
                CollegeEmail: facultyEmail,
                Qualification: Qualification || '',
                Position: Position || '',
                Hierarchy: Hierarchy || 'faculty',
                EmploymentType: EmploymentType || 'Full Time',
                Phone: Phone || ''
            }
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

// ================= GET FACULTY BY HIERARCHY =================
const getFacultyByHierarchy = async (req, res) => {
    try {
        const hierarchy = req.params.hierarchy;
        if (!hierarchy) {
            return res.status(400).send({
                success: false,
                message: 'Hierarchy parameter is required'
            });
        }

        const data = await db.query('SELECT * FROM faculty WHERE Hierarchy = ? ORDER BY Name ASC', [hierarchy]);

        res.status(200).send({
            success: true,
            message: `Faculty retrieved successfully for hierarchy: ${hierarchy}`,
            totalFaculty: data[0].length,
            data: data[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting faculty by hierarchy',
            error
        });
    }
};

// ================= GET ALL HIERARCHIES =================
const getAllHierarchies = async (req, res) => {
    try {
        const data = await db.query('SELECT DISTINCT Hierarchy FROM faculty WHERE Hierarchy IS NOT NULL AND Hierarchy != "" ORDER BY FIELD(Hierarchy, "bod", "executive", "coordinators", "faculty", "management") ASC');

        res.status(200).send({
            success: true,
            message: 'Hierarchies retrieved successfully',
            data: data[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting hierarchies',
            error
        });
    }
};

// ================= GET ALL FACULTY GROUPED BY HIERARCHY =================
const getAllFacultyGrouped = async (req, res) => {
    try {
        // First get all hierarchies in the desired order
        const hierarchyData = await db.query('SELECT DISTINCT Hierarchy FROM faculty WHERE Hierarchy IS NOT NULL AND Hierarchy != "" ORDER BY FIELD(Hierarchy, "bod", "executive", "coordinators", "management", "faculty") ASC');
        
        const hierarchies = hierarchyData[0].map(h => h.Hierarchy);
        const result = {};
        
        // For each hierarchy, get all faculty
        for (const hierarchy of hierarchies) {
            const data = await db.query('SELECT * FROM faculty WHERE Hierarchy = ? ORDER BY Name ASC', [hierarchy]);
            result[hierarchy] = data[0];
        }
        
        // Handle any faculty without a specified hierarchy
        const othersData = await db.query('SELECT * FROM faculty WHERE Hierarchy IS NULL OR Hierarchy = "" ORDER BY Name ASC');
        if (othersData[0].length > 0) {
            result['faculty'] = [...(result['faculty'] || []), ...othersData[0]];
        }
        
        res.status(200).send({
            success: true,
            message: 'Faculty grouped by hierarchy retrieved successfully',
            data: result,
            hierarchyOrder: hierarchies
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting faculty grouped by hierarchy',
            error
        });
    }
};

// ================= UPLOAD FACULTY IMAGE =================
const uploadFacultyImage = async (req, res) => {
    try {
        const facultyEmail = req.params.CollegeEmail;
        
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'No image file uploaded'
            });
        }

        // Check if faculty exists
        const checkFaculty = await db.query('SELECT * FROM faculty WHERE CollegeEmail = ?', [facultyEmail]);
        if (!checkFaculty[0].length) {
            return res.status(404).send({
                success: false,
                message: `Faculty with email ${facultyEmail} not found`
            });
        }

        // Get the file path
        const imageURL = `/uploads/${req.file.filename}`;

        // Update faculty record with image URL
        await db.query('UPDATE faculty SET ImageURL = ? WHERE CollegeEmail = ?', [imageURL, facultyEmail]);

        res.status(200).send({
            success: true,
            message: 'Faculty image uploaded successfully',
            imageURL,
            file: req.file
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error uploading faculty image',
            error
        });
    }
};

module.exports = {
    faculty,
    getFacultyByEmail,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getFacultyByHierarchy,
    getAllHierarchies,
    getAllFacultyGrouped,
    uploadFacultyImage
};
