const express = require('express');
const router = express.Router();

const {authenticateUser,authorizePermission} = require('../middleware/authentication');

const {
    getAllProducts,
    getSingleProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
} = require('../controller/productController');

const {getAllReviewsAssociatedWithProduct} = require('../controller/reviewsController');

router
    .route('/')
    .get(authenticateUser,getAllProducts)
    .post([authenticateUser,authorizePermission('admin')],createProduct);


router
    .route('/upload')
    .post([authenticateUser,authorizePermission('admin')],uploadImage);

router
    .route('/:id')
    .get(authenticateUser,getSingleProducts)
    .patch([authenticateUser,authorizePermission('admin')],updateProduct)
    .delete([authenticateUser,authorizePermission('admin')],deleteProduct);

router.route('/:id/reviews').get(getAllReviewsAssociatedWithProduct);

module.exports = router;