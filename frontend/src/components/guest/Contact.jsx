import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExclamationCircle, HiOutlinePaperAirplane, HiOutlineArrowRight, HiOutlineChat, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi"
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiYoutube } from "react-icons/si"
import { InputText, Button, Badge, Spinner } from '../ui'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    termsAgreed: false
  })
  const [contactInfo, setContactInfo] = useState(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await api.get('/contactInfo')
        setContactInfo(response.data.data)
      } catch (error) {
        console.error('Error fetching contact info:', error)
      }
    }

    fetchContactInfo()
  }, [])

  // For Dynamic Icons
  const getIconData = (link) => {
    if (!link) return { icon: null, color: '' }

    if (link.includes('facebook')) return { icon: SiFacebook, color: 'text-blue-500' }
    if (link.includes('instagram')) return { icon: SiInstagram, color: 'text-rose-500' }
    if (link.includes('x.com') || link.includes('twitter')) return { icon: SiX, color: 'text-neutral-900' }
    if (link.includes('youtube')) return { icon: SiYoutube, color: 'text-red-500' }
    if (link.includes('linkedin')) return { icon: SiLinkedin, color: 'text-blue-500' }

    return { icon: null, color: '' }
  }

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.post(`/contact`, formData)

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        termsAgreed: false
      })

      Swal.fire({
        icon: 'success',
        iconColor: "#22c55e",
        title: 'Inquiry Sent',
        text: `Your message has been sent to us. We will get back to you soon.`,
        confirmButtonText: 'Got it',
        customClass: {
          title: "swal-title",
          text: "swal-text",
          popup: "swal-popup-sm",
          confirmButton: "swal-confirm",
          cancelButton: "swal-cancel"
        },
        showClass: {
          popup: 'swal-fade-in'
        },
        hideClass: {
          popup: 'swal-fade-out'
        },
      })
    } catch (error) {
      setError(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  // Reusable Component
  const ContactInfo = ({ children, title, label, link }) => {
    return (
      <>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-1.5'>
            {children}
            <span className='leading-none font-medium md:text-base text-sm'>{title}</span>
          </div>
          {link && <HiOutlineArrowRight className='md:size-5 size-4 -rotate-45 stroke-[1.5px]' />}
        </div>
        <p className='break-all'>{label}</p>
      </>
    )
  }

  return (
    <section id='contact' className='grid lg:grid-cols-2 grid-cols-1 lg:px-36 md:px-12 md:gap-8 gap-4 px-4 p-4 md:pt-30 pt-20 md:mb-0 mb-8'>
      {/* Left Content */}
      <div>
        <h3>Lorem ips dolrsit.</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <form onSubmit={handleSubmit} className='mt-4 grid md:grid-cols-2 grid-cols-1 gap-y-2 gap-x-3'>
          {/* Firstname */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="firstName">First name <span className='text-red-400'>*</span></label>
            <InputText
              type="text"
              name="firstName"
              placeholder="E.g. John"
              value={formData.firstName}
              onChange={handleChange}
            />
          </fieldset>
          {/* Lastname */}
          <fieldset className='flex flex-col gap-1'>
            {/* <span className='text-neutral-400 text-sm'>(Optional)</span> */}
            <label htmlFor="lastName">Last name <span className='text-red-400'>*</span></label>
            <InputText
              type="text"
              name="lastName"
              placeholder="E.g. Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
          </fieldset>
          {/* Email */}
          <fieldset className='flex flex-col gap-1 col-span-full'>
            <label htmlFor="email">Email Address <span className='text-red-400'>*</span></label>
            <InputText
              type="text"
              name="email"
              placeholder="E.g. john.doe.1988@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>
          {/* Message */}
          <fieldset className='flex flex-col gap-1 col-span-full'>
            <label htmlFor="message">Your message: <span className='text-red-400'>*</span></label>
            <textarea
              name="message"
              value={formData.message}
              placeholder="E.g. I would like to inquire..."
              onChange={handleChange}
              className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg transition duration-300 ease-in-out focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>
          <div className='col-span-full grid md:grid-cols-2 grid-cols-1 items-center gap-4 mt-3'>
            {/* Terms Agreed */}
            <fieldset>
              <label className='flex items-center gap-2 leading-4'>
                <input
                  type="checkbox"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                />
                I agree to the terms and conditions
              </label>
            </fieldset>
            {/* Submit Button */}
            <Button type="submit" disabled={loading} variant='primary'>
              {loading ? 'Submitting' : <>Submit Inquiry <HiOutlinePaperAirplane className='size-4 rotate-90' /></>}
              {loading ? <Spinner /> : null}
            </Button>
          </div>
          <motion.div className='col-span-full space-y-2'>
            {/* Error Message */}
            {error && (
              <motion.div
                className='flex items-center justify-center gap-1.5 p-2 rounded-md text-red-500 mt-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HiOutlineExclamationCircle className='size-4' />
                {error}
              </motion.div>
            )}
            {/* Note */}
            <motion.div
              className='mt-3 px-3 py-2 rounded-xl border border-neutral-300 bg-neutral-100'
            >
              <p>
                Note: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum optio, amet ipsam odio similique ut eius eaque nam.
              </p>
            </motion.div>
          </motion.div>
        </form>
      </div>
      {/* Right Content */}
      <div className='space-y-3'>
        <Badge variant='default'>
          <HiOutlineChat className='size-4' />
          Reach out to us
        </Badge>
        <h1>Lorem ipsum dol it, met cons semp.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, debitis consequatur quisquam veritatis eos repellat quam vitae, ex, ducimus dolorum quasi dolorem consectetur voluptates. Molestiae soluta beatae totam optio vitae:</p>
        {/* More */}
        <div className='grid md:grid-cols-3 grid-cols-2 gap-2 mt-6'>
          <a href={`mailto:${contactInfo?.email}`} className='flex flex-col justify-between border border-neutral-300 hover:bg-neutral-100 p-2 rounded-xl h-24 transition duration-300 ease-in-out'>
            <ContactInfo title='Chat with us!' label={contactInfo?.email} link>
              <HiOutlineChat className='md:size-6 size-5 stroke-[1.3px]' />
            </ContactInfo>
          </a>
          <div className='flex flex-col justify-between border border-neutral-300 p-2 rounded-xl h-24'>
            <ContactInfo title='Give us a call!' label={contactInfo?.telephone}>
              <HiOutlinePhone className='md:size-6 size-5 stroke-[1.3px]' />
            </ContactInfo>
          </div>
          <div className='flex flex-col justify-between border border-neutral-300 p-2 rounded-xl h-24'>
            <ContactInfo title='Visit our office!' label={contactInfo?.location}>
              <HiOutlineLocationMarker className='md:size-6 size-5 stroke-[1.3px]' />
            </ContactInfo>
          </div>
        </div>
        {/* Socials */}
        <div className='space-y-2'>
          <p>Our Socials:</p>
          <div className='flex items-center gap-2'>
            {[contactInfo?.link1, contactInfo?.link2, contactInfo?.link3, contactInfo?.link4]
              .filter(Boolean)
              .map((link, index) => {
                const { icon: Icon, color } = getIconData(link)
                return (
                  Icon && (
                    <a href={link} target="_blank" rel="noopener noreferrer" key={index} className="hover:bg-neutral-100 flex items-center justify-center size-8 rounded-full transition duration-300 ease-in-out">
                      <Icon className={`size-4.5 ${color}`} />
                    </a>
                  )
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
