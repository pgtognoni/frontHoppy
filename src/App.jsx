import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
