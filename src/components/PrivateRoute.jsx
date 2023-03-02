import React from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
    const { isLoading, isAuthenticated, authenticated  } = useContext(SessionContext)

    if (isLoading ) {
      return <Navigate to="/login" />
    }

    if(authenticated.current) {
        return (
          <>
            {children}
          </>
        )
    }

}

export default PrivateRoute