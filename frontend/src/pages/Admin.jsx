import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Contact, FAQs, Article } from '../components/admin'
import { Button } from '../components/ui'

const Admin = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const location = useLocation()

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

  const renderComponent = () => {
    switch (location.pathname) {
      case '/admin/contact':
        return <Contact />
      case '/admin/faqs':
        return <FAQs />
      case '/admin/article':
        return <Article />
      default:
        return <>admin dasbord</>
    }
  }

  return (
    <>
      {/* Side Nav */}
      <nav className='border border-blue-500 bg-blue-200 fixed w-24 h-screen p-4'>
        <h2>Admin Panel</h2>
        <Button onClick={handleLogout}>Logout</Button>
        <Link to="/">Home</Link>
        <ul className="mt-4 space-y-2">
          <li><Link to="/admin/contact">Contact</Link></li>
          <li><Link to="/admin/faqs">FAQs</Link></li>
          <li><Link to="/admin/article">Article</Link></li>
        </ul>
      </nav>
      {/* Content */}
      <main className='border border-green-500 w-full p-4 pl-28 md:min-h-screen'>
        {renderComponent()}
      </main>
    </>
  )
}

export default Admin
