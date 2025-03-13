import React, { useState } from 'react'
import { Badge } from '../ui'
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

  return (
    <section id='contact' className='grid lg:grid-cols-2 grid-cols-1 border rounded-xl lg:px-36 md:px-12  px-4 p-4 md:p-14'>
      <Toaster position="top-right" />
      {/* Left Content */}
      <div className='border'>
        <h3>Lorem ips dolrsit.</h3>
        <form onSubmit={handleSubmit}>
          {/* Firstname */}
          <fieldset>
            <legend>Firstname</legend>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-md px-3 py-1.5 border"
            />
          </fieldset>
          {/* Lastname */}
          <fieldset>
            <legend>Lastname</legend>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-md px-3 py-1.5 border"
            />
          </fieldset>
          {/* Email */}
          <fieldset>
            <legend>Email</legend>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md px-3 py-1.5 border"
            />
          </fieldset>
          {/* Message */}
          <fieldset>
            <legend>Message</legend>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="rounded-md px-3 py-1.5 border"
            />
          </fieldset>
          {/* Terms Agreed */}
          <fieldset>
            <legend>Terms Agreed</legend>
            <label>
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
              />
              I agree to the terms and conditions
            </label>
          </fieldset>
          {/* Error Message */}
          {error && <p className='text-red-500'>{error}</p>}
          {/* Submit Button */}
          <button type="submit" disabled={loading} className='rounded-md px-3 py-1.5 border'>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      {/* Right Content */}
      <div className='border'>
        <Badge styles='border-green-500/30 bg-green-400/5 text-green-600'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          Reach out to us
        </Badge>
        <h1>Lorem ipsum dol it, met cons semp.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, debitis consequatur quisquam veritatis eos repellat quam vitae, ex, ducimus dolorum quasi dolorem consectetur voluptates. Molestiae soluta beatae totam optio vitae.</p>
        <p>Links diney</p>
      </div>

    </section>
  )
}

export default Contact
