import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const ArticlePage = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/article/${id}`)
        setArticle(response.data.data)
      } catch (err) {
        setError('Failed to load article.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) return <p>Loading article...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!article) return <p>Article not found.</p>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border rounded-xl p-4">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <p>
          Created At: {new Date(article.createdAt).toLocaleDateString('en-PH', {
            month: 'short', day: '2-digit', year: 'numeric'
          })} - {new Date(article.createdAt).toLocaleTimeString('en-PH', {
            hour: '2-digit', minute: '2-digit', hour12: true
          }).replace(' AM', 'AM').replace(' PM', 'PM')}
        </p>
        <p>
          Last Update: {new Date(article.updatedAt).toLocaleDateString('en-PH', {
            month: 'short', day: '2-digit', year: 'numeric'
          })} - {new Date(article.updatedAt).toLocaleTimeString('en-PH', {
            hour: '2-digit', minute: '2-digit', hour12: true
          }).replace(' AM', 'AM').replace(' PM', 'PM')}
        </p>
        {article.image && (
          <img
            src={`${SERVER_URL}${article.image}`}
            alt={article.title}
            className="mt-2 max-w-lg rounded-lg"
          />
        )}
        <p className="mt-2">{article.body}</p>
        <p className="text-gray-600">Tags: {article.tags}</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 rounded-md">
          Back
        </Link>
      </div>
    </motion.div>
  )
}

export default ArticlePage
