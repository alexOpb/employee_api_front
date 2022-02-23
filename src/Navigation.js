import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navigation() {
  return (
    <div>
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/employee">Employee</NavLink>
        <NavLink to="/department">Department</NavLink>
    </nav>
    </div>
  )
}
