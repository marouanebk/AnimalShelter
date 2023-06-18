const product = require("../models/product_model.js");
const Cart = require("../models/cart_model.js");

// const User = require("../models/user.model");



exports.getAllProducts = async (req, res, next) => {
    let products
    try {
        // course = await courses.find()
        products = await product.find()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    if (!products) {
        return res.status(404).json({ message: 'Cannot find products' })
    }
    return res.status(200).send({ result: products })
}

exports.getByType = async (req, res, next) => {
    let product_type = req.params.product_type;

    let products
    try {
        // course = await courses.find()
        products = await product.find({type : product_type})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    if (!products) {
        return res.status(404).json({ message: 'Cannot find products' })
    }
    return res.status(200).send({ result: products })
}


exports.getProductById = async (req, res, next) => {
    let product_id = req.params.id;

    let item
    try {
        item = await product.findById({ _id: product_id })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    if (!item) {
        return res.status(404).json({ message: 'Cannot find product' })
    }
    return res.status(200).send({ result: item })
}


exports.addProduct = async (req, res, next) => {
    const { title, flavors, benifits, price, size, picture, type , description } = req.body;
    const newCourse = new product({
        title: title,
        flavors: flavors,
        benifits: benifits,
        price: price,
        size: size,
        picture: picture,
        type: type,
        description:description,
    })

    try {
        console.log("before adding item");
        await newCourse.save()
    } catch (err) {
        return res.status(499).json({ message: err.message })
    }
    return res.status(200).json(newCourse)
}


exports.addToCart = async (req, res, next) => {

    const productId = req.body.productId;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await product.findById(productId);
    cart.add(product, product.id);
    req.session.cart = cart;
    return res.status(200).json()
}





// exports.updateCourse = async (req, res, next) => {
//     const { title, description, year, courseContent } = req.body
//     const courseId = req.params.id;
//     let course;
//     try {
//         course = await courses.findByIdAndUpdate(courseId, {
//             title,
//             description,
//             year,
//             courseContent
//         })
//     } catch (err) {
//         return res.status(500).json({ message: err.message })

//     }
//     if (!course) {
//         return res.status(404).json({ message: 'Cannot find course' })
//     }
//     return res.status(200).json(course)
// }


// exports.getCourseByID = async (req, res, next) => {

//     const courseId = req.params.id;
//     let course;
//     try { course = await courses.findById({ _id: courseId }) } catch (err) {
//         return res.status(500).json({ message: err.message })

//     }
//     if (!course) {
//         return res.status(404).json({ message: 'Cannot find course' })
//     }
//     teacherid = course.user.toString();
//     const _user = await User.findById(teacherid);
//     console.log(_user);
//     fullname = _user.fullname;
//     return res.status(200).send({ result: { course, fullname } })
// }

// exports.addChapter = async (req, res, next) => {
//     const newChapter = req.body;
//     const courseId = req.params.id;


//     if (newChapter.quizzContent != "") {
//         var array = JSON.parse(newChapter.quizzContent);
//         newChapter.quizzContent = array;
//     }

//     if (newChapter.quizzContent == "") {
//         newChapter.quizzContent = undefined
//     }
//     if (newChapter.url == null) {
//         newChapter.url == undefined
//     }

//     let course;

//     if (newChapter === null) {
//         // return res.status(404).json({ message: 'Cannot add chapter' });
//     } else {

//         try {
//             course = await courses.findByIdAndUpdate(courseId, {
//                 $push: { courseContent: newChapter }
//             })
//         } catch (err) {
//             return res.status(500).json({ message: err.message })

//         }
//         if (!course) {
//             return res.status(404).json({ message: 'Cannot find course' })
//         }

//         return res.status(200).json(course)
//     }
// }



// exports.deleteCourseByID = async (req, res, next) => {
//     const courseId = req.params.id;
//     let course;
//     try { course = await courses.findByIdAndRemove(courseId) }
//     catch (err) {
//         return res.status(500).json({ message: err.message })

//     }
//     if (!course) {
//         return res.status(404).json({ message: 'Cannot find course' })
//     }
//     return res.status(200).json({ message: 'Course deleted' })
// }

// exports.search = async (req, resp) => {
//     let cours = await courses.find(
//         {
//             "$or": [
//                 { title: { $regex: req.params.key } },
//             ]
//         }
//     ).populate('user');
//     let users = await User.find(
//         {
//             fullname: { $regex: req.params.key },
//             type: "Teacher"
//         },
//     )
//     // resp.status(200).send({ "cours": cours, "people": users })
//     resp.status(200).send({ cours, users })


// }

// exports.enrollCourse = async (req, res) => {
//     let { userid, courseid } = req.body;

//     try {
//         let user = await User.findOneAndUpdate({ userid: userid }, {
//             $push: { courses: courseid }

//         })

//         let user2 = await User.findOne({ userid: userid })

//         res.status(200).send({ result: user2 });

//     }
//     catch (e) {
//         res.status(201).send({ err: e })
//     }
// }

// exports.getEnrolledCourses = async (req, res) => {
//     let userid = req.params.id;
//     try {
//         let user = await User.findOne({ userid: userid })
//         let coursesArray = user.courses;
//         // console.log(coursesArray);
//         try {
//             const docs = await courses.find({ _id: { $in: coursesArray } }).populate('user');
//             res.status(200).send({ result: docs });
//         } catch (err) {
//         }

//     } catch (e) {
//     }
// }
// exports.checkEnrolled = async (req, res) => {
//     console.log("in check enrolled");
//     let userid = req.params.id;
//     let courseid = req.params.courseid;
//     try {
//         let user = await User.findOne({ userid: userid })
//         let coursesArray = user.courses;

//         console.log(user);
//         console.log("course id : " + courseid);
//         let temp = false;
//         for (let i = 0; i < coursesArray.length; i++) {
//             if (coursesArray[i] == courseid) {
//                 console.log(coursesArray[i] + " the course is " + courseid)
//                 temp = true;
//                 break;
//             }
//         }
//         console.log(temp);
//         res.status(200).send({ result: temp });



//     } catch (e) {
//     }
// }

