import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../utils/api'
import { Button } from '../ui'
import Swal from 'sweetalert2'
import { HiOutlineTrash, HiOutlinePencil, HiOutlinePlusSm } from "react-icons/hi"

const FAQs = () => {

  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    // Function to fetch FAQs
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs')
        setFaqs(response.data.data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
    const interval = setInterval(fetchFaqs, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle Add FAQ
  const handleAddFaq = async (existingValues = null) => {
    let isDirty = false
    let closeWithoutConfirm = false

    // Function to process form submission
    const processForm = async (formValues) => {
      if (!formValues) return false

      try {
        const response = await api.post('/faqs', formValues)
        setFaqs(prev => [...prev, response.data.data])

        toast.success('FAQ added', {
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
      } catch (error) {
        console.error('Error adding FAQ:', error)
        toast.error('Failed to add FAQ', {
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

    const { value: formValues } = await Swal.fire({
      title: 'Add New FAQ',
      html: `
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Question</label>
          <input id="swal-question" class="swal-input w-full" placeholder="Enter question" value="${existingValues?.question || ''}">
        </div>
        <div>
          <label class="block text-sm mb-1 font-medium text-gray-700">Answer</label>
          <textarea id="swal-answer" class="swal-textarea w-full" rows="6" placeholder="Enter answer">${existingValues?.answer || ''}</textarea>
        </div>
        <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
      </div>
    `,
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-xl",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add FAQ',
      showLoaderOnConfirm: true,
      didOpen: () => {
        const questionInput = document.getElementById('swal-question')
        const answerInput = document.getElementById('swal-answer')

        // Set isDirty based on initial values
        const checkDirty = () => {
          isDirty =
            questionInput.value.trim() !== '' ||
            answerInput.value.trim() !== ''
        }

        // Check initial dirty state
        checkDirty()

        // Input listeners
        questionInput.addEventListener('input', checkDirty)
        answerInput.addEventListener('input', checkDirty)
      },
      preConfirm: async () => {
        const question = document.getElementById('swal-question').value.trim()
        const answer = document.getElementById('swal-answer').value.trim()
        const errorDiv = document.getElementById('swal-validation-message')

        if (!question || !answer) {
          errorDiv.innerHTML = `
          <div class="flex items-center gap-1 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>Please fill in all fields</span>
          </div>
        `
          return false
        }

        errorDiv.textContent = ''

        // Process form submission directly in preConfirm
        const formData = { question, answer }
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
            question: document.getElementById('swal-question').value,
            answer: document.getElementById('swal-answer').value
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
            setTimeout(() => handleAddFaq(currentValues), 0)
            return false // Prevent closing
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }


  // Handle Edit FAQs
  const handleEdit = async (faq) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit FAQ',
      html: `
      <div class="space-y-4 text-left">
        <div class="mb-4">
          <label class="block text-sm mb-2 font-medium text-gray-700">Title</label>
          <input id="swal-question" class="swal-input w-full" value="${faq.question}">
        </div>
        <div class="mb-4">
          <label class="block text-sm mb-2 font-medium text-gray-700">Body</label>
          <textarea id="swal-answer" class="swal-textarea w-full" rows="3">${faq.answer}</textarea>
        </div>
        <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
      </div>
    `,
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-xl",
        confirmButton: "swal-info",
        cancelButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update FAQ',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const question = document.getElementById('swal-question').value.trim()
        const answer = document.getElementById('swal-answer').value.trim()
        const errorDiv = document.getElementById('swal-validation-message')

        if (!question || !answer) {
          errorDiv.innerHTML = `
          <div class="flex items-center gap-1 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>Please fill in all fields</span>
          </div>
        `
          return false
        }

        errorDiv.textContent = ''
        return { question, answer }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

    if (formValues) {
      try {
        const updateFormData = {
          question: formValues.question,
          answer: formValues.answer
        }

        const response = await api.put(`/faqs/${faq._id}`, updateFormData)

        // Update FAQ state with the updated FAQ
        setFaqs(prevFaqs =>
          prevFaqs.map(item =>
            item._id === faq._id ? response.data.data : item
          )
        )
        toast.success('FAQ updated', {
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
        console.error("Error updating FAQ:", error)
        toast.error('Failed to update FAQ', {
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

  // Handle Delete FAQ
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
        await api.delete(`/faqs/${id}`)
        toast.success('FAQ deleted', {
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
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id))
      } catch (error) {
        console.error("Error deleting FAQ:", error)
        toast.error('Failed to delete FAQ', {
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
          <h5>FAQs</h5>
          <p>{faqs.length} total FAQs</p>
        </div>
        <Button
          variant='primary'
          onClick={handleAddFaq}
          Reply
        >
          New FAQ
          <HiOutlinePlusSm className='size-5 stroke-2' />
        </Button>
      </div>
      <ul className='grid grid-cols-3 gap-4 mt-6'>
        {[...faqs].reverse().map((faq) => (
          <li key={faq._id} className='flex flex-col justify-between gap-4 p-4 border border-neutral-200/70 rounded-2xl'>
            <div className='space-y-4'>
              <h5>{faq.question}</h5>
              <p>{faq.answer}</p>
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                variant='danger'
                onClick={() => handleDelete(faq._id)}
                Reply
              >
                <HiOutlineTrash className='size-5 stroke-[1.5px]' />
                Delete
              </Button>
              <Button
                variant='info'
                onClick={() => handleEdit(faq)}
                Reply
              >
                <HiOutlinePencil className='size-5 stroke-[1.5px]' />
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default FAQs
