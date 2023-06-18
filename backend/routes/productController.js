const express = require("express");
// import {getCourse,addCourse,updateCourse,getCourseByID,deleteCourseByID} from "../Controllers/courseController.js";
const Router = express.Router();
const productController = require("../controllers/product_controller");
const checkOutController = require("../controllers/checkout");



Router.get('/getAllProducts', productController.getAllProducts);
Router.get('/getProductById/:id', productController.getProductById);
Router.get('/getByType/:product_type', productController.getByType);


// courseRouter.get('/getCourseByTeacherId/:id', courseController.getCourseByTeacherId);
// courseRouter.get('/getCourseByID/:id', courseController.getCourseByID);
// courseRouter.get('/search/:key', courseController.search);

Router.post('/addProduct', productController.addProduct);
Router.post('/addToCart', productController.addToCart);


Router.post('/addOrder', checkOutController.addOrder);

// courseRouter.put('/updateCourse/:id', courseController.updateCourse);
// courseRouter.put('/addChapter/:id', courseController.addChapter);


// courseRouter.put('/enrollCourse', courseController.enrollCourse);
// courseRouter.get('/getEnrolledCourses/:id', courseController.getEnrolledCourses);
// courseRouter.get('/checkEnrolled/:id--:courseid', courseController.checkEnrolled);


// courseRouter.delete('/deleteCourseByID/:id', courseController.deleteCourseByID);


module.exports = Router;
// module.exports = router;
