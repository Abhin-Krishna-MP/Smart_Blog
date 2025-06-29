import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BlogView from './components/BlogView'
import AuthorDashboard from './pages/dashboard/AuthorDashboard'
import ProfilePage from './pages/dashboard/ProfilePage'
import BlogListPage from './pages/dashboard/BlogListPage'
import AddBlogPage from './pages/dashboard/AddBlogPage'
import AuthPage from './pages/AuthPage'
import PrivateRoute from './pages/PrivateRoute'

const App = () => {
  const [showAuth, setShowAuth] = useState(true)
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/auth" element={ <AuthPage />} />
        <Route path="/dashboard" element={<PrivateRoute><AuthorDashboard /></PrivateRoute> }>
          <Route index element={<ProfilePage />} />
          <Route path="list" element={<BlogListPage />} />
          <Route path="add" element={<AddBlogPage />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
