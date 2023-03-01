import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

function SignupPage() {
  // Add some states to control your inputs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
        event.preventDefault()
        // Send your signup information to your backend
        const newUser = await fetch('http://localhost:5005/auth/signup', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        const json = await newUser.json()
        if (newUser.status === 201) {
          console.log(json)
          navigate('/')
        }
    
    }
    
  return (
    <>
        <LoginForm handleSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword}/>
    </>
  )
}

export default SignupPage