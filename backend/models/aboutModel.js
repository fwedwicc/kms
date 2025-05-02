import { Schema, model } from 'mongoose'

const aboutSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  illustration: {
    type: String,
    required: false
  },
  services: [
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true }
    }
  ],
  highlightContent: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  highlights: [
    {
      description: { type: String, required: true, trim: true }
    }
  ]
}, {
  timestamps: true
})

const About = model('About', aboutSchema)
export default About