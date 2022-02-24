import React from 'react'
import {NavLink} from 'react-router-dom'
import './App.css';

export default function Navigation() {
  return (
    <div class="topnav">
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/employee">Employee</NavLink>
        <NavLink to="/department">Department</NavLink>
    </nav>
    </div>
  )
}
