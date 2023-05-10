import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginForm from '../components/user/LoginForm'
import { SessionContext } from '../contexts/SessionContext'
import { setName, setImage, setCurrency, setBio, setGroups, setRole, setId, setPublished, setLiked, setDisliked, setCommented, reset } from '../reducer/user.reducer'
import store from '../store/store'

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;


const LoginPage = () => {
  // Add some states to control your inputs
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();
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

      dispatch(setId(json.user._id))
      dispatch(setRole(json.user.role))
      dispatch(setName(json.user.username))
      dispatch(setImage(json.user.image))
      dispatch(setBio(json.user.bio))
      dispatch(setGroups(json.user.groups))
      dispatch(setPublished(json.user.published))
      dispatch(setLiked(json.user.liked))
      dispatch(setDisliked(json.user.disliked))
      dispatch(setCommented(json.user.commented))
      dispatch(setCurrency(json.user.currency))

      navigate('/')
    }
    console.log(store.getState())

  }

  return (
    <>
        <LoginForm handleSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword}/>
        <img className="background3d" src="./image/Untitled-Copy@1-1904x993.png" />
    </>
  )

}

export default LoginPage
