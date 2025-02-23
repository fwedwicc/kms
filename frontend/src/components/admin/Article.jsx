import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'

const Article = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [article, setArticles] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: ''
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
      await api.post(`/article`, formData)

      setFormData({
        title: '',
        body: '',
        tags: ''
      })
    } catch (error) {
      setError(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Function to fetch articles
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article')
        const newData = response.data.data

        // Check if new data is added
        if (lastFetchData.length > 0 && newData.length > lastFetchData.length) {
          toast.success('New Article added', {
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
        setArticles(newData)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [lastFetchData])

  // Handle Delete Article
  const handleDelete = async (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this Article?")

    if (isConfirmed) {
      try {
        await api.delete(`/article/${id}`)
        toast.success('Article deleted successfuly!', {
          style: {
            border: "1px solid rgba(229, 231, 235, 0.8)",
            boxShadow: "0px 4px 6px rgba(229, 231, 235, 0.3)",
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
        setArticles((prevArticles) => prevArticles.filter((faq) => faq._id !== id))
      } catch (error) {
        console.error("Error deleting Article:", error)
      }
    }
  }

  return (
    <div className='border rounded-xl p-4'>
      <Toaster position="top-right" />
      <h1>ADMIN: Articles</h1>
      <div className='border'>
        <ul className='divide-y'>
          {article.map((article) => (
            <li key={article._id}>
              <h2>Title: {article.title}</h2>
              <p>Body: {article.body}</p>
              <p>Tags: {article.tags}</p>
              <button onClick={() => handleDelete(article._id)} className="text-red-500">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <fieldset>
          <legend>Title</legend>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="rounded-md px-3 py-1.5 border"
          />
        </fieldset>
        {/* Body */}
        <fieldset>
          <legend>Body</legend>
          <input
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="rounded-md px-3 py-1.5 border"
          />
        </fieldset>
        {/* Tags */}
        <fieldset>
          <legend>Tags</legend>
          <input
            type="text"
            name="tags"
            value={formData.tags}
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

export default Article
