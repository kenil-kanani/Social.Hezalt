import React, { useState, useContext } from 'react'
import './styles/signup.style.css'
import { Link } from "react-router-dom"
import { AuthContext } from '../../src/context/AuthContext';
import { Loader } from '../../src/components/index';


const SignUpForm = () => {

    //* signup function from AuthContext
    const { signup } = useContext(AuthContext);

    //* state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    //* loader is visible or not
    const [isVisible, setIsVisible] = useState(false);

    //* email and password are empty or not
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    //* handle login function
    const handleLogin = async () => {
        try {
            if (email === "" || password === "" || name === "") {
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
                if (name === "") {
                    setIsNameEmpty(true);
                }
                else {
                    setIsNameEmpty(false);
                }
                return;
            }
            setIsVisible(true);
            await signup(name, email, password);
            setIsVisible(false);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form className="form">
            <h1 className='text-center text-3xl'>Sign Up</h1>
            <div className="flex-column">
                <label>Name </label></div>
            <div className="inputForm">
                <input placeholder="Enter your Name" className="input" type="text" onChange={(event) => {
                    setName(event.target.value);
                    setIsNameEmpty(false);
                }} />
            </div>
            {isNameEmpty && <span className='text-red-500 text-xs flex justify-end'>*name is required</span>}

            <div className="flex-column">
                <label>Email </label></div>
            <div className="inputForm">
                <input placeholder="Enter your Email" className="input" type="text" onChange={(event) => {
                    setEmail(event.target.value);
                    setIsEmailEmpty(false);
                }} />
            </div>
            {isEmailEmpty && <span className='text-red-500 text-xs flex justify-end'>*email is required</span>}

            <div className="flex-column">
                <label>Password</label></div>
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
                    <label className='ml-1'>Remember me</label>
                </div>
                <span className="span hidden">Forgot password?</span>
            </div>
            <button className="button-submit" onClick={(event) => {
                event.preventDefault();
                handleLogin();
            }}>Sign Up</button>
            <p className="p">Already have an account? <span className="span"><Link to='/signin' >Sign In</Link></span></p>
        </form>
    )
}

const SignUp = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <SignUpForm />
        </div>
    )
}

export default SignUp
