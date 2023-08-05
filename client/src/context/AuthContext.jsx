import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInApi, signUpApi } from '../apis/index';
import { toast } from "react-toastify";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("auth") || false);

    const navigate = useNavigate();

    const login = async (email, password) => {
        // email = "kenilkanani16@gmail.com"
        // password = "1234567"

        try {
            const response = await signInApi(email, password);

            if (response.success) {
                toast.success(response.message);
                localStorage.setItem('auth', true);
                localStorage.setItem('X-access-token', response.data)
                setIsAuthenticated(true);
                navigate('/');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Catch", error)
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await signUpApi(name, email, password);
            if (response.success) {
                toast.success(response.message);
                navigate('/verify');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Catch", error)
        }
    };

    const isValid = async (token) => {

        try {
            fetch("http://localhost:3030/api/v1/isAuthenticated", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-access-token": token
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.success === true) {
                        setIsAuthenticated(true)
                        localStorage.setItem('auth', true);
                        // navigate('/');
                    }
                    else {
                        setIsAuthenticated(false)
                        localStorage.setItem('auth', false);
                        navigate('/');
                    }
                }).catch(error => {
                    console.error("Error checking token validity:", error);
                    setIsAuthenticated(false);
                    localStorage.setItem('auth', false);
                });
        } catch (error) {
            console.log("In Valid Function", error)
        }
    }

    const logout = () => {
        try {
            toast.success("Logged Out Successfully");
            setIsAuthenticated(false);
            localStorage.removeItem('auth');
            localStorage.removeItem('X-access-token');
            navigate('/signin');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ setIsAuthenticated, isValid, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
