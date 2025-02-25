import Article from "../models/articleModel.js"
import mongoose from 'mongoose'

// Get all Articles
export const getArticles = async (req, res) => {
  try {
    const article = await Article.find({})
    res.status(200).json({ success: true, data: article })
  } catch (error) {
    console.log("Error in fetching Articles:", error.message)
    res.status(500).json({ success: false, message: "Error in fetching Articles" })
  }
}

// Get current Article
export const getCurrentArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ message: "Article not found" })
    res.status(200).json({ success: true, data: article })
  } catch (error) {
    console.log("Error in fetching Article:", error.message)
    res.status(500).json({ success: false, message: "Error in fetching Article" })
  }
}

// Add a new Article
export const addArticle = async (req, res) => {
  const { title, body, tags } = req.body

  if (!title || !body || !tags) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  try {
    const newArticle = new Article({
      title,
      body,
      tags,
      image: req.file ? `/uploads/${req.file.filename}` : null
    })

    const savedArticle = await newArticle.save()

    res.status(201).json({ success: true, data: savedArticle })
  } catch (error) {
    console.log("Error in adding Article:", error.message)
    res.status(500).json({ success: false, message: "Error in adding Article" })
  }
}

// Update an existing Article
export const updateArticle = async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Article not found" })
  }

  try {
    const existingArticle = await Article.findById(id)

    if (!existingArticle) {
      return res.status(404).json({ success: false, message: "Article not found" })
    }

    // Prepare update data - start with the request body
    const updateData = { ...req.body }

    // If there's a new file uploaded, add it to the update data
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updateData, { new: true })

    res.status(200).json({ success: true, data: updatedArticle })
  } catch (error) {
    console.log("Error in updating Article:", error.message)
    res.status(500).json({ success: false, message: "Error in updating Article" })
  }
}

// Delete an existing Article
export const deleteArticle = async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Article not found" })
  }

  try {
    const deletedArticle = await Article.findByIdAndDelete(id)

    if (!deletedArticle) {
      return res.status(404).json({ success: false, message: "Article not found" })
    }

    res.status(200).json({ success: true, message: "Article deleted successfully" })
  } catch (error) {
    console.log("Error in deleting Article:", error.message)
    res.status(500).json({ success: false, message: "Error in deleting Article" })
  }
}