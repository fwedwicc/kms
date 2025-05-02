import About from "../models/aboutModel.js"

// Get About Content
export const getAboutContent = async (req, res) => {
  try {
    const about = await About.findOne()

    if (!about) {
      return res.status(404).json({ success: false, message: "About content not found" })
    }

    res.status(200).json({ success: true, data: about })
  } catch (error) {
    console.error("Error fetching about content:", error.message)
    res.status(500).json({ success: false, message: "Error fetching about content" })
  }
}


// Add About Content
export const addAboutContent = async (req, res) => {
  try {
    const {
      description,
      services,
      highlightContent,
      content,
      highlights
    } = req.body

    const illustration = req.file ? `/uploads/${req.file.filename}` : null

    // Validate all required fields
    if (
      !description ||
      !highlightContent ||
      !content ||
      !services ||
      !Array.isArray(services) ||
      services.length === 0 ||
      !highlights ||
      !Array.isArray(highlights) ||
      highlights.length !== 3
    ) {
      return res.status(400).json({ success: false, message: "All fields are required, and you must provide exactly 3 highlights and at least one service." })
    }

    // Now proceed with saving
    const newAbout = new About({
      description,
      illustration,
      services,
      highlightContent,
      content,
      highlights
    })

    const savedAbout = await newAbout.save()

    res.status(201).json({ success: true, data: savedAbout })
  } catch (error) {
    console.error("Error in adding About content:", error.message)
    res.status(500).json({ success: false, message: "Error in adding About content" })
  }
}
