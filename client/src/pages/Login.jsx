import React, { useState, useContext } from 'react'
import './styles/login.style.css'
import { Link } from "react-router-dom"
import { AuthContext } from '../../src/context/AuthContext';
import { Loader } from '../../src/components/index';

const LoginForm = () => {

    //* login function from AuthContext
    const { login } = useContext(AuthContext);

    //* state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //* loader is visible or not
    const [isVisible, setIsVisible] = useState(false);

    //* email and password are empty or not
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    //* handle login function
    const handleLogin = async () => {
        try {
            if (email === "" || password === "") {
                if (email === "") {
                    setIsEmailEmpty(true);
                }
                else {
                    setIsEmailEmpty(false);
                }
                if (password === "") {
                    setIsPasswordEmpty(true);
                }
                else {
                    setIsPasswordEmpty(false);
                }
                return;
            }
            setIsVisible(true);
            await login(email, password);
            setIsVisible(false);
        } catch (error) {
            setIsVisible(false);
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            {isVisible && <div className='absolute'><Loader /></div>}
            <form className="form">
                <h1 className='text-center text-3xl'>Sign In</h1>
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <input placeholder="Enter your Email" className="input" type="text" onChange={(event) => {
                        setEmail(event.target.value);
                        setIsEmailEmpty(false);
                    }} />
                </div>
                {isEmailEmpty && <span className='text-red-500 text-xs flex justify-end'>*email is required</span>}


                <div className="flex-column">
                    <label>Password </label></div>
                <div className="inputForm">
                    <input placeholder="Enter your Password" className="input" type="password" onChange={(event) => {
                        setPassword(event.target.value);
                        setIsPasswordEmpty(false);
                    }} />
                </div>
                {isPasswordEmpty && <span className='text-red-500 text-xs flex justify-end'>*password is required</span>}

                <div className="flex-row">
                    <div>
                        <input type="checkbox" />
                        <label className='ml-1'>Remember me </label>
                    </div>
                    <span className="span">Forgot password?</span>
                </div>
                <button className="button-submit" onClick={(event) => {
                    event.preventDefault();
                    handleLogin();
                }}>Sign In</button>
                <p className="p">Don't have an account? <span className="span"><Link to='/signup' >Sign Up</Link></span></p>
            </form>
        </>
    )
}

const Login = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <LoginForm />
        </div>
    )
}

export default Login
