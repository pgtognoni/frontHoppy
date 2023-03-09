import React from "react";
import { createContext, useState, useEffect, useRef } from "react";
const BACK_URL = import.meta.env.VITE_BACK_URL;

// Create and export your context

export const SessionContext = createContext();

function SessionContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [background, setBackground] = useState(
    "../../public/image/Untitled - Copy@1-1904x993.png"
  );
  const [backgroundImages, setBackgroundImages] = useState([
    "imageBackgrounChange1",
    "imageBackgrounChange2",
    "imageBackgrounChange3",
  ]);
  const [backgroundImagesApply, setBackgroundImagesApply] = useState([
    "./image/Untitled - Copy@1-1904x993.png",
    "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
    "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
  ]);

  const authenticated = useRef(isAuthenticated);

  const verifyToken = async (jwt) => {
    try {
      const response = await fetch(`${BACK_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const json = await response.json();
      setToken(jwt);
      if (!json.message) {
        setIsAuthenticated(true);
        setIsLoading(false);
        setUser(json.user);
        setUserName(json.user.username);
        setUserId(json.user._id);
        setUserImage(json.user.image);
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
    verifyToken(jwtToken);
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    }
    if (!isAuthenticated && token) {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    authenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        setToken,
        setIsAuthenticated,
        setIsLoading,
        user,
        setUser,
        userName,
        setUserName,
        setUserCurrency,
        userCurrency,
        userImage,
        setUserImage,
        authenticated,
        userId,
        setUserId,
        background,
        setBackground,
        backgroundImages,
        setBackgroundImages,
        backgroundImagesApply,
        setBackgroundImagesApply
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContextProvider;
