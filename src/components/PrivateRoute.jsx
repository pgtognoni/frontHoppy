import React from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    const { isLoading, isAuthenticated  } = useContext(SessionContext)

    if (isLoading && !isAuthenticated) {
      return <Navigate to="/login" />
    }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute