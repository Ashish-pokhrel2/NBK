db = require("../config/db");

// ================= GET ALL MESSAGES =================
const getMessages = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM messages');
        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No messages found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Messages retrieved successfully',
            totalMessages: data[0].length,
            data: data[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting messages',
            error
        });
    }
};
// ================= GET MESSAGE BY ID =================
const getMessageById = async (req, res) => {
    try {
        const SenderID = req.params.id;
        if (!SenderID) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Sender ID'
            });
        }

        const data = await db.query('SELECT * FROM messages WHERE SenderID = ?', [SenderID]);

        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Message retrieved successfully',
            messageDetails: data[0][0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting message by ID',
            error
        });
    }
};
// ================= CREATE MESSAGE =================
const createMessage = async (req, res) => {
    try{
        const {SenderID, SenderName, SenderEmail, Message, SenderNumber} = req.body;
        if (!SenderID || !SenderName || !SenderEmail || !Message || !SenderNumber) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        const data = await db.query('INSERT INTO messages (SenderID, SenderName, SenderEmail, Message, SenderNumber) VALUES (?, ?, ?, ?, ?)', [SenderID, SenderName, SenderEmail, Message, SenderNumber]);
        res.status(201).send({
            success: true,
            message: 'Message created successfully',
            messageID: data.insertId
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating message',
            error
        });
    }

}

// ================= UPDATE MESSAGE =================
const updateMessage = async (req, res) => {
    try {
        const SenderID = req.params.id;  
        const { SenderName, SenderEmail, Message, SenderNumber } = req.body;

        if (!SenderName || !SenderEmail || !Message || !SenderNumber) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        const data = await db.query(
            'UPDATE messages SET SenderName = ?, SenderEmail = ?, Message = ?, SenderNumber = ? WHERE SenderID = ?',
            [SenderName, SenderEmail, Message, SenderNumber, SenderID]
        );

        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Message updated successfully'
        });

    } catch (error) {
        console.error('Error in updating message:', error);
        res.status(500).send({
            success: false,
            message: 'Error in updating message',
            error: error.message || error
        });
    }
};

// ================= DELETE MESSAGE =================
const deleteMessage = async (req, res) => {
    try {
        const SenderID = req.params.id;
        if (!SenderID) {
            return res.status(400).send({
                success: false,
                message: 'Invalid or missing Sender ID'
            });
        }

        const data = await db.query('DELETE FROM messages WHERE SenderID = ?', [SenderID]);

        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting message',
            error
        });
    }
};
// ================= EXPORTS =================
module.exports = {
    getMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}