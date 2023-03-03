import React from 'react'
import { createContext, useState, useEffect, useRef } from "react";
// Create and export your context

export const SessionContext = createContext();

function SessionContextProvider({ children }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ token, setToken ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ userImage, setUserImage ] = useState(null);
    const [ userId, setUserId ] = useState(null);
    const authenticated = useRef(isAuthenticated);

    const verifyToken = async (jwt) => { 
        try {
            const response = await fetch('http://localhost:5005/auth/verify', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const json = await response;
            setToken(jwt);
            if (json.success) {
                setIsAuthenticated(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('userImage');
        }
    }

    useEffect(() => {
        const jwtToken = window.localStorage.getItem('token');
        const username = JSON.parse(window.localStorage.getItem('user'))
        const image = window.localStorage.getItem('userImage')
        setUser(username)
        setUserImage(image)

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
        if (user) {
            window.localStorage.setItem('user', JSON.stringify(user));
            window.localStorage.setItem('userId', userId);
        }
    }, [user]);

    useEffect(() => {
        if (userId) {
            window.localStorage.setItem('userId', userId);
        }
    }, [userId]);

    useEffect(() => {
        if (userImage) {
            window.localStorage.setItem('userImage', userImage);
        }
    }, [userImage]);

    useEffect(() => {
        authenticated.current = isAuthenticated;
    }, [isAuthenticated])

  return (
    <SessionContext.Provider value={{ isLoading, isAuthenticated, setToken, setIsAuthenticated, setIsLoading, user, setUser, userImage, setUserImage, authenticated, userId, setUserId }}>
        { children }
    </SessionContext.Provider>
  )
}

export default SessionContextProvider;
