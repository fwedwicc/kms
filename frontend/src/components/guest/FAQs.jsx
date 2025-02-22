import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import Swal from 'sweetalert2'


const FAQs = () => {

  const [faqs, setFaqs] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])

  useEffect(() => {
    // Function to fetch FAQs
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs')
        const newData = response.data.data

        // Check if new data is added
        if (lastFetchData.length > 0 && newData.length > lastFetchData.length) {
          Swal.fire({
            title: "New FAQ added!",
            text: "Check out the new FAQ added by the admin.",
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
        setFaqs(newData)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
  }, [lastFetchData])

  return (
    <div className='border rounded-xl p-4'>
      <h1>GUEST: FAQs</h1>
      <ul className='divide-y'>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <h2>Question: {faq.question}</h2>
            <p>Answer: {faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FAQs
