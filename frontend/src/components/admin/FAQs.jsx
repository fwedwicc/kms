import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

const FAQs = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  })

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.question || !formData.answer) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/faqs`, {
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
        question: '',
        answer: ''
      })
      alert('New FAQ added successfully!')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='border rounded-xl p-4'>
      <h1>ADMIN: FAQs</h1>
      <form onSubmit={handleSubmit}>
        {/* Question */}
        <fieldset>
          <legend>Question</legend>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="rounded-md px-3 py-1.5 border"
          />
        </fieldset>
        {/* Answer */}
        <fieldset>
          <legend>Answer</legend>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="rounded-md px-3 py-1.5 border"
          />
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

export default FAQs
