import React from 'react'
import { useLocation } from 'react-router-dom'

function LoginForm(props) {

    const location = useLocation().pathname;
    const { handleSubmit, setPassword, setUsername } = props

  return (
    <div className='login-container column-center'>
      <h1>{location === '/login' ? 'Log In' : 'Register' }</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
            <p>Username</p>
            <input name='username' id='username' type='text' onChange={e => setUsername(e.target.value)}/>
        </label>
        <label htmlFor='password'>
            <p>Password</p>
            <input name='password' id='password' type='password' onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className='btn-container'>
            <button type='submit'>{location === '/login' ? 'Log In' : 'Register' }</button>
        </div>
        </form>
    </div>
  )
}

export default LoginForm