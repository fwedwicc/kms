import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '../ui'
import { HiOutlineLightBulb, HiOutlineArrowRight, HiOutlineTrash, HiOutlinePencil, HiOutlinePlusSm } from "react-icons/hi"
import Swal from 'sweetalert2'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Article = () => {

  const [article, setArticles] = useState([])

  useEffect(() => {
    // Function to fetch articles
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article')
        setArticles(response.data.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
    const interval = setInterval(fetchArticles, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle Add Article
  const handleAddArticle = async () => {
    let selectedImageFile = null

    const { value: formValues } = await Swal.fire({
      title: 'Add New Article',
      html: `
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Title</label>
          <input id="swal-title" class="swal-input w-full" placeholder="Article title" />
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Body</label>
          <textarea id="swal-body" class="swal-textarea w-full" rows="3" placeholder="Article content"></textarea>
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Tags (comma separated)</label>
          <input id="swal-tags" class="swal-input w-full" placeholder="tag1, tag2" />
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Image</label>
          <input type="file" id="swal-image" accept="image/*" class="swal-input w-full" />
          <img id="swal-image-preview" class="mt-2 rounded-md max-w-xs hidden" />
        </div>
        <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
      </div>
    `,
      customClass: {
        popup: "swal-popup-xl",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel"
      },
      showCancelButton: true,
      confirmButtonText: 'Add Article',
      showLoaderOnConfirm: true,
      focusConfirm: false,
      didOpen: () => {
        const fileInput = document.getElementById('swal-image')
        const preview = document.getElementById('swal-image-preview')

        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0]
          if (file) {
            selectedImageFile = file
            const reader = new FileReader()
            reader.onload = e => {
              preview.src = e.target.result
              preview.classList.remove('hidden')
            }
            reader.readAsDataURL(file)
          }
        })
      },
      preConfirm: () => {
        const title = document.getElementById('swal-title').value.trim()
        const body = document.getElementById('swal-body').value.trim()
        const tags = document.getElementById('swal-tags').value.trim()
        const errorDiv = document.getElementById('swal-validation-message')

        if (!title || !body || !tags) {
          errorDiv.innerHTML = `
          <div class="flex items-center gap-1 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>All fields are required</span>
          </div>
        `
          return false
        }

        return { title, body, tags }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

    if (formValues) {
      const formData = new FormData()
      formData.append('title', formValues.title)
      formData.append('body', formValues.body)
      formData.append('tags', formValues.tags)
      if (selectedImageFile) {
        formData.append('image', selectedImageFile)
      }
      try {
        await api.post('/article', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast.success('Article added', {
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
      } catch (err) {
        console.error('Failed to add article:', err)
        toast.error('Failed to add article', {
          style: {
            border: "1px solid rgba(229, 231, 235, 0.8)",
            boxShadow: "0px 4px 6px rgba(229, 231, 235, 0.3)",
            borderRadius: "12px",
            padding: '10px',
            color: '#ef4444',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        })
      }
    }
  }

  // Handle Edit Article
  const handleEdit = async (article) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Article',
      html: `
        <div class="space-y-4 text-left">
          <div>
            <label class="block text-sm font-medium text-stone-700">Title</label>
            <input id="swal-title" class="mt-1 block w-full p-2 border rounded-md" value="${article.title}">
          </div>
          <div>
            <label class="block text-sm font-medium text-stone-700">Body</label>
            <textarea id="swal-body" class="mt-1 block w-full p-2 border rounded-md" rows="3">${article.body}</textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-stone-700">Tags</label>
            <input id="swal-tags" class="mt-1 block w-full p-2 border rounded-md" value="${article.tags}">
          </div>
          <div>
            <label class="block text-sm font-medium text-stone-700">Image</label>
            <input id="swal-image" type="file" class="mt-1 block w-full p-2 border rounded-md">
          </div>
          ${article.image ? `
          <div>
            <label class="block text-sm font-medium text-stone-700">Current Image</label>
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-sm",
        confirmButton: "swal-danger",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/article/${id}`)
        toast.success('Article deleted', {
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
        setArticles((prevArticles) => prevArticles.filter((faq) => faq._id !== id))
      } catch (error) {
        console.error("Error deleting Article:", error)
        toast.error('Failed to delete Article', {
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
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster position="top-right" />
      <h3>Article Management</h3>
      <p>{article.length} total article</p>
      <Button
        variant='primary'
        onClick={handleAddArticle}
      >
        New Article
        <HiOutlinePlusSm className='size-5 stroke-2' />
      </Button>
      <ul className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-6'>
        {article.map((article) => (
          <li key={article._id} className='p-2.5 border border-neutral-200 rounded-2xl'>
            {article.image ? (
              <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
                <img
                  src={`${SERVER_URL}${article.image}`}
                  alt={article.title}
                  className="absolute w-full h-full object-cover"
                />
              </div>
            ) : <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
              <img src="https://placehold.co/30x30" alt="Placeholder Image" className='absolute w-full h-full object-cover' />
            </div>}
            {/* Article Infos */}
            <div className='space-y-2.5 p-4'>
              <h4 className='break-all line-clamp-2 text-2xl font-medium'>{article.title}</h4>
              <p className='break-all line-clamp-4'>{article.body}</p>
              <div className='flex items-end justify-between gap-2 mt-6'>
                {/* Date */}
                <p>
                  {new Date(article.createdAt).toLocaleDateString('en-PH', {
                    month: 'short', day: '2-digit', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            {/* Action Buttons */}
            <div className='flex items-center justify-between p-1'>
              <Link to={`/article/${article._id}`}>
                <Button
                  variant='secondary'
                >
                  Read more
                  <HiOutlineArrowRight className='size-4.5 -rotate-45 stroke-[1.5px] mt-1' />
                </Button>
              </Link>
              <div className='flex gap-2'>
                <Button
                  variant='danger'
                  onClick={() => handleDelete(article._id)}
                >
                  <HiOutlineTrash className='size-5 stroke-[1.5px]' />
                  Delete
                </Button>
                <Button
                  variant='info'
                  onClick={() => handleEdit(article)}
                >
                  <HiOutlinePencil className='size-5 stroke-[1.5px]' />
                  Edit
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Article
