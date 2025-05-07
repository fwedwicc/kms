import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { Button } from '../ui'
import Swal from 'sweetalert2'
import { HiOutlineArrowRight, HiOutlineUser, HiOutlineBookmarkAlt, HiOutlineCollection } from "react-icons/hi"

const Dashboard = () => {

  const [faqCount, setFaqCount] = useState(0)
  const [articleCount, setArticleCount] = useState(0)
  const [contacts, setContacts] = useState([])

  // FAQ Count
  useEffect(() => {
    const fetchFaqCount = async () => {
      try {
        const response = await api.get('/faqs')
        setFaqCount(response.data.data.length)
      } catch (error) {
        console.error('Error fetching FAQ count:', error)
      }
    }

    fetchFaqCount()
    const interval = setInterval(fetchFaqCount, 5000)
    return () => clearInterval(interval)
  }, [])

  // Article Count
  useEffect(() => {
    const fetchArticleCount = async () => {
      try {
        const response = await api.get('/article')
        setArticleCount(response.data.data.length)
      } catch (error) {
        console.error('Error fetching Article count:', error)
      }
    }

    fetchArticleCount()
    const interval = setInterval(fetchArticleCount, 5000)
    return () => clearInterval(interval)
  }, [])

  // Contact List
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contact')
        setContacts(response.data.data)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    }

    fetchContacts()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/*  */}
      <div className='grid grid-cols-3 gap-4'>
        <div className='border border-neutral-200/60 p-4 rounded-2xl flex flex-col justify-between'>
          <div>
            <div className='size-12 rounded-xl border border-neutral-200 flex items-center justify-center mb-3'>
              <HiOutlineUser className='size-8 stroke-1 text-neutral-600' />
            </div>
            <h3>Welcome, Admin!</h3>
            <p>
              Overview of dashboard today.
            </p>
          </div>
          <p className=''>
            As of {new Date().toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className='border border-neutral-200/60 p-4 rounded-2xl'>
          <HiOutlineCollection className='size-12 stroke-1 text-neutral-500 mb-2' />
          <h4>{faqCount} FAQs</h4>
          <p>{faqCount} available entries</p>
          <div className='flex justify-end'>
            <Link to='/admin/content-management'>
              <Button
                variant='secondary'>
                View FAQs
                <HiOutlineArrowRight className='size-4.5 stroke-[1.5px]' />
              </Button>
            </Link>
          </div>
        </div>
        <div className='border border-neutral-200/60 p-4 rounded-2xl'>
          <HiOutlineBookmarkAlt className='size-12 stroke-1 text-neutral-500 mb-2' />
          <h4>{articleCount} Articles</h4>
          <p>{articleCount} available entries</p>
          <div className='flex justify-end'>
            <Link to='/admin/article'>
              <Button
                variant='secondary'>
                View Articles
                <HiOutlineArrowRight className='size-4.5 stroke-[1.5px]' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
      <div className='mt-8 space-y-4'>
        <div className='flex items-end justify-between'>
          <div>
            <span className='text-neutral-900 font-medium text-xl'>Recent Messages</span>
            <p>{contacts.length} total message</p>
          </div>
          <Link to='/admin/contact'>
            <Button
              variant='secondary'>
              View all
              <HiOutlineArrowRight className='size-4.5 stroke-[1.5px]' />
            </Button>
          </Link>
        </div>
        <div className='overflow-auto rounded-xl border border-neutral-200/60'>
          <table className='min-w-full text-sm text-left'>
            <thead className='bg-neutral-50'>
              <tr>
                <th className='p-4'><p>Name</p></th>
                <th className='p-4'><p>Email</p></th>
                <th className='p-4'><p>Message</p></th>
                <th className='p-4'><p>Date</p></th>
              </tr>
            </thead>
            <tbody>
              {[...contacts]
                .slice(-7)
                .reverse()
                .map((contact) => (
                  <tr key={contact._id} className='border-t border-neutral-200/70 mx-12'>
                    <td className='p-4'>{contact.lastName}, {contact.firstName}</td>
                    <td className='p-4'>{contact.email}</td>
                    <td className='p-4'>
                      <span className='line-clamp-1 max-w-sm'>
                        {contact.message}
                      </span>
                    </td>
                    <td className='p-4'>
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  )
}

export default Dashboard
