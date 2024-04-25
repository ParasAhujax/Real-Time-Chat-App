const express = require('express');
const router = express.Router()
const { 
    handleUserLogin, 
    handleUserSignup,
    handleUserLogout,
} = require('../controllers/authController');
const {
    getAllUsers,
    chatWithUser
}= require('../controllers/userController');

router.get('/',getAllUsers);
router.post('/signup',handleUserSignup)
router.post('/login',handleUserLogin)

router.get('/logout',handleUserLogout)
router.get('/:userId',chatWithUser)

module.exports = router;