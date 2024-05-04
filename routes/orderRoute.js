const express = require('express');
const router = express.Router();

const {getAllorders,getSingleorders,updateOrder,createOrder,deleteOrder,getCurrentUserOrders} = require('../controller/orderController');
const {authenticateUser,authorizePermission} = require('../middleware/authentication');

router.route('/')
    .get([authenticateUser,authorizePermission('admin')],getAllorders)
    .post(authenticateUser,createOrder);

router.route('/showAllMyOrders').get(authenticateUser,getCurrentUserOrders)

router.route('/:id')
    .get(authenticateUser,getSingleorders)
    .patch(authenticateUser,updateOrder)
    .delete(authenticateUser,deleteOrder);

module.exports = router;