import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AuthorDashboard = () => {
  return (
    <div className='dashboard'>
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
        <NavLink to="/dashboard/list" className={({ isActive }) => isActive ? 'active' : ''}>List</NavLink>
        <NavLink to="/dashboard/add" className={({ isActive }) => isActive ? 'active' : ''}>Add</NavLink>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>

  )
}

export default AuthorDashboard
