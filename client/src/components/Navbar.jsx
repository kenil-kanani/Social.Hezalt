import React, {useContext , useState , useRef } from 'react'
import './styles/navbar.style.css'
import { Link } from "react-router-dom"
import { AuthContext } from '../../src/context/AuthContext';

import { VscAccount } from "react-icons/vsc";
import { useClickAway } from 'react-use';



export const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const magicDivRef = useRef(null);

    // close dropdown when clicking outside
    useClickAway(magicDivRef, (e) => {
        setIsDropdownOpen(false);
    });



    const { isAuthenticated , logout } = useContext(AuthContext);

    return (
        !isAuthenticated

            ?

        <div className='root-nav w-screen h-[70px]'>
            <h1 className='text-2xl'>Social Hezalt</h1>
            <div className=''>
                <Link to='/' className='mx-4'>Home</Link>
                <Link to='/contact' className='mx-4'>Contact</Link>
                <Link to='/signin' className='mx-4'>Sign In</Link>
                <Link to='/signup' className='mx-4'>Sign Up</Link>
            </div>
        </div>

            :

            <div className='root-nav w-screen h-[70px]'>
                <h1 className='text-2xl'>Social Hezalt</h1>
                <div className='flex items-center'>
                    <Link to='/' className='mx-4'>Home</Link>
                    <Link to='/contact' className='mx-4'>Contact</Link>
                    <span className='cursor-pointer inline-block text-2xl text-blue-500 mx-4 mr-8' onClick={()=>{
                        toggleDropdown();
                    }}>
                            <VscAccount/>
                    </span>
                    <div ref={magicDivRef} className='magic-div'>
                            {isDropdownOpen && (
                                <div  className='dropdown text-red-500'>
                                    <Link to='/profile' className='dropdown-item' onClick={()=>toggleDropdown()}>My Profile</Link>
                                    <span className='dropdown-item' onClick={()=>{
                                        toggleDropdown();
                                        logout();
                                    }}>Logout</span>
                                </div>
                            )}
                    </div>
                </div>
            </div>
    )
}


