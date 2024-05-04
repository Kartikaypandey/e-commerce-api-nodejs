
const CustomError = require('../errors');
const {verifyJWT }= require('../utils')

const authenticateUser = async (req,res,next) => {
    const token = req.signedCookies.token;
    if(!token){
        throw new CustomError.UnauthenticatedError('Invaid credentials');
    }
    try{
        const {name , userId , role} = verifyJWT(token);
        req.user = {name , userId, role};
        next();
    }catch(e){
        throw new CustomError.UnauthenticatedError('Invaid credentials');
    }
}

const authorizePermission = (...roles)  => {
    return (req, res,next) => {
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('User not authorized');
        }
        next();
    }
}


module.exports = {authenticateUser,authorizePermission};
