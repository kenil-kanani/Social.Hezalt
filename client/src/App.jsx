import './App.css'
import { Login, SignUp, Home, Contact, Verify } from './pages/index'
import { Route, Routes } from "react-router-dom"
import PrivateRoute from './routes/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import {  useEffect, useContext } from "react";
import { Navbar, AuthNavbar } from './components/index'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const { isValid, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("X-access-token");
    if (token && !isAuthenticated) {
      isValid(token);
    }
  }, []);

  // useEffect(() => {
  //   console.log("Updated isAuthenticated:", isAuthenticated);
  // }, [isAuthenticated]);

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
      {isAuthenticated ? <AuthNavbar /> : <Navbar />}
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
}

export default App
