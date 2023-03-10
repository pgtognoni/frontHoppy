import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/user/LoginForm'
import { SessionContext } from '../contexts/SessionContext'
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;


const LoginPage = () => {
  // Add some states to control your inputs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const { setToken, setUser, setUserImage, setUpdateUser,setUserCurrency, setUserId } = useContext(SessionContext)

  const handleSubmit = async event => {
    event.preventDefault()
    console.log("hello")
    // Send your login information to your backend
    const newUser = await fetch(`${VITE_BACK_URL}/auth/login`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const json = await newUser.json()
    if (newUser.status === 200) {
      setUser(json.user)
      setUserId(json.user._id)
      setUserImage(json.user.image)
      setToken(json.token)
      setUserCurrency(json.user.currency)
      navigate('/')
    }
  }

  return (
    <>
        <LoginForm handleSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword}/>
    </>
  )

}

export default LoginPage
