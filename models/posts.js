const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test');

const PostSchema = new mongoose.Schema({
  title:  {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  brief:   {
    type: String,
    required: true
  },
  body:   {
    type: String,
    required: true
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
