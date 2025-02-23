import { Schema, model } from 'mongoose'

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true
  },
  termsAgreed: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const Contact = model('Contact', contactSchema)
export default Contact