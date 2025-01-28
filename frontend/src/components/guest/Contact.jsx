import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

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

  // Validate Email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || formData.termsAgreed === false) {
      setError('Please fill in all fields and agree to the terms')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit the form')
      }

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        termsAgreed: false
      })
      alert('Form submitted successfully')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='border rounded-xl p-4'>
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
