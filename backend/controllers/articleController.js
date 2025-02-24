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