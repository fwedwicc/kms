import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Contact, FAQs, Article, Dashboard } from '../components/admin'
import { Button } from '../components/ui'

const Admin = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)

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

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen)
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
        return <Dashboard />
    }
  }

  const ButtonLink = ({ link, icon, label, isNavOpen }) => {
    return (
      <Link to={link} className='relative group'>
        <Button className={`justify-start w-full ease-in-out transition duration-300 ${location.pathname === link ? 'border' : 'border-none'} ${!isNavOpen ? 'size-11.5' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="shrink-0 size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
          {isNavOpen && <span>{label}</span>}
        </Button>
        {!isNavOpen && <span className='border bg-white rounded-md text-sm px-2 py-1 absolute opacity-0 group-hover:opacity-100 transform -translate-y-1/2 top-1/2 left-13 transition-opacity duration-200 ease-in-out'>{label}</span>}
      </Link>
    )
  }

  return (
    <>
      {/* Side Nav */}
      <nav className={`lg:block hidden fixed p-3 h-screen ${isNavOpen ? 'w-56' : 'w-18'} transition-all duration-300`}>
        <div className='relative h-full flex flex-col justify-between'>
          <div>
            {/* Logo */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center size-12 shrink-0 border rounded-[9px]'>
                x
              </div>
              <span className={`${isNavOpen ? 'block' : 'hidden'} transition-all duration-300`}>Bhieee</span>
            </div>
            <Button onClick={handleNavToggle} className={'absolute top-0 -right-9 size-7'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`shrink-0 size-3 ${isNavOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
            <ul className="mt-7 flex flex-col gap-1">
              <ButtonLink
                link='/'
                icon='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                label='Home'
                isNavOpen={isNavOpen}
              >
              </ButtonLink>
              <ButtonLink
                link='/admin'
                icon='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
                label='Dashboard'
                isNavOpen={isNavOpen}
              >
              </ButtonLink>
              <ButtonLink
                link='/admin/contact'
                icon='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                label='Contact'
                isNavOpen={isNavOpen}
              >
              </ButtonLink>
              <ButtonLink
                link='/admin/faqs'
                icon='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                label='FAQs'
                isNavOpen={isNavOpen}
              >
              </ButtonLink>
              <ButtonLink
                link='/admin/article'
                icon='M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9'
                label='Article'
                isNavOpen={isNavOpen}
              >
              </ButtonLink>
            </ul>
          </div>
          <div className='relative group'>
            <Button onClick={handleLogout} className={`w-full text-red-500 border-black ease-in-out transition duration-300 ${!isNavOpen ? 'size-11.5' : null}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              {isNavOpen && 'Logout'}
            </Button>
            {!isNavOpen && <span className='border bg-white rounded-md text-sm px-2 py-1 absolute opacity-0 group-hover:opacity-100 transform -translate-y-1/2 top-1/2 left-13 transition-opacity duration-200 ease-in-out'>Logout</span>}
          </div>
        </div>
      </nav>
      {/* Content */}
      <main className={`w-full pl-0 ${isNavOpen ? 'lg:pl-56' : 'lg:pl-18'} transition-all duration-300`}>
        {renderComponent()}
      </main>
    </>
  )
}

export default Admin
