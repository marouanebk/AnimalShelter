const express = require("express");
// import {getCourse,addCourse,updateCourse,getCourseByID,deleteCourseByID} from "../Controllers/courseController.js";
const Router = express.Router();
const userController = require("../controllers/userController");




Router.post('/login', userController.login);
Router.post('/register', userController.register);
Router.post('/register_infos', userController.addUserInfos);


Router.get('/:id', userController.getUserById);
Router.put('/:id', userController.updateUser);

module.exports = Router;
// module.exports = router;
