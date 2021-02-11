import React from 'react'
import {NavLink} from 'react-router-dom'

const pages = [
    {name: 'Home', url: '/'}
];

const Navbar = () => {
    return (
        <nav className="Navbar">
            {pages.map(page => <NavLink to={page.url} key={page.name}>{page.name}</NavLink>)}
        </nav>
    )
}

export default Navbar