const db = require('../config/db');

// ================= GET ALL NOTIFICATIONS =================
const notification = async (req, res) => {
  try {
    const [data] = await db.query('SELECT * FROM notifications');
    if (!data.length) {
      return res.status(404).send({
        success: false,
        message: 'No notifications found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Notifications retrieved successfully',
      totalNotifications: data.length,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting notifications',
      error: error.message,
    });
  }
};

// ================= GET NOTIFICATION BY ID =================
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Invalid or missing Notification ID',
      });
    }

    const [data] = await db.query('SELECT * FROM notifications WHERE id = ?', [id]);

    if (!data.length) {
      return res.status(404).send({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Notification retrieved successfully',
      notificationDetails: data[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting notification by ID',
      error: error.message,
    });
  }
};

// ================= CREATE NOTIFICATION =================
const createNotification = async (req, res) => {
  try {
    const { title, description } = req.body;
    const uploadDate = new Date();
    const attachment = req.file?.filename || null;

    console.log("🧾 Received file:", req.file); // 👈 debug

    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: 'Title and description are required',
      });
    }

    const [result] = await db.query(
      'INSERT INTO notifications (title, description, uploadDate, Attachment) VALUES (?, ?, ?, ?)',
      [title, description, uploadDate, attachment]
    );

    res.status(201).send({
      success: true,
      message: 'Notification created successfully',
      notificationId: result.insertId,
      attachment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating notification',
      error: error.message,
    });
  }
};


// ================= UPDATE NOTIFICATION =================
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const uploadDate = new Date();
    const attachment = req.file?.filename || null;

    if (!id || !title || !description) {
      return res.status(400).send({
        success: false,
        message: 'ID, title, and description are required',
      });
    }

    const query = attachment
      ? 'UPDATE notifications SET title = ?, description = ?, uploadDate = ?, Attachment = ? WHERE id = ?'
      : 'UPDATE notifications SET title = ?, description = ?, uploadDate = ? WHERE id = ?';

    const values = attachment
      ? [title, description, uploadDate, attachment, id]
      : [title, description, uploadDate, id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Notification updated successfully',
      attachment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating notification',
      error: error.message,
    });
  }
};

// ================= DELETE NOTIFICATION =================
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Invalid or missing Notification ID',
      });
    }

    const [result] = await db.query('DELETE FROM notifications WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting notification',
      error: error.message,
    });
  }
};

module.exports = {
  notification,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
