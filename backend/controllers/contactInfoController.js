import ContactInfo from '../models/contactInfoModel.js'

// GET: Fetch Contact Info
export const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne()
    res.status(200).json({ success: true, data: contactInfo })
  } catch (error) {
    console.error('Fetch Contact Info Error:', error)
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

// PUT: Update Contact Info (no upsert)
export const updateContactInfo = async (req, res) => {
  try {
    const { email, telephone, location, link1, link2, link3, link4 } = req.body

    // Check required fields
    if (!email || !telephone || !location) {
      return res.status(400).json({
        success: false,
        message: 'Email, telephone, and location are required.',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format.',
      })
    }

    // Validate telephone num
    const phoneRegex = /^(09|\+639)\d{9}$/
    if (!phoneRegex.test(telephone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid telephone format.',
      })
    }

    const contactInfo = await ContactInfo.findOne()
    if (!contactInfo) {
      return res.status(404).json({
        success: false,
        message: 'No contact info found to update.',
      })
    }

    // Update fields
    contactInfo.email = email
    contactInfo.telephone = telephone
    contactInfo.location = location
    contactInfo.link1 = link1
    contactInfo.link2 = link2
    contactInfo.link3 = link3
    contactInfo.link4 = link4

    await contactInfo.save()

    res.status(200).json({ success: true, data: contactInfo })
  } catch (error) {
    console.error('Update Contact Info Error:', error)
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

