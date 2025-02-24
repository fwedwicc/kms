import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Home, Admin, ArticlePage } from './pages'
import Auth from './routes/Auth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Auth><Admin /></Auth>} />
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
