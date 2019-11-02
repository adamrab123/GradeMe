const mongoose = require('mongoose');

const Newspaper = require("./newspaper");
const Articles = require("./article");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'The username is required']
  },

  password: {
    type: String,
    required: [true, 'The password is required']
  },

  newspapersSubscription: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },

  articlesFavourites: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }

},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
