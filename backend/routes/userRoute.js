const express = require('express');
const router = express.Router()
const { handleUserLogin, handleUserSignup,handleUserLogout,} = require('../controllers/authController');
const { getAllUsers,chatWithUser,  getCurrentUser, getUserById, searchUser}= require('../controllers/userController');
const { isLoggedIn } = require('../middleware/authMiddleware');

router.get('/',getAllUsers);
router.post('/signup',handleUserSignup)
router.post('/login',handleUserLogin)

router.get('/logout',handleUserLogout)
// router.get('/:userId',chatWithUser)

router.get('/getCurrentUser',isLoggedIn,getCurrentUser)
router.get('/searchUser',searchUser)
router.get('/:_id',getUserById)

module.exports = router;