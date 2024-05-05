const express = require('express');
const { isAdmin, isLoggedIn } = require('../middleware/authMiddleware');
const { storeMessage, getAllMessages, getUserMessages, getFriendsMessage } = require('../controllers/messageController');
const router = express.Router();

router.get('/',isAdmin,getAllMessages)
router.post('/storeMessage',isLoggedIn,storeMessage)
router.get('/getUserMessage/:id',isLoggedIn,getUserMessages)
router.post('/getFriendsMessage',getFriendsMessage)

module.exports = router