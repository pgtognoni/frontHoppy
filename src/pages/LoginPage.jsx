import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { SessionContext } from '../contexts/SessionContext'

const LoginPage = () => {
  // Add some states to control your inputs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const { setToken, setUser, setUserImage } = useContext(SessionContext)

  const handleSubmit = async event => {
    event.preventDefault()
    // Send your login information to your backend
    const newUser = await fetch('http://localhost:5005/auth/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const json = await newUser.json()
    console.log(newUser)
    if (newUser.status === 200) {
      const user = json.user[0].toUpperCase() + json.user.slice(1);
      setUser(user)
      {json.image 
        ? setUserImage(json.image)
        : setUserImage('../../public/image/godzila_default.png')}
      setToken(json.token)
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
