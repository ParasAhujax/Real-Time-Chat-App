const express = require('express');
const router = express.Router();
const User = require('../models/user')
const {getOtherUser} = require('../controllers/userController')

router.get('/',(req,res)=>{
    if(!req.user){
        return res.redirect('/user/login')
    }
    res.render('home',{
        name: req.user[0].name,
    })
})
router.get('/user/login',(req,res)=>{
    if(req.user){
        return res.redirect('/')
    }
    res.render('login')
})
router.get('/user/signup',(req,res)=>{
    res.render('signup')
})

router.get('/user/:userId',getOtherUser)

module.exports = router