const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    if(!req.user){
        return res.redirect('/user/login')
    }
    res.render('home')
})
router.get('/user/login',(req,res)=>{
    res.render('login')
})
router.get('/user/signup',(req,res)=>{
    res.render('signup')
})
module.exports = router