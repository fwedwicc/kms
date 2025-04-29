import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Footer = () => {

  const location = useLocation()
  const [companyInfo, setCompanyInfo] = useState(null)

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await api.get('/company')
        setCompanyInfo(response.data.data)
      } catch (error) {
        console.error('Error fetching company info:', error)
      }
    }

    fetchCompanyInfo()
  }, [])

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
          <div className='flex flex-wrap justify-between items-end gap-6 pb-3'>
            {/* Company Logo and Description */}
            <div className='flex items-center gap-6'>
              <div className='relative overflow-hidden size-24 ring-2 ring-neutral-400 ring-offset-2 rounded-2xl'>
                {companyInfo?.logo && !(companyInfo.logo instanceof File) && (
                  <img
                    src={`${SERVER_URL}${companyInfo.logo}`}
                    alt={companyInfo?.name || 'Company Logo'}
                    className="absolute w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h5>{companyInfo?.name || 'Company Name'}</h5>
                <p className='max-w-sm'>{companyInfo?.description || 'Company Description'}</p>
              </div>
            </div>
            {/* Links */}
            <div className='flex items-start md:gap-12 gap-7'>
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
                  <span className='font-medium md:text-lg text-md'>{item.title}</span>
                  <div className='flex flex-col item-start gap-1'>
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
            <span className='text-neutral-500 text-sm'>© {companyInfo?.name} • 2025</span>
          </div>
        </motion.footer>
      )}
    </>
  )
}

export default Footer
