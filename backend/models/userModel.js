const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    location: {
        type:String,
        required : false
    },
    phone_number: {
        type:String,
        required: false,
        unique: true,
        sparse: true
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User = mongoose.model("user", UserSchema);

module.exports = User;