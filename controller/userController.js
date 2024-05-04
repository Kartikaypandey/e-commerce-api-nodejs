const User = require('../model/users');
const mongoose = require('mongoose');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const {createTokenUser,createCookies,checkPermission} = require('../utils');

const getAllUsers = async (req,res) => {
    console.log(req.user);
    const users = await User.find({role: 'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});
}

const getSingleUser = async (req,res) => {
    const {id} = req.params;
    console.log(req.user);
    const user = await User.findOne({_id:id}).select('-password');
    if(!user){
        throw new CustomError.BadRequestError('No users with this id found');
    }
    console.log('----YAY------');
    console.log(req.user);
    console.log(user._id);
    checkPermission(req.user,user._id);
    res.status(StatusCodes.OK).json({user});
}

const showCurrentUser = async (req,res) => {
    res.status(StatusCodes.OK).json({user: req.user});
}

const updateUser = async (req,res) => {
    const {name,email} = req.body;
    if(!name || !email){
        throw new CustomError.BadRequestError('please provide name and email');
    }
    const user = await User.findOneAndUpdate({_id:req.user.userId}, {email,name} , {new:true , runValidators:true})

    /// as value is changed (name/email) and our token has name value so need to update it
    const tokenUser = createTokenUser(user);
    createCookies(res,tokenUser),
    res.status(StatusCodes.OK).json({tokenUser});
}

const updateUserPassword = async (req,res) => {
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both passwords');
    }

    const user = await User.findOne({_id: req.user.userId});
    const isSamePassword = await user.comparePassword(oldPassword);

    if(!isSamePassword){
        throw new CustomError.UnauthenticatedError('Invalid credentials');
    }

    /// save new password in db
    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({user});

    
}

module.exports = {getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}