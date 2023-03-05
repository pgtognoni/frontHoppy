import React from 'react'
import { createContext, useState, useEffect, useRef } from "react";
// Create and export your context

export const SessionContext = createContext();

function SessionContextProvider({ children }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ token, setToken ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ userName, setUserName ] = useState(null);
    const [ userImage, setUserImage ] = useState(null);
    const [ userId, setUserId ] = useState(null);
    const authenticated = useRef(isAuthenticated);

    const verifyToken = async (jwt) => { 
        try {
            const response = await fetch('http://localhost:5005/auth/verify', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const json = await response.json();
            setToken(jwt);
            if (json) {
                setIsAuthenticated(true);
                setIsLoading(false);
                setUser(json.user);
                setUserName(json.user.username)
                setUserId(json.user._id)
                setUserImage(json.user.image)
            }
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
        if (token) {
            window.localStorage.setItem('token', token);
        }
        if (!isAuthenticated && token) {
            setIsAuthenticated(true)
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        authenticated.current = isAuthenticated;
    }, [isAuthenticated])

  return (
    <SessionContext.Provider value={{ 
        isLoading, 
        isAuthenticated, 
        setToken, 
        setIsAuthenticated, 
        setIsLoading, 
        user, 
        setUser,
        userName,
        setUserName, 
        userImage, 
        setUserImage, 
        authenticated, 
        userId, 
        setUserId 
        }}>
        { children }
    </SessionContext.Provider>
  )
}

export default SessionContextProvider;
