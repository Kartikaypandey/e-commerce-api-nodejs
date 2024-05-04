const express = require('express');
const router = express.Router();

const {authenticateUser,authorizePermission} = require('../middleware/authentication');

const {getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword} = require('../controller/userController')



router.get('/',authenticateUser,authorizePermission('admin','owner'),getAllUsers);
router.get('/showCurrentUser',authenticateUser, showCurrentUser);
router.patch('/updateUser', authenticateUser,updateUser);
router.patch('/updateUserPassword',authenticateUser, updateUserPassword);

router.get('/:id',authenticateUser, getSingleUser);

module.exports = router;