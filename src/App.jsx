import { useState } from 'react'
import './App.css'
import { Login } from './pages/login'
import { Signup } from './pages/signup/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
