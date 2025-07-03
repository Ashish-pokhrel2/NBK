const db = require("../config/db");

// ================= GET ALL IMAGES =================
const getImage = async (req, res) => {
  try {
    const [data] = await db.query('SELECT * FROM gallery');
    if (!data.length) {
      return res.status(400).send({
        success: false,
        message: 'No images found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Images retrieved successfully',
      totalImages: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting images',
      error,
    });
  }
};

// ================= GET IMAGE BY ID =================
const getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    if (!imageId) {
      return res.status(400).send({
        success: false,
        message: 'Image ID is required or invalid',
      });
    }

    const [data] = await db.query(`SELECT * FROM gallery WHERE ImageID = ?`, [imageId]);
    if (!data.length) {
      return res.status(404).send({
        success: false,
        message: 'Image not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Image retrieved successfully',
      imageDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting image by ID',
      error,
    });
  }
};

// ================= CREATE IMAGE (with file upload) =================
const createImage = async (req, res) => {
  try {
    console.log('Create Image: req.body:', req.body);
    console.log('Create Image: req.file:', req.file);

    // Accept either 'title' or 'Title' to avoid case issues
    const title = req.body.title || req.body.Title;

    // Multer field can be either 'image' or 'Image'
    const imagePath = req.file?.filename || null;

    if (!title || !imagePath) {
      return res.status(400).send({
        success: false,
        message: 'Title and image file are required',
      });
    }

    const [result] = await db.query(
      `INSERT INTO gallery (title, ImagePath) VALUES (?, ?)`,
      [title, imagePath]
    );

    res.status(201).send({
      success: true,
      message: 'New image record created successfully',
      imageId: result.insertId,
      imagePath, // you can send back image filename if needed
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating image',
      error,
    });
  }
};

// ================= UPDATE IMAGE =================
const updateImage = async (req, res) => {
  try {
    console.log('Update Image: req.params.id:', req.params.id);
    console.log('Update Image: req.body:', req.body);
    console.log('Update Image: req.file:', req.file);

    const ImageID = req.params.id;
    const title = req.body.title || req.body.Title;
    const imagePath = req.file?.filename || null;

    if (!ImageID || !title) {
      return res.status(400).send({
        success: false,
        message: 'Image ID and title are required',
      });
    }

    const query = imagePath
      ? `UPDATE gallery SET title = ?, ImagePath = ? WHERE ImageID = ?`
      : `UPDATE gallery SET title = ? WHERE ImageID = ?`;

    const values = imagePath
      ? [title, imagePath, ImageID]
      : [title, ImageID];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: 'Image not found or no changes made',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Image updated successfully',
      imagePath: imagePath || undefined,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating image',
      error,
    });
  }
};

// ================= DELETE IMAGE =================
const deleteImage = async (req, res) => {
  try {
    const ImageID = req.params.id;
    if (!ImageID) {
      return res.status(400).send({
        success: false,
        message: 'Image ID is required or invalid',
      });
    }

    const [result] = await db.query(
      `DELETE FROM gallery WHERE ImageID = ?`,
      [ImageID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: 'Image not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting image',
      error,
    });
  }
};

module.exports = {
  getImage,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};
