const express = require('express');
const router = express.Router()
const {
    getAllUsers,
    createNewUser
} 
= require('../controllers/userController');
const { handleUserLogin, handleUserSignup } = require('../controllers/authController');

router.get('/',getAllUsers);
router.post('/',createNewUser);
router.post('/signup',handleUserSignup)
router.post('/login',handleUserLogin)
// router.get('/:userId',getUser)

module.exports = router;