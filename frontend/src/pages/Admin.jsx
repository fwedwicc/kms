import React, { useEffect, useState } from 'react'

const Admin = () => {
  const [contact, setContact] = useState([])

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`)
      if (!response.ok) {
        throw new Error('Failed to fetch Contacts')
      }
      const data = await response.json()
      setContact(data.data)
    } catch (error) {
      console.error('Error fetching Contacts:', error)
    }
  }

  useEffect(() => {
    fetchContacts()
    const interval = setInterval(fetchContacts, 5000) // Polling interval: 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>Those contact should be in here</h1>
      <ul>
        {contact.map((contact) => (
          <li key={contact._id}>
            <h2>{contact.firstName}</h2>
            <p>{contact.lastName}</p>
            <p>{contact.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin