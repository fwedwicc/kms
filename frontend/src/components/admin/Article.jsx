import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Article = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [article, setArticles] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file
      }))
      // Create preview URL
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create FormData object
      const submitFormData = new FormData()
      submitFormData.append('title', formData.title)
      submitFormData.append('body', formData.body)
      submitFormData.append('tags', formData.tags)
      if (formData.image) {
        submitFormData.append('image', formData.image)
      }

      await api.post('/article', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setFormData({
        title: '',
        body: '',
        tags: '',
        image: null
      })
      setImagePreview(null)
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
          toast.success('Article added successfully', {
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

  // Handle Edit Article
  const handleEdit = async (article) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Article',
      html: `
        <div class="space-y-4 text-left">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input id="swal-title" class="mt-1 block w-full p-2 border rounded-md" value="${article.title}">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Body</label>
            <textarea id="swal-body" class="mt-1 block w-full p-2 border rounded-md" rows="3">${article.body}</textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Tags</label>
            <input id="swal-tags" class="mt-1 block w-full p-2 border rounded-md" value="${article.tags}">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Image</label>
            <input id="swal-image" type="file" class="mt-1 block w-full p-2 border rounded-md">
          </div>
          ${article.image ? `
          <div>
            <label class="block text-sm font-medium text-gray-700">Current Image</label>
            <img src="${SERVER_URL}${article.image}" alt="Current image" class="mt-1 max-w-xs rounded-lg">
          </div>` : ''}
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          title: document.getElementById('swal-title').value,
          body: document.getElementById('swal-body').value,
          tags: document.getElementById('swal-tags').value,
          image: document.getElementById('swal-image').files[0]
        }
      }
    })

    if (formValues) {
      try {
        // Prepare form data for API call
        const updateFormData = new FormData()
        updateFormData.append('title', formValues.title)
        updateFormData.append('body', formValues.body)
        updateFormData.append('tags', formValues.tags)

        if (formValues.image) {
          updateFormData.append('image', formValues.image)
        }

        const response = await api.put(`/article/${article._id}`, updateFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // Update article state with the updated article
        setArticles(prevArticles =>
          prevArticles.map(item =>
            item._id === article._id ? response.data.data : item
          )
        )

        toast.success('Article updated successfully!', {
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
        console.error("Error updating article:", error)
        toast.error('Failed to update article')
      }
    }
  }

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
    <section className='border rounded-xl p-4'>
      <Toaster position="top-right" />
      <h1>ADMIN: Articles</h1>
      <div className='border'>
        <ul className='divide-y'>
          {article.map((article) => (
            <li key={article._id}>
              <h2>Title: {article.title}</h2>
              {article.image && (
                <img
                  src={`${SERVER_URL}${article.image}`}
                  alt={article.title}
                  className="mt-2 max-w-xs rounded-lg"
                />
              )}
              <p>Body: {article.body}</p>
              <p>Tags: {article.tags}</p>
              <Link to={`/article/${article._id}`} className='px-3 py-2 border rounded-md inline-block'>Read More</Link>
              <button onClick={() => handleDelete(article._id)} className="text-red-500">
                Delete
              </button>
              <button onClick={() => handleEdit(article)} className="text-blue-500">
                Edit
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
        {/* Image Upload */}
        <fieldset>
          <legend>Image</legend>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="rounded-md px-3 py-1.5 border w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-w-xs rounded-lg"
            />
          )}
        </fieldset>
        {/* Error Message */}
        {error && <p className='text-red-500'>{error}</p>}
        {/* Submit Button */}
        <button type="submit" disabled={loading} className='rounded-md px-3 py-1.5 border'>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}

export default Article
