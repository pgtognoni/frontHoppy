import React from 'react'
import { createContext, useState, useEffect } from "react";
// Create and export your context

export const SessionContext = createContext();

function SessionContextProvider({ children }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ token, setToken ] = useState(null);

    const verifyToken = async (jwt) => { 
        try {
            const response = await fetch('http://localhost:5005/auth/verify', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const json = await response;
            console.log('verification response: ', json, jwt);
            setToken(jwt);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            window.localStorage.removeItem('token');
        }
    }

    useEffect(() => {

        const jwtToken = window.localStorage.getItem('token');
        verifyToken(jwtToken);

    }, []);

    useEffect(() => {
        if (token) window.localStorage.setItem('token', token);
        if (!isAuthenticated) {
            setIsAuthenticated(true)
            setIsLoading(false);
        }
    }, [token]);

  return (
    <SessionContext.Provider value={{ isLoading, isAuthenticated, setToken, setIsAuthenticated, setIsLoading }}>
        { children }
    </SessionContext.Provider>
  )
}

export default SessionContextProvider;
// Create your provider component that will keep your state
