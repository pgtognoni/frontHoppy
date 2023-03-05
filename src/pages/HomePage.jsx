import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";
import PostForm from "../components/PostForm";
import {  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [ addNewPost, setAddNewPost ] = useState(false);
  const ref = useRef();

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/posts`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  useEffect(() => {
    const checkClickedOutside = (event) => {
      if (addNewPost && ref.current && !ref.current.contains(event.target)) {
        setAddNewPost(false)
      }
    }
    const modal = document.querySelector('.modal-container');
    ref.current = modal;
    document.addEventListener('click', checkClickedOutside)
    return () => {
      document.removeEventListener('click', checkClickedOutside)
    }
  }, [ addNewPost ])

  const openModal = (e) => {
    e.stopPropagation();
    setAddNewPost(true);
  }


  return (
    <>
      {!isLoading ? (
        <div className='column-center text-white' style={{zIndex: 3}}>
            <div className='logo-container'>
                <img src='./image/hoppy_logo.png' className='nav-logo'/>
            </div>
            <h1>Welcome Hoppy</h1>
            <h2>Some Random...</h2>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <iframe className="background3d" src='https://my.spline.design/untitledcopy-858101b02d0e98d0da4179fadde8c638/'></iframe>
    </>
  );
}

export default LandingPage;
