import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  return (
    <>
      {location.pathname === '/login' || location.pathname.includes('/admin') ? null : (
        <nav className='fixed p-2 border bg-white space-x-4'>
          {/* <a href="#contact">Contact</a>
            <a href="#article">Article</a>
            <a href="#faqs">FAQs</a>
            <a href="#home">Home</a>
            <Link to="/">Home</Link> */}
          {token ? (
            <Link to="/admin">Admin dasbord</Link>
          ) : <Link to="/login">Login</Link>}
        </nav>
      )}
    </>
  )
}

export default Nav
