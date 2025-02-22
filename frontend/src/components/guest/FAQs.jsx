import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

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
          alert('New data added')
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
