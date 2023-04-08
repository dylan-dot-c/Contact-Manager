import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './Navbar'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Contact from './pages/Contact/index'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Routes >
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/contacts' element={<Contact />} />

    </Routes>
    </>
  )
}

export default App
