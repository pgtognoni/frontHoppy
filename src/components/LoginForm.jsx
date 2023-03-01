import React from 'react'
import { useLocation } from 'react-router-dom'

function LoginForm({handleSubmit}) {

    const location = useLocation().pathname;
    console.log(location)

  return (
    <div class='login-container'>
      <h1>{location === '/login' ? 'Log In' : 'Register' }</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
            <p>Username</p>
            <input label='Username' variant='filled' withAsterisk onChange={e => setUsername(e.target.value)}/>
        </label>
        <label htmlFor='password'>
            <p>Password</p>
            <input label='Password' variant='filled' withAsterisk onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type='submit'>{location === '/login' ? 'Log In' : 'Register' }</button>
        </form>
    </div>
  )
}

export default LoginForm