const db = require('../config/db');

// ================= GET ALL NOTIFICATIONS =================
const notification = async (req, res) => {
  try {
    // Order by uploadDate DESC to show newest notifications first
    const [data] = await db.query('SELECT * FROM notifications ORDER BY uploadDate DESC');
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

// ================= MARK NOTIFICATION AS READ =================
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const studentEmail = req.student.Email; // Get student email from authenticated user
    
    console.log(`📖 Mark as read request: Notification ${id} for student ${studentEmail}`);
    
    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Notification ID is required',
      });
    }

    // Check if notification exists
    const [existingNotification] = await db.query('SELECT * FROM notifications WHERE id = ?', [id]);
    if (!existingNotification.length) {
      console.log(`❌ Notification ${id} not found`);
      return res.status(404).send({
        success: false,
        message: 'Notification not found',
      });
    }

    // Insert or update read status for this student and notification
    const [result] = await db.query(`
      INSERT INTO notification_read_status (notification_id, student_email, is_read, read_at)
      VALUES (?, ?, TRUE, NOW())
      ON DUPLICATE KEY UPDATE
      is_read = TRUE, read_at = NOW()
    `, [id, studentEmail]);
    
    console.log(`✅ Mark as read successful: ${result.affectedRows} rows affected`);
    
    res.status(200).send({
      success: true,
      message: 'Notification marked as read successfully',
    });
  } catch (error) {
    console.error('❌ Error in markAsRead:', error);
    res.status(500).send({
      success: false,
      message: 'Error marking notification as read',
      error: error.message,
    });
  }
};

// ================= GET NOTIFICATIONS FOR STUDENT =================
const getNotificationsForStudent = async (req, res) => {
  try {
    const studentEmail = req.student.Email;
    console.log(`📋 Fetching notifications for student: ${studentEmail}`);

    // Get all notifications with read status for the specific student
    const [data] = await db.query(`
      SELECT 
        n.*,
        COALESCE(nrs.is_read, FALSE) as isRead,
        nrs.read_at
      FROM notifications n
      LEFT JOIN notification_read_status nrs 
        ON n.id = nrs.notification_id 
        AND nrs.student_email = ?
      ORDER BY n.uploadDate DESC
    `, [studentEmail]);

    console.log(`📊 Found ${data.length} notifications for ${studentEmail}`);
    
    // Log read status for debugging
    data.forEach(notification => {
      console.log(`Notification ${notification.id}: isRead = ${notification.isRead}`);
    });

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
    console.error('❌ Error in getNotificationsForStudent:', error);
    res.status(500).send({
      success: false,
      message: 'Error in getting notifications',
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
  markAsRead,
  getNotificationsForStudent,
};
