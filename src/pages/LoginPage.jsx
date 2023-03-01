import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../contexts/LoginForm'
import { SessionContext } from '../contexts/SessionContext'

const LoginPage = () => {
  // Add some states to control your inputs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  //const { setToken } = useContext(SessionContext)

  const handleSubmit = async event => {
    event.preventDefault()
    // Send your login information to your backend
    const newUser = await fetch('http://localhost:5005/auth/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const json = await newUser.json()
    if (newUser.status === 200) {
      //setToken(json.token)
      navigate('/profile')
    }
  }

  return (
    <>
        <LoginForm handleSubmit={handleSubmit}/>
    </>
  )

}

export default LoginPage
