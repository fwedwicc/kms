import { Schema, model } from 'mongoose'

const contactInfoSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: Number,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  link1: {
    type: String,
    required: false,
    trim: true
  },
  link2: {
    type: String,
    required: false,
    trim: true
  },
  link3: {
    type: String,
    required: false,
    trim: true
  },
  link4: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
})

const ContactInfo = model('ContactInfo', contactInfoSchema)
export default ContactInfo