import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

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
    <div className='border rounded-xl lg:px-36 md:px-12 gap-4 px-4 p-4 md:p-14'>
      <h1>Articles rem issum</h1>
      <p className='w-full max-w-xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis omnis molestiae, fugiat dolore totam repudiandae culpa at veniam dol.</p>
      <div className='mt-8 grid md:grid-cols-3 grid-cols-1 gap-4'>
        {articles.map((article) => (
          <Link to={`/article/${article._id}`} className='px-5 py-4 border rounded-2xl inline-block' key={article._id}>
            <h4 className='break-all line-clamp-2 text-2xl font-medium'>{article.title}</h4>
            {article.image ? (
              <div className='mt-2 border relative h-56'>
                <img
                  src={`${SERVER_URL}${article.image}`}
                  alt={article.title}
                  className="rounded-lg absolute w-full h-full object-cover"
                />
              </div>
            ) : <div className='mt-2 border w-full h-56 rounded-lg'>
              no imeyds to
            </div>}
            <p className=''>{article.body}</p>
            <p>Tags: {article.tags}</p>
            Read More
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Article
