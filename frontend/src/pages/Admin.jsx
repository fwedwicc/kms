import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Notification, Contact, FAQs, Article } from '../components/admin'

const Admin = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      iconColor: "#f97316",
      showCancelButton: true,
      confirmButtonText: "ilogout mo bhie",
      cancelButtonText: "Cancel",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        setIsLoggedOut(true)
      }
    })
  }

  if (isLoggedOut) {
    window.location.href = '/login'
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {/* <Notification /> */}
      <Contact />
      <FAQs />
      <Article />
    </>
  )
}

export default Admin
