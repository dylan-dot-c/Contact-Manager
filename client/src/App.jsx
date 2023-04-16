import { useState } from 'react'
import './App.css'

import Navbar from './Navbar'

import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Contact from './pages/Contact'
import ContactForm from './pages/ContactForm'
import Register from './pages/Register'
import AuthContext from '../src/AuthContext.js';

function App() {

  const [user, setUser] = useState({});

  return (
    <>
    <Navbar />


    <AuthContext.Provider value = {{user,setUser}}>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/contact-form' element={<ContactForm />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/contacts' element={<Contact/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </AuthContext.Provider>
    
    </>
  )
}

export default App
