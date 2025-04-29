import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { InputText, Button, Badge, Spinner } from '../ui'
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const GeneralInfo = () => {
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

      alert('Company information updated successfully.')
    } catch (error) {
      setError(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='grid md:grid-cols-2 grid-cols-1 gap-6'
    >
      {/* Company Info */}
      <form onSubmit={handleSubmit} className='border'>
        <h5>Company Content</h5>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        {/* Form */}
        <div className='flex items-start gap-8 border mt-6'>
          {/* Logo */}
          <div className='shrink-0 relative size-30 rounded-2xl overflow-hidden border'>
            {formData.logo && !(formData.logo instanceof File) && (
              <img src={`${SERVER_URL}${formData.logo}`} alt={formData.companyName} className='absolute w-full h-full object-cover' />
            )}
            {formData.logo instanceof File && (
              <img src={URL.createObjectURL(formData.logo)} alt="New Logo" className='absolute w-full h-full object-cover' />
            )}
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
            {/* Logo Upload */}
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor="logo">Change Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg transition duration-300 ease-in-out focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
              />
            </fieldset>
          </div>
        </div>
        {/* Submit Button */}
        <div className='flex justify-center mt-6'>
          {error && (
            <Badge className="text-green-600 bg-green-100">
              {error}
            </Badge>
          )}
        </div>
        <div className='mt-4 flex justify-end gap-4'>
          <Button type="submit" disabled={loading} variant='primary'>
            {loading ? 'Updating' : 'Update content'}
            {loading ? <Spinner /> : null}
          </Button>
        </div>
      </form>

      {/* Contact Info */}
      <div className='border'>
        <h5>Contact Information</h5>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        {/* Form */}
      </div>
    </motion.div>
  )
}

export default GeneralInfo
