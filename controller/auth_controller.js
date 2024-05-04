const User = require('../model/users');
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors');

const {createCookies,createTokenUser} = require('../utils');

const register = async(req,res) => {
    const {name,email,password} = req.body

    /// email already exist check
    const isEmailAlreadyExist = await User.findOne({email:email})
    if(isEmailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exist');
    }

    /// First account is admin
    const isFirstAccount = (await User.countDocuments({}))=== 0;
    const role = isFirstAccount ? 'admin' : 'user';

    /// User creation in database
    const user = await  User.create({name,email,password,role})
    const tokenUser = createTokenUser(user);

    /// Token creation + assigning cookie
    createCookies(res, tokenUser);

    return res.status(StatusCodes.CREATED).json({user: user});
}


const login = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide a valid email and password');
    }

    const user = await User.findOne({email}) ;
    if(!user){
        throw new CustomError.UnauthenticatedError('User not found');
    }
    const isSamePassword = await user.comparePassword(password)
    if(!isSamePassword){
        throw new CustomError.UnauthenticatedError('Wrong password');
    }

    const tokenUser = createTokenUser(user);
    createCookies(res, tokenUser);

    res.status(StatusCodes.OK).json({tokenUser});

}

const logout = async (req,res) => {
    res.cookie('token','logout', {
        httpOnly: true,
        expires : new Date(Date.now()),
    });

    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}

const deleteAll = async (req,res) => {
    const users = await User.deleteMany({});
    return res.send('Deleted all users');
}


 

module.exports = {login,logout,register,deleteAll};