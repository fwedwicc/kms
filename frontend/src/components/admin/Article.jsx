import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '../ui'
import { HiOutlineArrowRight, HiOutlineTrash, HiOutlinePencil, HiOutlinePlusSm } from "react-icons/hi"
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
  const handleAddArticle = async (existingValues = null) => {
    let selectedImageFile = null
    let isDirty = false

    // Function to process form submission
    const processForm = async (formValues) => {
      if (!formValues) return false

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

        return true // Success
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

        return false // Failed
      }
    }

    // Store whether we're closing due to successful submission
    let closeWithoutConfirm = false

    // Start the main form
    const modalResult = await Swal.fire({
      title: 'Add New Article',
      html: `
    <script>
      function autoResize(textarea) {
        const scrollTop = window.scrollY
        textarea.style.height = 'auto' // Reset height
        textarea.style.height = textarea.scrollHeight + 'px' // Set to new height
        window.scrollTo({ top: scrollTop }) // Restore scroll position
      }
    </script>
    <div class="space-y-4 text-left">
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Title</label>
        <input id="swal-title" class="swal-input w-full" placeholder="Article title" value="${existingValues?.title || ''}" />
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Body</label>
        <textarea
          id="swal-body"
          class="swal-textarea w-full resize-none overflow-hidden"
          rows="6"
          placeholder="Article content"
        >${existingValues?.body || ''}</textarea>
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Tags <span class='text-gray-500 font-normal'>(comma separated)</span></label>
        <input id="swal-tags" class="swal-input w-full" placeholder="tag1, tag2" value="${existingValues?.tags || ''}" />
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Image</label>
        <input type="file" id="swal-image" accept="image/*" class="swal-input w-full" />
        <div class='flex items-center justify-center mt-6'>
          <img id="swal-image-preview" class="mt-2 rounded-lg max-w-lg ${existingValues?.imagePreview ? '' : 'hidden'}" ${existingValues?.imagePreview ? `src="${existingValues.imagePreview}"` : ''} /> 
        </div>
      </div>
      <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
    </div>
    `,
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-5xl",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
      showCancelButton: true,
      confirmButtonText: 'Add Article',
      showLoaderOnConfirm: true,
      focusConfirm: false,
      didOpen: () => {
        const fileInput = document.getElementById('swal-image')
        const preview = document.getElementById('swal-image-preview')
        const textarea = document.getElementById('swal-body')
        const titleInput = document.getElementById('swal-title')
        const tagsInput = document.getElementById('swal-tags')

        if (textarea) {
          const autoResize = (el) => {
            const scrollTop = window.scrollY
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + 'px'
            window.scrollTo({ top: scrollTop })
          }

          // Initialize height for textarea if there's content
          if (textarea.value) {
            autoResize(textarea)
          }

          textarea.addEventListener('input', () => autoResize(textarea))
        }

        // Set isDirty based on initial values
        const checkDirty = () => {
          isDirty =
            titleInput.value.trim() !== '' ||
            textarea.value.trim() !== '' ||
            tagsInput.value.trim() !== ''
        }

        // Check initial dirty state
        checkDirty()

        // Input listeners
        titleInput.addEventListener('input', checkDirty)
        tagsInput.addEventListener('input', checkDirty)
        textarea.addEventListener('input', () => {
          checkDirty()
          autoResize(textarea)
        })

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

        // Restore image if it existed
        if (existingValues?.selectedImageFile) {
          selectedImageFile = existingValues.selectedImageFile
        }
      },
      preConfirm: async () => {
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
          <span>Title, body, and tags are required</span>
        </div>
        `
          return false
        }

        // Process form submission directly in preConfirm
        const formData = { title, body, tags }
        const success = await processForm(formData)

        // Mark as successful to bypass confirmation on close
        if (success) {
          closeWithoutConfirm = true
          return formData
        } else {
          // If submission failed, prevent closing
          return false
        }
      },
      willClose: async () => {
        // Skip confirmation if the form was submitted successfully
        if (isDirty && !closeWithoutConfirm) {
          // Capture current form values before confirmation dialog
          const currentValues = {
            title: document.getElementById('swal-title').value,
            body: document.getElementById('swal-body').value,
            tags: document.getElementById('swal-tags').value,
            imagePreview: document.getElementById('swal-image-preview').getAttribute('src'),
            selectedImageFile: selectedImageFile
          }

          const result = await Swal.fire({
            title: 'Discard changes?',
            text: 'You have unsaved input. Are you sure you want to cancel?',
            icon: 'warning',
            iconColor: "#ef4444",
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
            showCancelButton: true,
            confirmButtonText: 'Yes, discard it',
            cancelButtonText: 'No, keep editing',
            reverseButtons: true
          })

          if (!result.isConfirmed) {
            // Reopen the form with preserved values
            setTimeout(() => handleAddArticle(currentValues), 0)
            return false // Prevent closing
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  // Handle Edit Article
  const handleEdit = async (article) => {
    let selectedImageFile = null

    const { value: formValues } = await Swal.fire({
      title: 'Edit Article',
      html: `
    <script>
      function autoResize(textarea) {
        const scrollTop = window.scrollY
        textarea.style.height = 'auto' // Reset height
        textarea.style.height = textarea.scrollHeight + 'px' // Set to new height
        window.scrollTo({ top: scrollTop }) // Restore scroll position
      }
    </script>
    <div class="space-y-4 text-left">
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Title</label>
        <input id="swal-title" class="swal-input w-full" placeholder="Article title" value="${article.title}" />
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Body</label>
        <textarea id="swal-body" class="swal-textarea w-full resize-none overflow-hidden" rows="6" placeholder="Article content">${article.body}</textarea>
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Tags (comma separated)</label>
        <input id="swal-tags" class="swal-input w-full" placeholder="tag1, tag2" value="${article.tags}" />
      </div>
      <div>
        <label class="block text-sm mb-1 font-medium text-gray-700">Image</label>
        <input type="file" id="swal-image" accept="image/*" class="swal-input w-full" />
      </div>
      ${article.image ? `
      <div class='flex flex-col items-center justify-center mt-6'>
        <label class="block text-sm mb-1 font-medium text-gray-700 text-center">Current Image</label>
          <img src="${SERVER_URL}${article.image}" alt="Current image" class="rounded-lg max-w-lg w-full' /> 
      </div>` : ''}
      <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
    </div>
    `,
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-5xl",
        confirmButton: "swal-info",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
      showCancelButton: true,
      confirmButtonText: 'Update Article',
      showLoaderOnConfirm: true,
      focusConfirm: false,
      didOpen: () => {
        const fileInput = document.getElementById('swal-image')
        const preview = document.getElementById('swal-image-preview')
        const textarea = document.getElementById('swal-body')

        if (textarea) {
          const autoResize = (el) => {
            const scrollTop = window.scrollY
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + 'px'
            window.scrollTo({ top: scrollTop })
          }

          // Initialize height for textarea if there's content
          if (textarea.value) {
            autoResize(textarea)
          }

          textarea.addEventListener('input', () => autoResize(textarea))
        }

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
      try {
        // Prepare form data for API call
        const updateFormData = new FormData()
        updateFormData.append('title', formValues.title)
        updateFormData.append('body', formValues.body)
        updateFormData.append('tags', formValues.tags)

        if (selectedImageFile) {
          updateFormData.append('image', selectedImageFile)
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

        toast.success('Article updated', {
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
        toast.error('Failed to update Article', {
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
      <div className='flex items-end justify-between'>
        <div>
          <h3>Article Management</h3>
          <p>{article.length} total article</p>
        </div>
        <Button
          variant='primary'
          onClick={handleAddArticle}
        >
          New Article
          <HiOutlinePlusSm className='size-5 stroke-2' />
        </Button>
      </div>
      <ul className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-6'>
        {[...article].reverse().map((article) => (
          <li key={article._id} className='p-2.5 border border-neutral-200 rounded-2xl'>
            {article.image ? (
              <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
                <img
                  src={`${SERVER_URL}${article.image}`}
                  alt={article.title}
                  className="z-40 absolute w-full h-full object-cover"
                />
              </div>
            ) : <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
              <img src="https://placehold.co/30x30" alt="Placeholder Image" className='z-40 absolute w-full h-full object-cover' />
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
