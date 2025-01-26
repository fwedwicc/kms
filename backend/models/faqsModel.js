import { Schema, model } from 'mongoose'

const faqsSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const faqs = model('faqs', faqsSchema)
export default faqs