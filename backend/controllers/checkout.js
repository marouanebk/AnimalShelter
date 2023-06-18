const product = require("../models/product_model.js");
const Cart = require("../models/cart_model.js");

// const User = require("../models/user.model");
exports.addOrder = async (req, res, next) => {
    console.log("in checking up order");
    const { items, full_name, email, phone_number,address  , total} = req.body;
    const NewOrder = new Cart({
        items: items,
        full_name: full_name,
        phone_number: phone_number,
        email: email,
        address: address,
        total:total,
    })

    try {
        console.log("before checkout");
        await NewOrder.save()
    } catch (err) {
        return res.status(499).json({ message: err.message })
    }
    return res.status(200).json(NewOrder)
}

