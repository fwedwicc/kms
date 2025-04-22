import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../components/ui'
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

  if (loading) return <div className='flex items-center justify-center h-screen'><p>Loading article...</p></div>
  if (error) return <div className='flex items-center justify-center h-screen'><p className="text-red-500">{error}</p></div>
  if (!article) return <div className='flex items-center justify-center h-screen'><p>Article not found.</p></div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='lg:px-36 md:px-12 gap-4 px-4 p-4 md:pt-30 pt-24 space-y-6'
    >
      {/* Infos */}
      <div className='flex items-end justify-between'>
        {/* Title and Tags */}
        <div className='space-y-2'>
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <div className="flex flex-wrap gap-1.5">
            {article.tags?.split(',').map((tag, index) => (
              <Badge key={index} variant='default'>
                {tag.trim()}
              </Badge>
            ))}
          </div>
          {/* Author */}
          <p className="text-gray-600 mt-5">Author: <span className='font-bold'>StaySuite Admin</span></p>
        </div>
        {/* Created and Updated Date */}
        <div>
          <p>
            Created At: &nbsp;
            <span className='italic'>
              {new Date(article.createdAt).toLocaleDateString('en-PH', {
                month: 'short', day: '2-digit', year: 'numeric'
              })}
            </span>
          </p>
          <p>
            Last Update: &nbsp;
            <span className='italic'>
              {new Date(article.createdAt).toLocaleDateString('en-PH', {
                month: 'short', day: '2-digit', year: 'numeric'
              })}
            </span>
          </p>
        </div>
      </div>
      {/* Image */}
      {article.image && (
        <img
          src={`${SERVER_URL}${article.image}`}
          alt={article.title}
          className="mt-2 w-full h-auto rounded-2xl"
        />
      )}
      {/* Article Body/Content */}
      <div className='flex justify-center w-full my-12'>
        <span className="whitespace-pre-line max-w-5xl w-full md:text-lg text-md">{article.body}</span>
      </div>
    </motion.div>
  )
}

export default ArticlePage
