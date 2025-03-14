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
    <section id='contact' className='grid lg:grid-cols-2 grid-cols-1 border rounded-xl lg:px-36 md:px-12 gap-4 px-4 p-4 md:p-14'>
      <Toaster position="top-right" />
      {/* Left Content */}
      <div className='border'>
        <h3>Lorem ips dolrsit.</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <form onSubmit={handleSubmit} className='mt-4'>
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
      <div className='border space-y-3'>
        <Badge styles='border-green-500/30 bg-green-400/5 text-green-600'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          Reach out to us
        </Badge>
        <h1>Lorem ipsum dol it, met cons semp.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, debitis consequatur quisquam veritatis eos repellat quam vitae, ex, ducimus dolorum quasi dolorem consectetur voluptates. Molestiae soluta beatae totam optio vitae:</p>
        {/* More */}
        <div className='grid md:grid-cols-3 grid-cols-2 gap-2 mt-4'>
          <a href='#' className='border p-2 rounded-2xl space-y-2'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className='leading-none'>Phone</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
            <p className='truncate'>company.test@email.com</p>
          </a>
          <a href='#' className='border p-2 rounded-2xl space-y-2'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className='leading-none'>Phone</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
            <p className='truncate'>company.test@email.com</p>
          </a>
          <a href='#' className='border p-2 rounded-2xl space-y-2'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className='leading-none'>Phone</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
            <p className='truncate'>company.test@email.com</p>
          </a>
        </div>
        {/* Socials */}
        <div className='space-y-2'>
          <p>Socials:</p>
          <div className='flex items-center gap-2'>
            <a href="" className='flex items-center justify-center size-7 rounded-full border'>
              <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="" className='flex items-center justify-center size-7 rounded-full border'>
              <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="" className='flex items-center justify-center size-7 rounded-full border'>
              <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Contact
