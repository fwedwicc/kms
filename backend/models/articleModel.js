import { Schema, model } from 'mongoose'

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,  // This will store the image path/URL
    required: false
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
})

const Article = model('Article', articleSchema)
export default Article