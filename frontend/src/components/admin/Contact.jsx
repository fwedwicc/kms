import React, { useEffect, useState } from 'react'
import { Button } from '../ui'
import api from '../../utils/api'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {
  const [contact, setContact] = useState([])

  // Fetch all Contacts
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await api.get('/contact')
        setContact(response.data.data)
      } catch (error) {
        console.log('Error fetching users:', error)
      }
    }

    getContacts()
    const interval = setInterval(getContacts, 5000)
    return () => clearInterval(interval)
  }, [])

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
    <section className='p-12'>
      <h1>ADMIN: Contact</h1>
      <ul className='divide-y'>
        {contact.map((contact) => (
          <li key={contact._id} className="py-4">
            <h2>Firstname: {contact.firstName}</h2>
            <p>Lastname: {contact.lastName}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>
            <p>Sent At: {new Date(contact.createdAt).toLocaleString()}</p>
            <button onClick={() => handleReply(contact)} className="text-blue-500">
              Reply
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contact