import Hero from "../models/heroModel.js"

// Get Hero Content
export const getHeroContent = async (req, res) => {
  try {
    const hero = await Hero.findOne()

    if (!hero) {
      return res.status(404).json({ success: false, message: "Hero content not found" })
    }

    res.status(200).json({ success: true, data: hero })
  } catch (error) {
    console.error("Error fetching hero content:", error.message)
    res.status(500).json({ success: false, message: "Error fetching hero content" })
  }
}

// Update Company Content
export const updateHeroContent = async (req, res) => {
  const { heading, description, totalGuests, totalRooms, totalYears } = req.body

  if (!heading || !description || !totalGuests || !totalRooms || !totalYears) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  try {
    const hero = await Hero.findOne()

    // Update fields
    if (heading) hero.heading = heading
    if (description) hero.description = description
    if (req.file) {
      hero.illustration = `/uploads/${req.file.filename}`
    }
    if (totalGuests) hero.totalGuests = totalGuests
    if (totalRooms) hero.totalRooms = totalRooms
    if (totalYears) hero.totalYears = totalYears

    const updatedHero = await hero.save()

    res.status(200).json({ success: true, data: updatedHero })
  } catch (error) {
    console.error("Error updating hero content:", error.message)
    res.status(500).json({ success: false, message: "Error updating hero content" })
  }
}


// Add Hero Content
export const addHeroContent = async (req, res) => {
  const { heading, description, totalGuests, totalRooms, totalYears } = req.body
  const illustration = req.file ? `/uploads/${req.file.filename}` : null

  if (!heading || !description || !illustration || !totalGuests || !totalRooms || !totalYears) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  try {
    const newCompanyContent = new Hero({
      heading,
      description,
      illustration,
      totalGuests,
      totalRooms,
      totalYears
    })

    const savedHeroContent = await newCompanyContent.save()

    res.status(201).json({ success: true, data: savedHeroContent })
  } catch (error) {
    console.log("Error in adding hero contents:", error.message)
    res.status(500).json({ success: false, message: "Error in adding hero contents" })
  }
}