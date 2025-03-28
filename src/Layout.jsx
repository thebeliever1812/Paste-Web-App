import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast';

function Layout() {
    return (
        <>
            <Header />
            <Toaster position='top-right'/>
            <Outlet />
        </>
    )
}

export default Layout
