import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiCamera, HiOutlineExclamationCircle } from "react-icons/hi"
import { InputText, Button, Spinner } from '../ui'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Contents = () => {

  const HeroContent = () => {

    const [formData, setFormData] = useState({
      heading: '',
      description: '',
      illustration: '', // this can be a file OR string
      totalGuests: '',
      totalRooms: '',
      totalYears: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Fetch Hero Content
    useEffect(() => {
      const fetchHeroContent = async () => {
        try {
          const response = await api.get(`/hero`)
          const hero = response.data.data
          setFormData({
            heading: hero.heading || '',
            description: hero.description || '',
            illustration: hero.illustration || '',
            totalGuests: hero.totalGuests || '',
            totalRooms: hero.totalRooms || '',
            totalYears: hero.totalYears || ''
          })
        } catch (err) {
          console.error(err)
        }
      }

      fetchHeroContent()
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
          illustration: file
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
        form.append('heading', formData.heading)
        form.append('description', formData.description)
        form.append('totalGuests', formData.totalGuests)
        form.append('totalRooms', formData.totalRooms)
        form.append('totalYears', formData.totalYears)

        // Only append illustration if it's a file (means user uploaded new)
        if (formData.illustration instanceof File) {
          form.append('illustration', formData.illustration)
        }

        await api.put(`/hero`, form, {
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
        <h5>Hero Content</h5>
        <p>Edit the main heading and description that appear on the homepage banner.</p>
        {/* Form */}
        <div className='grid grid-cols-2 gap-4 mt-10'>
          {/* Heading */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="heading">Heading</label>
            <InputText
              id='heading'
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
            />
          </fieldset>
          {/* Illustration */}
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor="illustration">Illustration</label>
            <input
              type="file"
              name="illustration"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg transition duration-300 ease-in-out focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>
          {/* Description */}
          <fieldset className='col-span-full flex flex-col gap-1 w-full'>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows='3'
              className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg transition duration-300 ease-in-out focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>
          <div className='col-span-full mt-3'>
            <span className='font-medium text-lg'>Hero Data:</span>
          </div>
          {/* Total Guests */}
          <fieldset className='flex flex-col gap-1 w-full'>
            <label htmlFor="totalGuests">Total Guests</label>
            <InputText
              id='totalGuests'
              type="text"
              name="totalGuests"
              value={formData.totalGuests}
              onChange={handleChange}
            />
          </fieldset>
          {/* Total Rooms */}
          <fieldset className='flex flex-col gap-1 w-full'>
            <label htmlFor="totalRooms">Total Rooms</label>
            <InputText
              id='totalRooms'
              type="text"
              name="totalRooms"
              value={formData.totalRooms}
              onChange={handleChange}
            />
          </fieldset>
          {/* Total Years */}
          <fieldset className='flex flex-col gap-1 w-full'>
            <label htmlFor="totalYears">Total Years</label>
            <InputText
              id='totalYears'
              type="text"
              name="totalYears"
              value={formData.totalYears}
              onChange={handleChange}
            />
          </fieldset>
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

  const AboutContent = () => {

    const [formData, setFormData] = useState({
      description: '',
      illustration: '', // can be string (URL) or File
      services: [{ title: '', description: '' }], // should be an array
      highlightContent: '',
      content: '',
      highlights: [{ description: '' }]
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Fetch About Content
    useEffect(() => {
      const fetchAboutContent = async () => {
        try {
          const response = await api.get(`/about`)
          const about = response.data.data

          setFormData({
            description: about.description || '',
            illustration: about.illustration || '',
            services: about.services?.length ? about.services : [{ title: '', description: '' }],
            highlightContent: about.highlightContent || '',
            content: about.content || '',
            highlights: about.highlights?.length ? about.highlights : [{ description: '' }]
          })
        } catch (err) {
          console.error(err)
        }
      }

      fetchAboutContent()
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
          illustration: file
        }))
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setLoading(true)
        setError('')

        const form = new FormData()

        // Append text fields
        form.append('description', formData.description)
        form.append('highlightContent', formData.highlightContent)
        form.append('content', formData.content)

        // Handle illustration file if it exists
        if (formData.illustration instanceof File) {
          form.append('illustration', formData.illustration)
        }

        // Append services and highlights as JSON strings
        form.append('services', JSON.stringify(formData.services))
        form.append('highlights', JSON.stringify(formData.highlights))

        // Send the form data to the API
        const response = await api.put('/about', form, {
          headers: {
            'Content-Type': 'multipart/form-data', // Necessary for file uploads
          },
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
        setError(error.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    return (
      <form onSubmit={handleSubmit} className='w-full max-w-2xl pt-10'>
        <h5>About Content</h5>
        <p>Update the section that highlights your hotel’s story, values, and mission.</p>

        <div className='grid grid-cols-2 gap-4 mt-10 rounded-md'>

          {/* Description */}
          <fieldset className='col-span-full flex flex-col gap-1'>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>

          {/* Illustration */}
          <fieldset className='col-span-full flex flex-col gap-1'>
            <label htmlFor="illustration">Illustration</label>
            <input
              type="file"
              name="illustration"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>

          {/* Highlight Content */}
          <fieldset className='col-span-full flex flex-col gap-1'>
            <label htmlFor="highlightContent">Highlight Content</label>
            <textarea
              name="highlightContent"
              value={formData.highlightContent}
              onChange={handleChange}
              rows="2"
              className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>

          {/* Content */}
          <fieldset className='col-span-full flex flex-col gap-1'>
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className="px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none"
            />
          </fieldset>

          {/* Services */}
          <div className='col-span-full'>
            <span className='font-medium text-lg'>Services</span>
            {formData.services.map((service, index) => (
              <div key={index} className='grid grid-cols-2 gap-4 my-2'>
                <fieldset className='flex flex-col gap-1'>
                  <label>Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...formData.services]
                      newServices[index].title = e.target.value
                      setFormData({ ...formData, services: newServices })
                    }}
                    className="px-3 py-1.5 border bg-neutral-100/60 border-neutral-300/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800"
                  />
                </fieldset>
                <fieldset className='flex flex-col gap-1'>
                  <label>Description</label>
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...formData.services]
                      newServices[index].description = e.target.value
                      setFormData({ ...formData, services: newServices })
                    }}
                    className="px-3 py-1.5 border bg-neutral-100/60 border-neutral-300/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800"
                  />
                </fieldset>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className='col-span-full'>
            <span className='font-medium text-lg'>Highlights</span>
            {formData.highlights.map((highlight, index) => (
              <fieldset key={index} className='flex flex-col gap-1 my-2'>
                <label>Description</label>
                <input
                  type="text"
                  value={highlight.description}
                  onChange={(e) => {
                    const newHighlights = [...formData.highlights]
                    newHighlights[index].description = e.target.value
                    setFormData({ ...formData, highlights: newHighlights })
                  }}
                  className="px-3 py-1.5 border bg-neutral-100/60 border-neutral-300/60 rounded-lg focus:ring-2 ring-offset-1 focus:ring-neutral-800"
                />
              </fieldset>
            ))}
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
      {/* Hero Content */}
      <HeroContent />
      {/* About Content */}
      <AboutContent />
    </motion.div>
  )
}

export default Contents
