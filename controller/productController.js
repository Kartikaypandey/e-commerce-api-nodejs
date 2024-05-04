const Product = require('../model/product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')
const path = require('path');
const product = require('../model/product');


const createProduct = async (req,res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.OK).json({product});
};

const getAllProducts = async (req,res) => {
    const product = await Product.find({}).populate('reviews');
    res.status(StatusCodes.OK).json({product});
};

const getSingleProducts = async (req,res) => {
    const product = await Product.find({_id:req.params.id});
    if(!product){
        throw new CustomError.NotFoundError(`No products associated with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product});
};



const updateProduct = async (req,res) => {
    const product = await Product.findOneAndUpdate({_id:req.params.id}, req.body , {new:true , runValidators:true});
    if(!product){
        throw new CustomError.NotFoundError(`No products associated with id: ${req.params.id}`)
    }
    console.log(product);
    res.status(StatusCodes.OK).json({product});
};

const deleteProduct = async (req,res) => {
    const product = await Product.findOne({_id:req.params.id});
    if(!product){
        throw new CustomError.NotFoundError(`No products associated with id: ${req.params.id}`)
    }
    await product.delete();
    res.status(StatusCodes.OK).json({msg: 'Product Deleted'});
};

const uploadImage = async (req,res) => {
    console.log(req.files);
    const image = req.files.image;
    if(!image.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError(`No file present`);
    }
    var maxSize = 1024*1024;
    if(image.size>maxSize){
        throw new CustomError.BadRequestError(`Please upload image smaller than 1mb`);
    }

    const imagePath = path.join(__dirname ,'../public/uploads/'+image.name);
    await image.mv(imagePath);
    res.status(StatusCodes.OK).json({image:`uploads/${image.name}`});
};

const deleteAllProducts  = async (req,res) => {
    await Product.deleteMany({});
    res.status(StatusCodes.OK).json({msg: 'All products deleted'});
}

module.exports = {
    getAllProducts,
    getSingleProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    deleteAllProducts,
}