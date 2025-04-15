import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui'
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

  const handleReply = (contactData) => {
    Swal.fire({
      title: 'Reply to Contact',
      html:
        '<div class="mb-4">' +
        `<p class="mb-2 text-sm">Replying to: ${contactData.firstName} ${contactData.lastName} (${contactData.email})</p>` +
        '</div>' +
        '<div class="mb-4">' +
        '<label for="subject" class="block mb-2 text-sm font-medium">Subject</label>' +
        '<input id="subject" class="swal2-input w-full" placeholder="Enter subject">' +
        '</div>' +
        '<div class="mb-4">' +
        '<label for="message" class="block mb-2 text-sm font-medium">Message</label>' +
        '<textarea id="message" class="swal2-textarea w-full" placeholder="Type your reply here..."></textarea>' +
        '</div>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Send Reply',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const subject = document.getElementById('subject').value
        const message = document.getElementById('message').value

        if (!subject || !message) {
          Swal.showValidationMessage('Please fill in all fields')
          return false
        }

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
          <div key={contact._id} className="p-4 border border-neutral-200 rounded-2xl space-y-4 transition-all duration-300 ease-in-out hover:shadow-lg shadow-neutral-200/50 cursor-pointer">
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
            <p className='line-clamp-3'>Message: {contact.message} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum repellat nisi fugit sint nobis. Reiciendis iusto recusandae facilis, laboriosam voluptatem doloremque accusantium ea error id maiores dignissimos eaque odit eveniet.</p>
            <div className='flex justify-end'>
              <Button variant='secondary' onClick={() => handleReply(contact)}>
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