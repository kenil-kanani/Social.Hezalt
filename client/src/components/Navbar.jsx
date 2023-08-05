import React, { useContext } from 'react'
import './styles/navbar.style.css'
import { Link } from "react-router-dom"
import { AuthContext } from '../../src/context/AuthContext';


export const Navbar = () => {


    return (
        <div className='root-nav w-screen h-[70px]'>
            <h1 className='text-2xl'>Social Hezalt</h1>
            <div className=''>
                <Link to='/' className='mx-4'>Home</Link>
                <Link to='/contact' className='mx-4'>Contact</Link>
                <Link to='/signin' className='mx-4'>Sign In</Link>
                <Link to='/signup' className='mx-4'>Sign Up</Link>
            </div>
        </div>
    )
}

export const AuthNavbar = () => {

    const { logout } = useContext(AuthContext);

    return (
        <div className='root-nav w-screen h-[70px]'>
            <h1 className='text-2xl'>Social Hezalt</h1>
            <div className=''>
                <Link to='/' className='mx-4'>Home</Link>
                <Link to='/contact' className='mx-4'>Contact</Link>
                <span className='cursor-pointer' onClick={() => {
                    logout();
                }}>LogOut</span>
            </div>
        </div>
    )
}


