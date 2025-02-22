import React, { useState } from 'react'
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
    <div className='border rounded-xl p-4'>
      <Toaster position="top-right" />
      <h1>GUEST: Contact</h1>
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
  )
}

export default Contact
