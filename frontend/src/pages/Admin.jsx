import React from 'react'
import { Notification, Contact, FAQs } from '../components/admin'

const Admin = () => {
  const token = localStorage.getItem('token')
  return (
    <>
      <div>
        {token ? (
          <p>You are logged in as admin.</p>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
      <Notification />
      <Contact />
      <FAQs />
    </>
  )
}

export default Admin