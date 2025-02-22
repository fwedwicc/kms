import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'

const FAQs = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])
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
    } catch (error) {
      setError(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Function to fetch FAQs
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs')
        const newData = response.data.data

        // Check if new data is added
        if (lastFetchData.length > 0 && newData.length > lastFetchData.length) {
          toast.success('New FAQ added', {
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
        }
        setLastFetchData(newData)
        setFaqs(newData)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
  }, [lastFetchData])


  // Handle Delete FAQ
  const handleDelete = async (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this FAQ?")

    if (isConfirmed) {
      try {
        await api.delete(`/faqs/${id}`)
        toast.success('FAQ deleted successfuly!', {
          style: {
            border: "1px solid rgba(229, 231, 235, 0.8)", // border-neutral-200/80
            boxShadow: "0px 4px 6px rgba(229, 231, 235, 0.3)", // shadow-md shadow-neutral-200/30
            borderRadius: "12px",
            padding: '10px',
            paddingY: '20px',
            color: '#22c55e',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        })
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id))
      } catch (error) {
        console.error("Error deleting FAQ:", error)
      }
    }
  }

  return (
    <div className='border rounded-xl p-4'>
      <Toaster position="top-right" />
      <h1>ADMIN: FAQs</h1>
      <div className='border'>
        <ul className='divide-y'>
          {faqs.map((faq) => (
            <li key={faq._id}>
              <h2>Question: {faq.question}</h2>
              <p>Answer: {faq.answer}</p>
              <button onClick={() => handleDelete(faq._id)} className="text-red-500">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
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
