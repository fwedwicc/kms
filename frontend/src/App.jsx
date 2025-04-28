import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Home, Admin, ArticlePage } from './pages'
import { Contact, ContentManagement, Article } from './components/admin'
import { Nav, Footer } from './components/ui'
import Auth from './routes/Auth'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Auth><Admin /></Auth>}>
          <Route path="content-management" element={<ContentManagement />} />
          <Route path="article" element={<Article />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      <Footer />
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
