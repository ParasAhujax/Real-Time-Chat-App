const User = require('../model/user');
const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
    const token = req.cookies.token;
    if(token){
        try {
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = verifiedToken.email;
            const user = await User.findOne({ email });
            
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            
            req.user = user;
        } 
        catch (error) {
            if (error.message === 'jwt expired') {
                res.clearCookie('token');
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.status(500).json({ error: error});
            }
        }
    }
    next();
}
async function isLoggedIn(req, res, next) {
    if(!req.user) {
        return res.status(401).json({message:"unauthorized"});
    }
    next();
}
async function isAdmin(req, res, next) {
    if(req.user.email){
        const user = await User.findOne({email:req.user.email});
        if(!user) return res.status(403).json({message:"user not found"});

        const role = user.role;
        
        if(role === 'admin'){
            next();
        }
        else{
            res.status(403).json({message:"restriced: access denied"});
        }
    }
    else{
        res.status(403).json({message:"unauthorized"});
    }

}

module.exports = {checkAuth,isLoggedIn,isAdmin};