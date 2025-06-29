import React, { useContext } from 'react'
import { BlogContext } from '../../context/BlogContext'
import axios from '../../services/axiosInstance'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const BlogListPage = () => {
  const { blogs, user, fetchBlogs } = useContext(BlogContext)
  const userBlogs = blogs.filter(blog => blog.author === user.username)

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?")
    if (!confirm) return

    try {
      await axios.delete(`blogs/${id}/`)
      toast("Blog deleted")
      fetchBlogs() // refresh blog list
    } catch (err) {
      toast("Failed to delete")
      console.error(err)
    }
  }

  return (
    <motion.div
      className='author-blog-list'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2>Your Blogs</h2>

      {userBlogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          className="blog-list-item"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          whileHover={{ scale: 1.01 }}
        >
          <h3>{blog.title}</h3>
          <p>{blog.category.toUpperCase()} • <span>{new Date(blog.created_at).toLocaleDateString()}</span></p>
          <button onClick={() => handleDelete(blog.id)} className="delete-btn">Delete</button>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default BlogListPage
