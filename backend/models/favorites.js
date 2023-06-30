
const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adId: {
    type: Schema.Types.ObjectId,
    ref: 'Ad',
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;