import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <>
            <nav className='Navbar w-full bg-blue-950 p-4 text-white shadow-lg sticky top-0'>
                <ul className='flex justify-around items-center gap-10 max-w-5xl mx-auto'>
                    <li>
                        <NavLink to='/' className={({ isActive }) => `${isActive ? "text-orange-300 text-lg" : "text-white"}`}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/pastes'} className={({ isActive }) => `${isActive ? 'text-orange-300 text-lg' : "text-white"}`}>
                            Pastes
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header
