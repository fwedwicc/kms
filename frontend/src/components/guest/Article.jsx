import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge, Button } from '../ui'
import { HiOutlineLightBulb, HiOutlineArrowRight } from "react-icons/hi"
import api from '../../utils/api'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Article = () => {

  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isChangingPage, setIsChangingPage] = useState(false)
  const itemsPerPage = 3

  // Calculate pagination values
  const totalPages = Math.ceil(articles.length / itemsPerPage)
  const indexOfLastArticle = currentPage * itemsPerPage
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage
  const currentArticle = articles.slice(indexOfFirstArticle, indexOfLastArticle)

  // Navigation functions
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setIsChangingPage(true)
      setCurrentPage(prev => prev - 1)
      setTimeout(() => setIsChangingPage(false), 300)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setIsChangingPage(true)
      setCurrentPage(prev => prev + 1)
      setTimeout(() => setIsChangingPage(false), 300)
    }
  }

  useEffect(() => {
    // Function to fetch articles
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article')
        const reversedArticles = response.data.data.reverse()
        setArticles(reversedArticles)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }
    fetchArticles()
    const interval = setInterval(fetchArticles, 5000)
    return () => clearInterval(interval)
  }, [])


  return (
    <section id='article' className='lg:px-36 md:px-12 gap-4 px-4 p-4 md:pt-30 pt-20'>
      {/* Headings */}
      <Badge variant='default' styles='mb-2'>
        <HiOutlineLightBulb className='size-4' />
        Wow ganern
      </Badge>
      <h2>Articles</h2>
      <p className='w-full max-w-xl mt-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis omnis molestiae, fugiat dolore totam repudiandae culpa at veniam dol.</p>
      {/* Articles */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 grid md:grid-cols-3 grid-cols-1 gap-5"
        >
          {currentArticle.map((article) => (
            <Link to={`/article/${article._id}`} className='p-2.5 border border-neutral-200/70 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg shadow-neutral-200/50' key={article._id}>
              {/* Article Image */}
              {article.image ? (
                <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
                  <img
                    src={`${SERVER_URL}${article.image}`}
                    alt={article.title}
                    className="absolute w-full h-full object-cover"
                  />
                </div>
              ) : <div className='border border-neutral-300 relative h-56 rounded-lg overflow-hidden'>
                <img src="https://placehold.co/30x30" alt="Placeholder Image" className='absolute w-full h-full object-cover' />
              </div>}
              {/* Article Infos */}
              <div className='space-y-2.5 p-4'>
                <h4 className='break-all line-clamp-2 text-2xl font-medium'>{article.title}</h4>
                <p className='break-all line-clamp-4'>{article.body}</p>
                <div className='flex items-end justify-between gap-2 mt-6'>
                  {/* Date */}
                  <p>
                    {new Date(article.createdAt).toLocaleDateString('en-PH', {
                      month: 'short', day: '2-digit', year: 'numeric'
                    })}
                  </p>
                  <div className='flex items-center gap-[1px]'>
                    <p className='text-nowrap'>Read More</p>
                    <HiOutlineArrowRight className='size-4.5 -rotate-45 stroke-[1.5px] mt-1' />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Pagination - Back and Next buttons only */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mt-6 mb-4">
          <span className='text-sm'>Page {currentPage} of {totalPages}</span>
          <div className='flex gap-2'>
            <Button variant='secondary' onClick={goToPreviousPage} disabled={currentPage === 1 || isChangingPage}>
              Back
            </Button>
            <Button variant='secondary' onClick={goToNextPage} disabled={currentPage === totalPages || isChangingPage}>
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Article
