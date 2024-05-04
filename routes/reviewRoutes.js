const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')
const  {
    getAllReviews,
    getSingleReviews,
    updateReviews,
    createReviews,
    deleteReviews,
} = require('../controller/reviewsController')

router.route('/').get(getAllReviews).post(authenticateUser,createReviews);
router.route('/:id').get(getSingleReviews).patch(authenticateUser,updateReviews).delete(authenticateUser,deleteReviews);

module.exports = router;