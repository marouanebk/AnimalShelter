const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    animalName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    race: {
        type: String,
        // required: true
    },
    vaccinated: {
        type: Boolean,
        default: false
    },
    healthCondition: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    pictures: {
        type: [String],
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;