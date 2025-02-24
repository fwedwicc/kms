import React, { useEffect, useState } from 'react'
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
    <div className="border rounded-xl p-4">
      <h1 className="text-2xl font-bold">{article.title}</h1>
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
        Back to Articles
      </Link>
    </div>
  )
}

export default ArticlePage
