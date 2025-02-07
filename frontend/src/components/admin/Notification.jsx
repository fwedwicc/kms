import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

const Notification = () => {
  const [contact, setContacts] = useState([])

  // Fetch all Contacts
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await api.get('/contact')
        // Access the `data` property of the response object
        const contactsArray = response.data.data
        if (Array.isArray(contactsArray)) {
          setContacts(contactsArray)
        }
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }

    getContacts()
    const interval = setInterval(getContacts, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='border rounded-xl p-4'>
      <h1>ADMIN: Notification</h1>
      <ul className='divide-y'>
        {contact.map((notif) => (
          <li key={notif._id}>
            <p>New message from {notif.lastName}, {notif.firstName}</p>
            <p>Email: {notif.email}</p>
            <p>Message: {notif.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notification
