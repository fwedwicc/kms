import Company from "../models/companyModel.js"
import mongoose from 'mongoose'

// Get Company Content
export const getCompanyContent = async (req, res) => {
  try {
    const company = await Company.findOne()

    if (!company) {
      return res.status(404).json({ success: false, message: "Company content not found" })
    }

    res.status(200).json({ success: true, data: company })
  } catch (error) {
    console.error("Error fetching company content:", error.message)
    res.status(500).json({ success: false, message: "Error fetching company content" })
  }
}

// Update Company Content
export const updateCompanyContent = async (req, res) => {
  const { name, description } = req.body

  try {
    const company = await Company.findOne() // get the only company

    if (!company) {
      return res.status(404).json({ success: false, message: "Company content not found" })
    }

    // Update fields
    if (name) company.name = name
    if (description) company.description = description
    if (req.file) {
      company.logo = `/uploads/${req.file.filename}`
    }

    const updatedCompany = await company.save()

    res.status(200).json({ success: true, data: updatedCompany })
  } catch (error) {
    console.error("Error updating company content:", error.message)
    res.status(500).json({ success: false, message: "Error updating company content" })
  }
}

// Add Company Content
export const addCompanyContent = async (req, res) => {
  const { name, description } = req.body
  const logo = req.file ? `/uploads/${req.file.filename}` : null

  if (!name || !description || !logo) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  try {
    const newCompanyContent = new Company({
      name,
      logo,
      description,
    })

    const savedCompanyContent = await newCompanyContent.save()

    res.status(201).json({ success: true, data: savedCompanyContent })
  } catch (error) {
    console.log("Error in adding company contents:", error.message)
    res.status(500).json({ success: false, message: "Error in adding company contents" })
  }
}