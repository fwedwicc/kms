import FAQs from "../models/faqsModel.js"
import mongoose from 'mongoose'

// Get all FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQs.find({})
    res.status(200).json({ success: true, data: faqs })
  } catch (error) {
    console.log("Error in fetching FAQs:", error.message)
    res.status(500).json({ success: false, message: "Error in fetching FAQs" })
  }
}
// Add a new FAQ
export const addFAQs = async (req, res) => {
  const { question, answer } = req.body

  if (!question || !answer) {
    return res.status(400).json({ success: false, message: "Question and answer are required" })
  }

  try {
    const newFAQ = new FAQs({
      question,
      answer
    })

    const savedFAQ = await newFAQ.save()

    res.status(201).json({ success: true, data: savedFAQ })
  } catch (error) {
    console.log("Error in adding FAQ:", error.message)
    res.status(500).json({ success: false, message: "Error in adding FAQ" })
  }
}


// Update an existing FAQ
export const updateFAQs = async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "FAQ not found" })
  }

  try {
    const updatedFAQ = await FAQs.findByIdAndUpdate(id, req.body, { new: true })

    if (!updatedFAQ) {
      return res.status(404).json({ success: false, message: "FAQ not found" })
    }

    res.status(200).json({ success: true, data: updatedFAQ })
  } catch (error) {
    console.log("Error in updating FAQ:", error.message)
    res.status(500).json({ success: false, message: "Error in updating FAQ" })
  }
}

// Delete an existing FAQ
export const deleteFAQs = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "FAQ not found" });
  }

  try {
    const deletedFAQ = await FAQs.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    res.status(200).json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.log("Error in deleting FAQ:", error.message);
    res.status(500).json({ success: false, message: "Error in deleting FAQ" });
  }
};