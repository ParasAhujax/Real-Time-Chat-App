const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function checkAuth(req, res, next) {
    
    const token = req.cookies.token;
    if(token){
        const verifiedToken = jwt.verify(token,'secret');
        const email = verifiedToken.email;
        const user = await User.find({email});
        req.user = user;
    }
    next();

}
module.exports = {checkAuth}