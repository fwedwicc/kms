import { Schema, model } from 'mongoose'

const companySchema = new Schema({
  logo: {
    type: String,  // This will store the image path/URL
    required: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
})

const Company = model('Company', companySchema)
export default Company