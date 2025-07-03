const express = require('express');

const {
    getMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
} = require('../controllers/messagesControllers');

const router = express.Router();

// Routes
router.get('/list', getMessages);                // GET all messages
router.get('/get/:id', getMessageById);          // GET a message by ID
router.post('/create', createMessage);            // CREATE a new message
router.put('/update/:id', updateMessage);        // UPDATE a message by ID
router.delete('/delete/:id', deleteMessage);    // DELETE a message by ID

module.exports = router;
