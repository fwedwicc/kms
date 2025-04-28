import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Contact, ContentManagement, Article, Dashboard } from '../components/admin'
import { HiLogout, HiOutlineMail, HiOutlineViewGrid, HiOutlineHome, HiOutlineBookmarkAlt, HiOutlineChevronDoubleRight, HiOutlineCollection } from "react-icons/hi"
import { Button } from '../components/ui'

const Admin = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const location = useLocation()
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

  if (isLoggedOut) {
    window.location.href = '/login'
  }

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  const renderComponent = () => {
    switch (location.pathname) {
      case '/admin/contact':
        return <Contact />
      case '/admin/content-management':
        return <ContentManagement />
      case '/admin/article':
        return <Article />
      default:
        return <Dashboard />
    }
  }

  const ButtonLink = ({ link, icon, label, isNavOpen }) => {
    return (
      <Link to={link} className='relative group'>
        <Button className={`justify-start w-full ease-in-out transition-all duration-300 gap-3 ${location.pathname === link ? 'border border-neutral-200 bg-neutral-200/40 text-neutral-600' : 'border-none text-neutral-700'} ${!isNavOpen ? 'size-11.5 rounded-xl' : 'rounded-lg'}`}>
          <span>{icon}</span>
          {isNavOpen && <span>{label}</span>}
        </Button>
        {!isNavOpen && <span className='z-50 border border-neutral-200 bg-white rounded-lg text-sm px-2 py-1 absolute opacity-0 group-hover:opacity-100 transform -translate-y-1/2 top-1/2 left-13 transition-opacity duration-200 ease-in-out pointer-events-none'>{label}</span>}
      </Link>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Side Nav */}
      <nav className={`z-50 lg:block hidden fixed p-3 h-screen ${isNavOpen ? 'w-56' : 'w-18'} transition-all duration-300`}>
        <div className='relative h-full flex flex-col justify-between'>
          <div>
            {/* Logo */}
            <div className='flex items-center gap-3'>
              <div className='relative flex justify-center items-center shrink-0 size-12 bg-neutral-800 border rounded-xl'>
                <span className='text-white font-bold'>S</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isNavOpen ? 1 : 0 }}
                transition={{
                  duration: isNavOpen ? 0.2 : 0,
                  delay: isNavOpen ? 0.2 : 0
                }}
              >
                <h5>StaySuite</h5>
              </motion.div>
            </div>
            <Button onClick={handleNavToggle} className={'absolute top-3 -right-12 size-7 bg-neutral-50 border border-neutral-100'}>
              <HiOutlineChevronDoubleRight className={`size-3 shrink-0 transition-all duration-300 ease-in-out ${isNavOpen ? 'rotate-180' : ''}`} />
            </Button>
            <ul className="mt-7 flex flex-col gap-1">
              {[
                { 'label': 'Home', 'link': '/', 'icon': HiOutlineHome },
                { 'label': 'Dashboard', 'link': '/admin', 'icon': HiOutlineViewGrid },
                { 'label': 'Content', 'link': '/admin/content-management', 'icon': HiOutlineCollection },
                { 'label': 'Article', 'link': '/admin/article', 'icon': HiOutlineBookmarkAlt },
                { 'label': 'Contact', 'link': '/admin/contact', 'icon': HiOutlineMail }
              ].map((item, index) => (
                <ButtonLink
                  key={index}
                  link={item.link}
                  icon={<item.icon className='size-6 stroke-[1.3px]' />}
                  label={item.label}
                  isNavOpen={isNavOpen}
                >
                </ButtonLink>
              ))}
            </ul>
          </div>
          <div className='relative group'>
            <Button onClick={handleLogout} variant='danger' className={`w-full ${!isNavOpen ? 'size-11.5' : null}`}>
              <HiLogout className='size-5' />
              {isNavOpen && 'Logout'}
            </Button>
            {!isNavOpen && <span className='border border-neutral-200 bg-white rounded-lg text-sm px-2 py-1 absolute opacity-0 group-hover:opacity-100 transform -translate-y-1/2 top-1/2 left-13 transition-opacity duration-200 ease-in-out pointer-events-none'>Logout</span>}
          </div>
        </div>
      </nav>
      {/* Content */}
      <main className={`w-full bg-neutral-50/40 pl-0 ${isNavOpen ? 'lg:pl-56' : 'lg:pl-18'} transition-all duration-300`}>
        <section className='py-3.5 pr-3.5 lg:pl-0 pl-3.5 bg-neutral-50/40 h-screen'>
          <div className='bg-white border border-neutral-200/60 rounded-2xl overflow-auto custom-scollbar lg:h-full h-[93%] lg:mt-0 mt-12 p-12'>
            {renderComponent()}
          </div>
        </section>
      </main>
    </motion.div>
  )
}

export default Admin
