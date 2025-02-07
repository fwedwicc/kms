import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

const Contact = () => {
  const [contact, setContact] = useState([])

  // useEffect(() => {
  //   const getContacts = async () => {
  //     try {
  //       const response = await api.get('/contact');
  //       // Access the `data` property of the response object
  //       setContacts(response.data);
  //     } catch (error) {
  //       console.log('Error fetching users:', error);
  //     }
  //   };

  //   getContacts();
  //   const interval = setInterval(getContacts, 5000);
  //   return () => clearInterval(interval);
  // }, [])

  // Fetch all Contacts
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await api.get('/contact')
        // Access the `data` property of the response object
        const contactsArray = response.data.data
        if (Array.isArray(contactsArray)) {
          setContact(contactsArray)
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