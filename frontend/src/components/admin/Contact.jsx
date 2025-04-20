import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui'
import { HiOutlineArrowRight } from "react-icons/hi"
import api from '../../utils/api'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {
  const [contact, setContact] = useState([])
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
            title: "New Contact added!",
            text: "Check out the new Inquiry submitted by a user.",
            icon: "info",
            iconColor: "#f97316",
            confirmButtonText: "Sige bhie",
            customClass: {
              title: "swal-title",
              text: "swal-text",
              popup: "swal-popup",
              confirmButton: "swal-confirm"
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

  const handleReply = (contactData) => {
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
        <input id="subject" class="swal-input w-full" placeholder="Enter subject">
      </div>
      <div class="mb-4">
        <label for="message" class="block mb-2 text-left">Message</label>
        <textarea id="message" class="swal-textarea w-full" placeholder="Type your reply here..."></textarea>
      </div>
      <div id="swal-validation-message" class="text-center text-red-500 text-base"></div>
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
      confirmButtonText: 'Send Reply',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const subject = document.getElementById('subject').value
        const message = document.getElementById('message').value
        const errorDiv = document.getElementById('swal-validation-message')

        if (!subject || !message) {
          errorDiv.innerHTML = `
            <div class="flex items-center gap-1 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <span>Please fill in all fields</span>
            </div>
          `;
          return false
        }
        errorDiv.textContent = ''
        return { subject, message }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        sendEmail(contactData.email, contactData.firstName, result.value.subject, result.value.message)
      }
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
        console.log('Email sent successfully!', response.status, response.text)
        Swal.fire({
          icon: 'success',
          title: 'Reply Sent!',
          text: `Your message has been sent to ${recipientName}`,
        })
      }, (error) => {
        console.error('Failed to send email:', error)
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send',
          text: 'There was an error sending your reply. Please try again later.',
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
      <h3>Inquiries</h3>
      <p>{contact.length} total inquiry</p>
      <ul className='grid grid-cols-3 gap-4 mt-6'>
        {contact.map((contact) => (
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
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation() // prevent card click
                  handleReply(contact)
                }}>
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