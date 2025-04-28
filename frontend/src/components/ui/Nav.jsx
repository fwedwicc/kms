import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import { Link, useLocation } from 'react-router-dom'
import { HiLogout, HiMenuAlt3, HiOutlineArrowRight, HiOutlineX, HiOutlineViewGrid } from "react-icons/hi"
import { Button } from './index'

const Nav = () => {
  const token = localStorage.getItem('token')
  const location = useLocation()
  const sidebarRef = useRef(null)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      iconColor: "#ef4444",
      title: "Are you sure?",
      text: "You will be logged out of your account",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-sm",
        confirmButton: "swal-danger",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        setIsLoggedOut(true)
      }
    })
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsNavOpen(false)
      }
    }
    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isNavOpen])

  const Links = ({ isForSideNav }) => {
    return (
      <div className={`${!isForSideNav ? 'lg:flex hidden' : ''} items-center gap-1`}>
        {[
          { link: '/#home', label: 'Home' },
          { link: '/#about', label: 'About' },
          { link: '/#article', label: 'Articles' },
          { link: '/#faqs', label: 'FAQs' },
          { link: '/#contact', label: 'Contact' }
        ].map((item, index) => (
          <a href={item.link} key={index}>
            <Button variant='ghost' className={`${location.hash === item.link.replace('/', '') ? 'bg-neutral-100' : ''} ${isForSideNav ? 'w-full' : 'w-auto'}`}>
              {item.label}
            </Button>
          </a>
        ))}
      </div>
    )
  }

  const Buttons = ({ isForSideNav }) => {
    return (
      <div className={`${!isForSideNav ? 'lg:flex hidden' : ''}`}>
        {token ? (
          <div className={`flex gap-2 ${isForSideNav ? 'flex-col-reverse' : 'flex-row'}`}>
            {/* Logout Button */}
            <Button onClick={handleLogout} variant='danger' className={`${isForSideNav ? 'w-full' : ''}`}>
              Logout
              <HiLogout className='size-4' />
            </Button>
            {/* Dashboard */}
            <Link to="/admin">
              <Button variant='primary' className={`${isForSideNav ? 'w-full' : ''}`}>
                Dashboard
                <HiOutlineViewGrid className='size-4' />
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button variant='primary' className={`${isForSideNav ? 'w-full' : ''}`}>
              Login
              <HiOutlineArrowRight className='-rotate-45 size-4' />
            </Button>
          </Link>
        )
        }
      </div>
    )
  }

  return (
    <>
      {!location.pathname.includes('/admin') && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className='fixed z-50 p-3 w-full flex justify-center items-center'
        >
          <div className='w-full max-w-7xl flex items-center justify-between border border-neutral-300/60 shadow-xl shadow-neutral-400/5 bg-white md:p-3 p-2 rounded-[15px]'>
            {/* Start */}
            <div className='flex items-center gap-3'>
              <div className='relative flex justify-center items-center size-9 bg-neutral-800 border rounded-lg'>
                <span className='text-white font-bold'>S</span>
              </div>
              <h5>StaySuite</h5>
            </div>
            {/* Mid */}
            <Links />
            {/* End */}
            <Buttons />
            {/* End - Mobile Toggle */}
            <Button onClick={() => setIsNavOpen(true)} variant='ghost' className='lg:hidden' iconButton>
              <HiMenuAlt3 className='size-4' />
            </Button>
            {/* Side Nav */}
            <div className={`fixed z-50 top-0 right-0 md:w-64 w-48 h-full bg-white border-l border-neutral-200 transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={() => setIsNavOpen(false)}>
              <div ref={sidebarRef} className='bg-white h-full p-4 space-y-6'>
                {/* Close Button */}
                <Button onClick={() => setIsNavOpen(false)} variant='ghost' iconButton className='flex place-self-end'>
                  <HiOutlineX className='size-4' />
                </Button>
                {/* Links */}
                <Links isForSideNav={true} />
                {/* Buttons */}
                <Buttons isForSideNav={true} />
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </>
  )
}

export default Nav
