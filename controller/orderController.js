
const Order = require('../model/order');
const Product = require('../model/product');
const {StatusCodes} =require('http-status-codes');
const CustomError = require('../errors');
const { checkPermission } = require('../utils');

async function fakeStripeData(amount, currency){
    const clientSecret = 'mySecret';
    return {clientSecret,amount};
}

const createOrder = async (req,res) => {
    const {tax, shippingFee, items} = req.body;
    if(!tax || !shippingFee){
       throw new  CustomError.BadRequestError('Please add tax and shipping fee');
    }
    if(!items || items.length < 1){
        throw new  CustomError.BadRequestError('cart items should be greater than 0');
    }
    var subtotal = 0;
    var cartItems = [];
    for(const item of items){
        console.log(item);
        const dbProduct = await Product.findOne({_id:item.product});
        if(!dbProduct){
            throw new  CustomError.NotFoundError(`No products with id ${item.product}`);
        }
        const {name , price , image, _id} = dbProduct;
        const singleOrderItem = {
            amount:item.amount,
            name,
            image,
            price,
            product:_id,
        }

        cartItems = [...cartItems ,singleOrderItem ]
        subtotal += price * item.amount;
    }

    // console.log('-----ORDER-------');
    // console.log(cartItems);
    // console.log(subtotal);

    const total = subtotal + tax + shippingFee;

    const paymentIntent = await fakeStripeData(total,'usd');

    const order = await Order.create({
        tax,
        shippingFee,
        subtotal,
        total,
        orderItems:cartItems,
        clientSecret: paymentIntent.clientSecret,
        user: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({order, clientSecret:order.clientSecret});
};

const getAllorders = async (req,res) => {
    const order = await Order.find({});
    res.status(StatusCodes.OK).json({order});
};

const getSingleorders = async (req,res) => {
    
    const order = await Order.findOne({_id:req.params.id});
    if(!order){
        throw new  CustomError.NotFoundError(`No order with id : ${req.params.id}`);
    }
    
    checkPermission(req.user,order.user);
    res.status(StatusCodes.OK).json({order});
};

const getCurrentUserOrders = async (req,res) => {
    const order = await Order.find({user:req.user.userId});
    res.status(StatusCodes.OK).json({order});
};


const updateOrder = async (req,res) => {
    const {paymentIntent} = req.body;
    const id = req.params.id;
    const order = await Order.findOne({_id:id});
    if(!order){
        throw new  CustomError.NotFoundError(`No order with id : ${id}`);
    }
    checkPermission(req.user,order.user);
    order.clientSecret = paymentIntent;
    order.status = 'paid';
    await order.save();
    res.status(StatusCodes.OK).json({order});
};

const deleteOrder = async (req,res) => {
    const id = req.params.id;
    const order = await Order.findOne({_id:id});
    if(!order){
        throw new  CustomError.NotFoundError(`No order with id : ${id}`);
    }
    checkPermission(req.user,order.user);
    await order.delete();
    res.status(StatusCodes.OK).json({msg: 'order deleted'});
};


module.exports = {getAllorders,getSingleorders,updateOrder,createOrder,deleteOrder,getCurrentUserOrders}