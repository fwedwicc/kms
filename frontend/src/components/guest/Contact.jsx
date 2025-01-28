import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

const Contact = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    message: '',
    termsAgreed: false
  });

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

    if (!formData.firstName || !formData.lastName || !formData.message || formData.termsAgreed === false) {
      setError('Please fill in all fields and agree to the terms')
      return
    }
    setLoading(true)

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
          />
        </fieldset>
        {/* Message */}
        <fieldset>
          <legend>Message</legend>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
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
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

      </form>
    </div>
  )
}

export default Contact
