import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BlogContext } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'

const Home = () => {
  const { blogs, fetchBlogs } = useContext(BlogContext)
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const CATEGORY_OPTIONS = {
    all: 'All',
    tech: 'Technology',
    life: 'Lifestyle',
    edu: 'Education',
    biz: 'Business',
    art: 'Art',
  }

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true)
      await fetchBlogs()
      setLoading(false)
    }
    loadBlogs()
  }, [])

  const filteredBlogs =
    category === 'all'
      ? blogs
      : blogs.filter((blog) => blog.category === category)

  return (
    <div className="home-container">
      <section className="intro">
        <h1>Welcome to SmartBlog</h1>
        <p>Explore ideas, insights, and stories written by passionate authors.</p>
      </section>

      <div className="category-menu">
        {Object.entries(CATEGORY_OPTIONS).map(([key, label]) => (
          <button
            className={category === key ? 'active' : ''}
            key={key}
            onClick={() => setCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="blog-list">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{
                scale: 1.03,
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
