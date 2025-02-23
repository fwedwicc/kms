import Article from "../models/articleModel.js"

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
      tags
    })

    const savedArticle = await newArticle.save()

    res.status(201).json({ success: true, data: savedArticle })
  } catch (error) {
    console.log("Error in adding Article:", error.message)
    res.status(500).json({ success: false, message: "Error in adding Article" })
  }
}