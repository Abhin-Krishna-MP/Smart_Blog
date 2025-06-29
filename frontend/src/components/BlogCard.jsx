import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
  const imageUrl = blog.thumbnail.startsWith('http')
    ? blog.thumbnail
    : `http://localhost:8000${blog.thumbnail}`

  return (
    <div className='blog-card'>
      <img className="blog-thumbnail" src={imageUrl} alt="" />
      <h2>{blog.title}</h2>
      <p className="meta">{blog.category.toUpperCase()} |  {new Date(blog.created_at).toLocaleDateString()}</p>
      <p className="excerpt">{blog.content.slice(0, 50)}...</p>
      <p className="author">By {blog?.author|| 'Unknown'}</p>
      <Link to={`/blogs/${blog.id}`} className="read-more">Read More</Link>
    </div>
  )
}

export default BlogCard
