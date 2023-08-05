import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Button = (props) => {

    const path = props.name === 'Sign In' ? '/signin' : '/signup'
    return (
        <button className="mx-3"><Link to={path} >{props.name}</Link></button>
    )
}

const Home = () => {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen'>
            Home
        </div>
    )
}

export default Home
