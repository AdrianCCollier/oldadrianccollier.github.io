// always needed, import component and link to make routes
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Navbar is a component so this is always how we start rendering
export default class Navbar extends Component {
  
  // must always render() and it will return the following JSX
  // the below JSX is bootstrap that has been modified to fit JSX syntax, className instead of class etc.
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          ExcerTracker
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Exercises
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Exercise Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
