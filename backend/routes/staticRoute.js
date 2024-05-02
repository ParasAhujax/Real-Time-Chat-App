const express = require('express');
const router = express.Router();
const User = require('../model/user')
const {getOtherUser} = require('../controllers/userController')

// router.get('/',(req,res)=>{
//     if(req.user){
//         console.log(req.cookies.token);
//         console.log(req.user);
//     }

//     res.render('home',{
//         name: req.user.name,
//     })
// })
// router.get('/user/login',(req,res)=>{
//     if(req.user){
//         return res.redirect('/')
//     }
//     res.render('login')
// })
// router.get('/user/signup',(req,res)=>{
//     res.render('signup')
// })

// router.get('/user/:userId',getOtherUser)

module.exports = router