import React from "react";
import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { setName, setImage, setCurrency, setBio, setGroups, setRole, setId, setLogged, setPublished, setLiked, setDisliked, setCommented, reset } from '../reducer/user.reducer'
import { useDispatch } from 'react-redux'
import store from "../store/store";

const BACK_URL = import.meta.env.VITE_BACK_URL;

// Create and export your context

export const SessionContext = createContext();

function SessionContextProvider({ children }) {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ updateUser, setUpdateUser ] = useState(false);
  const [ fetchGroups, setFetchGroups ] = useState(false);
  const [background, setBackground] = useState(
    "./image/Untitled-Copy@1-1904x993.png"
  );
  const [backgroundImages, setBackgroundImages] = useState([
    "imageBackgrounChange1",
    "imageBackgrounChange2",
    "imageBackgrounChange3",
  ]);
  const [backgroundImagesApply, setBackgroundImagesApply] = useState([
    "./image/Untitled-Copy@1-1904x993.png",
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
        setUpdateUser(false)

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
        console.log(store.getState())
  
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("token");
    }
  };



  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${BACK_URL}/auth/update/${user._id}/groups`)
      setUser(res.data) 
      setUpdateUser(false)
    }

    fetchUser();

  }, [updateUser]);

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
        setBackgroundImagesApply,
        fetchGroups, 
        setFetchGroups,
        setUpdateUser
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContextProvider;
