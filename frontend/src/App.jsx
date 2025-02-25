import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Home, Admin, ArticlePage } from './pages'
import { Contact, FAQs, Article } from './components/admin'
import Auth from './routes/Auth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Auth><Admin /></Auth>}>
          <Route path="contact" element={<Contact />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="article" element={<Article />} />
        </Route>
      </Routes>
    </div>
  )
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper
