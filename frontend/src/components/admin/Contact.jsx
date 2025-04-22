import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, InputText } from '../ui'
import { HiOutlineArrowRight, HiOutlineSearch, HiOutlineReply } from "react-icons/hi"
import api from '../../utils/api'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {
  const [contact, setContact] = useState([])
  const [search, setSearch] = useState("")
  const [lastFetchData, setLastFetchData] = useState([])

  // Fetch all Contacts
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await api.get('/contact')
        const newData = response.data.data

        // Check if new data is added
        if (lastFetchData.length > 0 && newData.length > lastFetchData.length) {
          Swal.fire({
            icon: "info",
            iconColor: "#3b82f6",
            title: "New Contact Added",
            text: "Check out the new Inquiry submitted by a user.",
            customClass: {
              title: "swal-title",
              text: "swal-text",
              popup: "swal-popup-sm",
              confirmButton: "swal-confirm",
              cancelButton: "swal-cancel"
            },
            showClass: {
              popup: 'swal-fade-in'
            },
            hideClass: {
              popup: 'swal-fade-out'
            },
          })
        }
        setLastFetchData(newData)
        setContact(newData)
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }

    getContacts()
    const interval = setInterval(getContacts, 5000)
    return () => clearInterval(interval)
  }, [lastFetchData])

  // Filtered Contact
  const filteredContacts = contact
    .slice()
    .reverse()
    .filter(({ firstName, lastName, email, message }) => {
      const query = search.toLowerCase()
      return (
        firstName.toLowerCase().includes(query) ||
        lastName.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        message.toLowerCase().includes(query)
      )
    })

  // View Contact
  const handleViewContact = (contact) => {
    Swal.fire({
      title: `Inquiry from ${contact.firstName}`,
      html: `
      <div class="text-left mt-5">
        <div class='flex justify-between items-start'>
          <div>
            <span class='text-xl text-neutral-900 font-semibold'>${contact.lastName}, ${contact.firstName}</span>
            <p>${contact.email}</p>
          </div>
          <p class="mt-[1px]"> ${new Date(contact.createdAt).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}
         </p>
        </div>
        <br>
        <p>Message: ${contact.message}</p>
      </div>
    `,
      confirmButtonText: "Reply",
      denyButtonText: "Close",
      showDenyButton: true,
      customClass: {
        title: "swal-title",
        text: "swal-text",
        popup: "swal-popup-xl",
        confirmButton: "swal-confirm",
        denyButton: "swal-cancel"
      },
      showClass: {
        popup: 'swal-fade-in'
      },
      hideClass: {
        popup: 'swal-fade-out'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleReply(contact)
      }
    })
  }

  const handleReply = (contactData, existingValues = null) => {
    let isDirty = false
    let closeWithoutConfirm = false

    // Function to process form submission
    const processForm = async (formValues) => {
      if (!formValues) return false

      try {
        await sendEmail(contactData.email, contactData.firstName, formValues.subject, formValues.message)

        toast.success('Reply sent successfully', {
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
        console.error('Failed to send reply:', err)
        toast.error('Failed to send reply', {
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

    Swal.fire({
      title: 'Reply to Contact',
      html: `
    <div class="mb-4">
      <p class="mb-[2px] text-sm text-left">Replying to:</p>
      <div class='flex flex-col justify-start items-start -space-y-[2px]'>
        <span class='text-xl text-neutral-900 font-semibold'>${contactData.lastName}, ${contactData.firstName}</span>
        <p>${contactData.email}</p>
      </div>
    </div>
    <div class="mb-4">
      <label for="subject" class="block mb-2 text-left">Subject</label>
      <input id="subject" class="swal-input w-full" placeholder="Enter subject" value="${existingValues?.subject || ''}">
    </div>
    <div class="mb-4">
      <label for="message" class="block mb-2 text-left">Message</label>
      <textarea id="message" class="swal-textarea w-full" placeholder="Type your reply here...">${existingValues?.message || ''}</textarea>
    </div>
    <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
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
      confirmButtonText: 'Send Reply',
      showLoaderOnConfirm: true,
      didOpen: () => {
        const subjectInput = document.getElementById('subject')
        const messageInput = document.getElementById('message')

        // Set isDirty based on initial values
        const checkDirty = () => {
          isDirty =
            subjectInput.value.trim() !== '' ||
            messageInput.value.trim() !== ''
        }

        // Check initial dirty state
        checkDirty()

        // Input listeners
        subjectInput.addEventListener('input', checkDirty)
        messageInput.addEventListener('input', checkDirty)
      },
      preConfirm: async () => {
        const subject = document.getElementById('subject').value.trim()
        const message = document.getElementById('message').value.trim()
        const errorDiv = document.getElementById('swal-validation-message')

        if (!subject || !message) {
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
        const formData = { subject, message }
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
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
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
            setTimeout(() => handleReply(contactData, currentValues), 0)
            return false // Prevent closing
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  const sendEmail = (recipientEmail, recipientName, subject, message) => {
    const templateParams = {
      to_email: recipientEmail,
      to_name: recipientName,
      subject: subject,
      message: message
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('Email Sent Successfully', response.status, response.text)
        Swal.fire({
          icon: 'success',
          iconColor: "#22c55e",
          title: 'Reply Sent',
          text: `Your message has been sent to ${recipientName}`,
          confirmButtonText: 'Got it',
          customClass: {
            title: "swal-title",
            text: "swal-text",
            popup: "swal-popup-sm",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel"
          },
          showClass: {
            popup: 'swal-fade-in'
          },
          hideClass: {
            popup: 'swal-fade-out'
          },
        })
      }, (error) => {
        console.error('Failed to send email:', error)
        Swal.fire({
          icon: 'error',
          iconColor: "#ef4444",
          title: 'Failed to Send',
          text: 'There was an error sending your reply. Please try again later.',
          confirmButtonText: 'Got it',
          customClass: {
            title: "swal-title",
            text: "swal-text",
            popup: "swal-popup-sm",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel"
          },
          showClass: {
            popup: 'swal-fade-in'
          },
          hideClass: {
            popup: 'swal-fade-out'
          },
        })
      })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-between items-end'>
        <div>
          <h3>Contact Inquiries</h3>
          <p>{contact.length} total inquiry</p>
        </div>
        {/* Search Bar */}
        <div className='relative w-full max-w-sm'>
          <HiOutlineSearch className='size-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600' />
          <InputText
            type="text"
            placeholder="Search by name, email, or message"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full max-w-sm"
          />
        </div>
      </div>
      <ul className='grid grid-cols-3 gap-4 mt-6'>
        {filteredContacts.map((contact) => (
          <div key={contact._id} onClick={() => handleViewContact(contact)} className="group p-4 border border-neutral-200/70 rounded-2xl space-y-4 transition-all duration-300 ease-in-out hover:shadow-lg shadow-neutral-200/50 cursor-pointer">
            <div className='flex justify-between items-start'>
              <div>
                <span className='text-lg font-medium'>{contact.lastName}, {contact.firstName}</span>
                <p>{contact.email}</p>
              </div>
              <span className='text-sm text-neutral-500'>
                {new Date(contact.createdAt).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </span>
            </div>
            <p className='line-clamp-3'>Message: {contact.message}</p>
            <div className='flex justify-between items-end'>
              <p className='flex items-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
                Open
                <HiOutlineArrowRight className='-rotate-45 mt-[3px]' />
              </p>
              <Button
                variant='info'
                onClick={(e) => {
                  e.stopPropagation() // prevent card click
                  handleReply(contact)
                }}>
                <HiOutlineReply className='size-4.5 stroke-[1.5px]' />
                Reply
              </Button>
            </div>
          </div>
        ))}
      </ul>
    </motion.div>
  )
}

export default Contact