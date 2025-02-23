import { Schema, model } from 'mongoose'

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
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