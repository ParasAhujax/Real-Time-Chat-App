const express = require('express');
const router = express.Router()
const { 
    handleUserLogin, 
    handleUserSignup
} = require('../controllers/authController');
const {
    getAllUsers,
    handleUserLogout,
    chatWithUser
}= require('../controllers/userController');

router.get('/',getAllUsers);
router.post('/signup',handleUserSignup)
router.post('/login',handleUserLogin)

router.get('/logout',handleUserLogout)
router.get('/:userId',chatWithUser)

module.exports = router;