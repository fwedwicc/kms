import React, { useState } from 'react'
import api from '../../utils/api'

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
    setLoading(true)
    setError('')

    try {
      await api.post(`/faqs`, formData)

      setFormData({
        question: '',
        answer: ''
      })
      alert('New FAQ added successfully!')
    } catch (error) {
      setError(error.response?.data?.message)
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
