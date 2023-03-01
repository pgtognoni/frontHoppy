import Sidebar from './components/Sidebar'
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className='body'>
        <Sidebar />
        <div className='body-content'>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
              } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
