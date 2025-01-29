import React, { useEffect, useState } from 'react'
import { fetchContacts } from '../../utils/contactApi'

const Notification = () => {
  const [contact, setContact] = useState([])

  useEffect(() => {
    const getContacts = async () => {
      const data = await fetchContacts()
      setContact(data)
    }

    getContacts()
    const interval = setInterval(getContacts, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='border rounded-xl p-4'>
      <h1>ADMIN: Notification</h1>
      <ul className='divide-y'>
        {contact.map((contact) => (
          <li key={contact._id}>
            <p>New message from {contact.lastName}, {contact.firstName}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notification
