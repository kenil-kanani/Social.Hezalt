import './App.css'
import { Login, SignUp, Home, Contact, Verify } from './pages/index'
import { Route, Routes } from "react-router-dom"
import PrivateRoute from './routes/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import React, {useEffect, useContext, useState} from "react";
import { Navbar } from './components/index'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const { isValid } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        isValid()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
        {!isLoading ?
            (
                <>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={
                            // <PrivateRoute>
                            <Home />
                            // </PrivateRoute>
                        } />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<Login />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/contact" element={
                            <PrivateRoute>
                                <Contact />
                            </PrivateRoute>
                        } />
                    </Routes>
                </>
            )
        :
            (
                <div className='w-screen h-screen flex justify-center items-center flex-col'>
                    loading...
                </div>
            )
        }
    </>
  )
}

export default App
