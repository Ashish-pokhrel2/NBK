const db = require("../config/db");
 const getImage = async (req,res)=>{
    try{
        const data = await db.query('SELECT * FROM gallery');
        if(!data || data[0].lrngth == 0){
            return res.status(400).send({
                success: false,
                message: 'No images found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Images retrieved successfully',
            totalImages: data[0].length,
            data: data[0]
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting images',
            error
        });

    }
 }
 const getImageById = async (req,res) => {
    try{
        const imageId = req.params.id;
        if(!imageId){
            return res.status(400).send({
                success: false,
                message: 'Image ID is required or invalid'
            });
        }
        const data = await db.query(`SELECT * FROM gallery WHERE ImageID = ?`, [imageId]);
        if(!data || data[0].length === 0){
            return res.status(404).send({
                success: false,
                message: 'Image not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Image retrieved successfully',
            imageDetails: data[0][0]
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting image by ID',
            error
        });

    }
 }
 const createImage = async (req,res) => {

    try{
        const {ImageID, title, ImagePath} = req.body;
        if(!ImageID || !title || !ImagePath){
            return res.status(400).send({
                success: false,
                message: 'ImageID, title, and ImagePath are required'
            });
        }
        const data = await db.query(
            `INSERT INTO gallery (ImageID, title, ImagePath) VALUES (?,?,?)`,
            [ImageID,title, ImagePath]
        );
        res.status(201).send({
            success: true,
            message: 'New image record created successfully'
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating image',
            error
        });

    }
 }
 const updateImage = async (req, res) => {
    try {
        const ImageID = req.params.id;

        if (!ImageID) {
            return res.status(400).send({
                success: false,
                message: 'Image ID is required or invalid'
            });
        }

        const { title, ImagePath } = req.body;

        const data = await db.query(
            `UPDATE gallery SET title = ?, ImagePath = ? WHERE ImageID = ?`,
            [title, ImagePath, ImageID]
        );

        if (data[0].affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Image not found or no changes made'
            });
        }

        // ✅ Success response
        res.status(200).send({
            success: true,
            message: 'Image updated successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating image',
            error
        });
    }
};

 const deleteImage = async (req,res) => {
    try{
        const ImageID = req.params.id;
        if (!ImageID){
            return res.status(400).send({
                success: false,
                message: 'Image ID is required or invalid'
            });
        }
        await db.query(
            `DELETE FROM gallery WHERE ImageID = ?`,
            [ImageID]
        );

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting image',
            error
        });

    }
 }

 module.exports = {
    getImage,
    getImageById,
    createImage,
    updateImage,
    deleteImage
 }