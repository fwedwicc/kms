import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

  const location = useLocation()

  return (
    <>
      {!location.pathname.includes('/admin') && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-6 lg:px-36 md:px-12 gap-4 px-4 p-4 md:p-14'
        >
          {/* Start COntent */}
          <div className='flex justify-between items-end pb-3'>
            {/* Company Logo and Description */}
            <div className='flex items-center gap-6'>
              <div className='relative flex justify-center items-center size-24 ring-2 ring-neutral-400 ring-offset-2 bg-neutral-900 border rounded-2xl'>
                <span className='text-white font-bold md:text-3xl text-2xl'>S</span>
              </div>
              <div>
                <h5>StaySuite</h5>
                <p className='max-w-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque odit, at, porro tempora inventore tenetur laboriosam volupta.</p>
              </div>
            </div>
            {/* Links */}
            <div className='flex items-start gap-12'>
              {[
                {
                  title: 'About Us',
                  labels: ['About', 'Team', 'Careers'],
                  links: ['https://sample1.com', 'https://sample2.com', 'https://sample3.com'],
                },
                {
                  title: 'Support',
                  labels: ['Contact Us', 'FAQs', 'Help Center'],
                  links: ['https://sample1.com', 'https://sample2.com', 'https://sample3.com'],
                },
                {
                  title: 'Legal',
                  labels: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
                  links: ['https://sample1.com', 'https://sample2.com', 'https://sample3.com'],
                }
              ].map((item, index) => (
                <div className='flex flex-col gap-2.5' key={index}>
                  <span className='text-lg font-medium'>{item.title}</span>
                  <div className='flex flex-col item-start gap-1.5'>
                    {item.labels.map((label, index) => (
                      <Link to={item.links[index]} key={index}>
                        <p>{label}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End Content */}
          <div className='flex justify-center items-start border-t border-neutral-300 pt-6'>
            <span className='text-neutral-500'>© StaySuite • 2024</span>
          </div>
        </motion.footer>
      )}
    </>
  )
}

export default Footer
