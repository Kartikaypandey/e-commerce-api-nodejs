const Review = require('../model/review');
const Product = require('../model/product');
const {StatusCodes} =require('http-status-codes');
const CustomError = require('../errors');
const { checkPermission } = require('../utils');


const createReviews = async(req,res) => {
    const productId = req.body.product;
    const product = await Product.find({_id: productId});
    if(!product){
        throw new CustomError.BadRequestError('Product not found');
    }

    const isReviewAlreadyPresent = await Review.findOne({product:productId , user:req.user.userId});
    if(isReviewAlreadyPresent){
        throw new CustomError.BadRequestError('Review already exist');
    }

    req.body.user = req.user.userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({review});
};

const getAllReviews = async(req,res) => {
    const reviews = await Review.find({})
        .populate({path:'product',select : 'name company price'})
        .populate({path:'user', select: 'name'},) 
    res.status(StatusCodes.OK).json({reviews});
};

const getSingleReviews = async(req,res) => {
    const reviewId = req.params.id;
    const review = await Review.findOne({_id:reviewId});
    if(!review){
        throw new CustomError.BadRequestError('Review do not exist');
    }

    res.status(StatusCodes.OK).json({review});
};

const updateReviews = async(req,res) => {
    const {rating ,title , content} = req.body;
    const reviewId = req.params.id;
    
    const review = await Review.findOne({_id:reviewId});
    if(!review){
        throw new CustomError.BadRequestError('Review do not exist');
    }
    checkPermission(req.user,review.user)
    review.rating = rating;
    review.title = title,
    review.content = content;

    await review.save();
    res.status(StatusCodes.OK).json({review});
};

const deleteReviews = async(req,res) => {
    const reviewId = req.params.id;

    const review = await Review.findOne({_id:reviewId});
    if(!review){
        throw new CustomError.BadRequestError('Review do not exist');
    }
    console.log(req.user.userId);
    console.log(review.user);
    checkPermission(req.user,review.user)
    await review.remove();
    res.status(StatusCodes.OK).json({msg: "review deleted succesfully"});
};

const getAllReviewsAssociatedWithProduct = async (req,res) => {
    const productId = req.params.id;
    const reviews = await Review.find({product:productId});

    res.status(StatusCodes.OK).json({reviews, count: reviews.length});
}

module.exports = {
    getAllReviews,
    getSingleReviews,
    updateReviews,
    createReviews,
    deleteReviews,
    getAllReviewsAssociatedWithProduct
};