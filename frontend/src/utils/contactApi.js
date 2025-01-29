export const fetchContacts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`)
    if (!response.ok) {
      throw new Error('Failed to fetch Contacts')
    }
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching Contacts:', error)
    throw error
  }
}