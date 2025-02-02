import React, { useState } from 'react'
import { Notification, Contact, FAQs } from '../components/admin'

const Admin = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('Logged out successfully')
    setIsLoggedOut(true)
  }

  if (isLoggedOut) {
    window.location.href = '/login'
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Notification />
      <Contact />
      <FAQs />
    </>
  )
}

export default Admin
