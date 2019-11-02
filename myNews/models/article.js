const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  author: String,
  description: String,
  publishedAt: Date,
  title: String,
  url: String,
  urlToImage: String

},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
