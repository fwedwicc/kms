import Contact from "../models/contactModel.js"

// Get all Contacts
export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find({})
    res.status(200).json({ success: true, data: contact })
  } catch (error) {
    console.log("Error in fetching Contacts:", error.message)
    res.status(500).json({ success: false, message: "Error in fetching Contacts" })
  }
}

// Add a new Contact
export const addContacts = async (req, res) => {
  const { firstName, lastName, email, message, termsAgreed } = req.body

  if (!firstName || !email || !message || termsAgreed === undefined) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  if (!termsAgreed) {
    return res.status(400).json({ success: false, message: "You must agree to the terms and conditions" })
  }

  // Validate Email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address." })
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      message,
      termsAgreed
    })

    const savedContact = await newContact.save()

    res.status(201).json({ success: true, data: savedContact })
  } catch (error) {
    console.log("Error in adding Contact:", error.message)
    res.status(500).json({ success: false, message: "Error in adding Contact" })
  }
}