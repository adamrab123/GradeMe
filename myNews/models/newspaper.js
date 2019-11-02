const mongoose = require('mongoose');

const newspaperSchema = new mongoose.Schema({
  request_link : {
    type: String,
    required: [true, 'The username is required']
  },

  image: {
    type: String,
    required: [true, 'Provide an image']
  },

  name: {
    type: String,
    required: [true, 'Provide a name']
  }

},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Newspaper = mongoose.model('Newspaper', newspaperSchema);

module.exports = Newspaper;
