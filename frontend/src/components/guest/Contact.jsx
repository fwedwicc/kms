import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExclamationCircle, HiOutlinePaperAirplane, HiOutlineArrowRight, HiOutlineChat, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi"
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiYoutube } from "react-icons/si"
import { InputText, Button, Badge, Spinner } from '../ui'
import api from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'

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

      toast.success('Nasend na bhie', {
        style: {
          border: "1px solid rgba(229, 231, 235, 0.8)", // border-neutral-200/80
          boxShadow: "0px 4px 6px rgba(229, 231, 235, 0.3)", // shadow-md shadow-neutral-200/30
          borderRadius: "12px",
          padding: '10px',
          color: '#22c55e',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff',
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
      <Toaster position="bottom-left" />
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
            <label htmlFor="lastName">Last name <span className='text-neutral-400 text-sm'>(Optional)</span></label>
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
          <motion.div layout className='col-span-full space-y-2'>
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
              layout
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
          <a href='mailto:' className='flex flex-col justify-between border border-neutral-300 hover:bg-neutral-100 p-2 rounded-xl h-24 transition duration-300 ease-in-out'>
            <ContactInfo title='Chat with us!' label='company.test@email.com' link>
              <HiOutlineChat className='md:size-6 size-5 stroke-[1.3px]' />
            </ContactInfo>
          </a>
          <div className='flex flex-col justify-between border border-neutral-300 p-2 rounded-xl h-24'>
            <ContactInfo title='Give us a call!' label='+121 3371 172'>
              <HiOutlinePhone className='md:size-6 size-5 stroke-[1.3px]' />
            </ContactInfo>
          </div>
          <div className='flex flex-col justify-between border border-neutral-300 p-2 rounded-xl h-24'>
            <ContactInfo title='Visit our office!' label='1990 Villa Street, Manila, Philippines'>
              <HiOutlineLocationMarker className='md:size-6 size-5 stroke-[1.3px]' />
            </ContactInfo>
          </div>
        </div>
        {/* Socials */}
        <div className='space-y-2'>
          <p>Our Socials:</p>
          <div className='flex items-center gap-2'>
            {[
              { link: 'https://youtube.com', icon: SiYoutube },
              { link: 'https://instagram.com', icon: SiInstagram },
              { link: 'https://facebook.com', icon: SiFacebook },
              { link: 'https://x.com', icon: SiX },
            ].map((item, index) => (
              <a href={item.link} target='_blank' className='hover:bg-neutral-100 flex items-center justify-center size-8 rounded-full transition duration-300 ease-in-out' key={index}>
                <item.icon className={`size-4.5 ${item.link.includes('facebook') ? 'text-blue-500' : item.link.includes('instagram') ? 'text-rose-500' : item.link.includes('x.com') ? 'text-neutral-900' : item.link.includes('youtube') ? 'text-red-500' : null}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
