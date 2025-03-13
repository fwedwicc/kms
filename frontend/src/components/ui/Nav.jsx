import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='fixed p-2 border bg-white space-x-4'>
      <a href="#contact">Contact</a>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}

export default Nav
