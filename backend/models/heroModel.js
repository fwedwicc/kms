import { Schema, model } from 'mongoose'

const heroSchema = new Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  illustration: {
    type: String,  // This will store the image path/URL
    required: false
  },
  totalGuests: {
    type: Number,
    required: true,
    trim: true
  },
  totalRooms: {
    type: Number,
    required: true,
    trim: true
  },
  totalYears: {
    type: Number,
    required: true,
    trim: true
  },
}, {
  timestamps: true
})

const Hero = model('Hero', heroSchema)
export default Hero