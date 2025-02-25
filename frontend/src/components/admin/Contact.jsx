import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

const Contact = () => {
  const [contact, setContact] = useState([])

  // Fetch all Contacts
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await api.get('/contact')
        setContact(response.data.data)

      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }

    getContacts()
    const interval = setInterval(getContacts, 5000)
    return () => clearInterval(interval)
  }, [])


  return (
    <section className='border rounded-xl p-4'>
      <h1>ADMIN: Contact</h1>
      <ul className='divide-y'>
        {contact.map((contact) => (
          <li key={contact._id}>
            <h2>Firstname: {contact.firstName}</h2>
            <p>Lastname: {contact.lastName}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>
            <p>Sent At: {new Date(contact.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contact