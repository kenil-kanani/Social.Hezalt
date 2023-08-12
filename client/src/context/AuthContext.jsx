import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInApi, signUpApi , me } from '../apis/index';
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState();

    const navigate = useNavigate();

    const login = async (email, password) => {
        // email = "kenilkanani16@gmail.com"
        // password = "1234567"

        try {
            const response = await signInApi(email, password);
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem('X-access-token', response.data)
                setIsAuthenticated(true);
                navigate('/');
            } else if (response.err.message === 'Not Verifyed Email') {
                toast.error(response.message);
                localStorage.setItem('X-access-token', response.err.explanation)
                navigate('/verify');
            }
            else {
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
                localStorage.setItem('X-access-token', response.data)
                navigate('/verify');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Catch", error)
        }
    };

    const isValid = async () => {
        try {
            const response = await me();
            console.log("Z - " , response)
            if(response != null){
                setIsAuthenticated(true);
                return true;
            }
            else{
                setIsAuthenticated(false);
                navigate('/signin');
                return false;
            }
        }
        catch (err){
            console.log("In auth context : " , err);
            isAuthenticated(false);
            return false;
        }
    }

    const logout = () => {
        try {
            toast.success("Logged Out Successfully");
            setIsAuthenticated(false);
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