import React, { useEffect, useState } from 'react'

const Contact = () => {
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
    <div className='border rounded-xl p-4'>
      <h1>ADMIN: Contact</h1>
      <ul className='divide-y'>
        {contact.map((contact) => (
          <li key={contact._id}>
            <h2>Firstname: {contact.firstName}</h2>
            <p>Lastname: {contact.lastName}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contact