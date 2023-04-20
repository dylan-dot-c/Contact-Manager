import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Contact from './pages/Contact'
import ContactForm from './pages/ContactForm'
import Register from './pages/Register'
import AuthContext from '../src/AuthContext.js';
import DefaultHome from './pages/DefaultHome'
import axios from 'axios'

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.post('http://localhost:3000/user/data', { token });
          setUser(response.data);
        }

        setIsLoading(false);

      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);


  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes >
          <Route path='/' exact element={Object.keys(user).length !== 0 ? <Home /> : <DefaultHome />} />
          <Route path='/contact-form' element={
            Object.keys(user).length !== 0
              ? <ContactForm />
              : <Navigate to={"/login"} />
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/contacts' element={
            Object.keys(user).length !== 0
              ? <Contact />
              : <Navigate to={"/login"} />
          } />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to={"/"} />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
