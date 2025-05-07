import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiCamera, HiOutlineExclamationCircle } from "react-icons/hi"
import { InputText, Button, Spinner } from '../ui'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const GeneralInfo = () => {

  const CompanyContent = () => {

    const [formData, setFormData] = useState({
      companyName: '',
      description: '',
      logo: '', // this can be a file OR string
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Fetch Company Info
    useEffect(() => {
      const fetchCompanyInfo = async () => {
        try {
          const response = await api.get(`/company`)
          const company = response.data.data
          setFormData({
            companyName: company.name || '',
            description: company.description || '',
            logo: company.logo || ''
          })
        } catch (err) {
          console.error(err)
        }
      }

      fetchCompanyInfo()
    }, [])

    // Handle Text Change
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }))
    }

    // Handle File Change
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setFormData((prevData) => ({
          ...prevData,
          logo: file
        }))
      }
    }

    // Handle Form Submit
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        setError('')

        const form = new FormData()
        form.append('name', formData.companyName)
        form.append('description', formData.description)

        // Only append logo if it's a file (means user uploaded new)
        if (formData.logo instanceof File) {
          form.append('logo', formData.logo)
        }

        await api.put(`/company`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        toast.success('Content updated', {
          style: {
            border: "1px solid rgba(229, 231, 235, 0.8)",
            boxShadow: "0px 4px 6px rgba(229, 231, 235, 0.3)",
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

    return (
      <form onSubmit={handleSubmit} className='w-full max-w-2xl pb-10 border-b border-neutral-200'>
        <h5>Company Content</h5>
        <p>Update your company’s description and key details displayed across the site.</p>
        {/* Form */}
        <div className='flex items-start gap-8 mt-10'>
          {/* Logo */}
          <div className='shrink-0 relative size-30 rounded-2xl'>
            {formData.logo && !(formData.logo instanceof File) && (
              <img src={`${SERVER_URL}${formData.logo}`} alt={formData.companyName} className='rounded-2xl absolute w-full h-full object-cover' />
            )}
            {formData.logo instanceof File && (
              <img src={URL.createObjectURL(formData.logo)} alt="New Logo" className='rounded-2xl absolute w-full h-full object-cover' />
            )}
            <div className='flex items-center justify-center absolute -bottom-2 -right-2 cursor-pointer size-8 border rounded-xl bg-neutral-200 text-neutral-400'>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="opacity-0 z-30 size-8"
              />
              <HiCamera className='size-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20' />
            </div>
          </div>
          {/* Name & Description */}
          <div className='flex flex-col gap-2 w-full'>
            {/* Company name */}
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor="companyName">Company name</label>
              <InputText
                type="text"
                name="companyName"
                className='w-full max-w-2xs'
                value={formData.companyName}
                onChange={handleChange}
              />
            </fieldset>
            {/* Description */}
            <fieldset className='flex flex-col gap-1 w-full'>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows='3'
                className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg transition duration-300 ease-in-out focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
              />
            </fieldset>
          </div>
        </div>
        <div className='flex justify-center mt-2'>
          {/* Error Message */}
          {error && (
            <motion.div
              className='flex items-center justify-center gap-1.5 p-2 rounded-md text-red-500'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineExclamationCircle className='size-4' />
              {error}
            </motion.div>
          )}
        </div>
        {/* Submit Button */}
        <div className='mt-4 flex justify-end gap-4'>
          <Button type="submit" disabled={loading} variant='primary'>
            {loading ? 'Updating' : 'Update content'}
            {loading ? <Spinner /> : null}
          </Button>
        </div>
      </form>
    )
  }

  const ContactInfo = () => {

    const [formData, setFormData] = useState({
      email: '',
      telephone: '',
      location: '',
      link1: '',
      link2: '',
      link3: '',
      link4: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Fetch Contact Info
    useEffect(() => {
      const fetchContactInfo = async () => {
        try {
          const response = await api.get(`/contactInfo`)
          const contactInfo = response.data.data
          setFormData({
            email: contactInfo.email || '',
            telephone: contactInfo.telephone || '',
            location: contactInfo.location || '',
            link1: contactInfo.link1 || '',
            link2: contactInfo.link2 || '',
            link3: contactInfo.link3 || '',
            link4: contactInfo.link4 || '',
          })
        } catch (err) {
          console.error(err)
        }
      }

      fetchContactInfo()
    }, [])

    // Handle Text Change
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }))
    }

    // Handle Form Submit
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        setError('')

        await api.put(`/contactInfo`, formData)

        toast.success('Contact updated', {
          style: {
            border: "1px solid rgba(229, 231, 235, 0.8)",
            boxShadow: "0px 4px 6px rgba(229, 231, 235, 0.3)",
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

    return (
      <form onSubmit={handleSubmit} className='w-full max-w-2xl pt-10'>
        <h5>Contact Information</h5>
        <p>Manage your contact details including email, phone, and address for public display.</p>
        {/* Form */}
        <div className='grid grid-cols-2 gap-4 mt-10'>
          {/* Email */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="email">Company email</label>
            <InputText
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>
          {/* Telephone */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="telephone">Telephone</label>
            <InputText
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
          </fieldset>
          {/* Location */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="location">Office/Location</label>
            <InputText
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </fieldset>
          <div className='col-span-full mt-3'>
            <span className='font-medium text-lg'>Social Media:</span>
          </div>
          {/* Link 1 */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="link1">Social link 1</label>
            <InputText
              type="text"
              name="link1"
              value={formData.link1}
              onChange={handleChange}
            />
          </fieldset>
          {/* Link 2 */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="link2">Social link 2</label>
            <InputText
              type="text"
              name="link2"
              value={formData.link2}
              onChange={handleChange}
            />
          </fieldset>
          {/* Link 3 */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="link3">Social link 3</label>
            <InputText
              type="text"
              name="link3"
              value={formData.link3}
              onChange={handleChange}
            />
          </fieldset>
          {/* Link 4 */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="link3">Social link 4</label>
            <InputText
              type="text"
              name="link4"
              value={formData.link4}
              onChange={handleChange}
            />
          </fieldset>
          {/* Error */}
          {error && (
            <motion.div
              className='col-span-full flex items-center justify-center gap-1.5 p-2 rounded-md text-red-500'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineExclamationCircle className='size-4' />
              {error}
            </motion.div>
          )}
        </div>
        <div className='mt-7 flex justify-end gap-4'>
          <Button type="submit" disabled={loading} variant='primary'>
            {loading ? 'Updating' : 'Update content'}
            {loading ? <Spinner /> : null}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col items-center'
    >
      <Toaster position="top-right" />
      {/* Company Content */}
      <CompanyContent />
      {/* Contact Info */}
      <ContactInfo />
    </motion.div>
  )
}

export default GeneralInfo
