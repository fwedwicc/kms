import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiLogout } from "react-icons/hi"
import { Button } from './index'

const Nav = () => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  return (
    <>
      {location.pathname === '/login' || location.pathname.includes('/admin') ? null : (
        <nav className='fixed z-50 p-3 w-full flex justify-center items-center'>
          <div className='w-full max-w-7xl flex items-center justify-between border border-neutral-300/60 shadow-xl shadow-neutral-400/5 bg-white p-3 rounded-[15px]'>
            {/* Start */}
            <div className='flex items-center gap-3'>
              <div className='relative flex justify-center items-center size-9 bg-neutral-800 border rounded-lg'>
                <span className='text-white font-bold'>S</span>
              </div>
              <h5>StaySuite</h5>
            </div>
            {/* Mid */}
            <div className='flex items-center gap-1'>
              {[
                { link: '#home', label: 'Home' },
                { link: '#about', label: 'About' },
                { link: '#article', label: 'Articles' },
                { link: '#faqs', label: 'FAQs' },
                { link: '#contact', label: 'Contact' }
              ].map((item, index) => (
                <a href={item.link} key={index}>
                  <Button variant='ghost' className={`${location.hash === item.link ? 'bg-neutral-100' : ''}`}>
                    {item.label}
                  </Button>
                </a>
              ))}
            </div>
            {/* End */}
            <div className='flex items-center gap-3'>
              {token ? (
                <>
                  {/* Logout Button */}
                  <Button variant='danger'>
                    Logout
                    <HiLogout className='size-4' />
                  </Button>
                  {/* Admin Dashboard */}
                  <Link to="/admin">
                    <Button variant='primary'>
                      Admin Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <Button variant='primary'>
                    Login
                  </Button>
                </Link>
              )
              }
            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export default Nav
