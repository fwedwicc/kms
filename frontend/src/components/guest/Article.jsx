import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const Article = () => {

  const [articles, setArticles] = useState([])
  const [lastFetchData, setLastFetchData] = useState([])

  useEffect(() => {
    // Function to fetch articles
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article')
        const newData = response.data.data

        // Check if new data is added
        if (lastFetchData.length > 0 && newData.length > lastFetchData.length) {
          Swal.fire({
            title: "New Article added!",
            text: "Check out the new Article added by the admin.",
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
        setArticles(newData)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [lastFetchData])


  return (
    <div className='border rounded-xl p-4'>
      <h1>GUEST: Articles</h1>
      <ul className='divide-y'>
        {articles.map((article) => (
          <li key={article._id}>
            <h2>Title: {article.title}</h2>
            <p>Body: {article.body}</p>
            <p>Tags: {article.tags}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Article
