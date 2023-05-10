import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/user/LoginForm'
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

function SignupPage() {
  // Add some states to control your inputs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
        event.preventDefault()
        // Send your signup information to your backend
        const newUser = await fetch(`${VITE_BACK_URL}/auth/signup`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        const json = await newUser.json()
        if (newUser.status === 201) {
          navigate('/login')
        }
    
    }
    
  return (
    <>
        <LoginForm handleSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword}/>
        <img className="background3d" src="./image/Untitled-Copy@1-1904x993.png" />
    </>
  )
}

export default SignupPage