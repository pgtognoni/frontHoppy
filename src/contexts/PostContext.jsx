import axios from 'axios';
import React from 'react'
import { createContext, useState, useEffect, useRef } from "react";
const BACK_URL = import.meta.env.VITE_BACK_URL;

export const PostContext = createContext();

function PostContextProvider({children}) {
    const [ postsContext, setPostsContext ] = useState([]);
    const [ isLoadingPost, setIsLoadingPost ] = useState(true);
    const [ groupPostsCtx, setGroupPostsCtx ] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(`${BACK_URL}/posts`);
        setPostsContext(response.data);
      };

    useEffect(() => {        
        setIsLoadingPost(false)
    }, [postsContext])

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <PostContext.Provider value={{ 
        postsContext,
        setPostsContext,
        isLoadingPost,
        setIsLoadingPost,
        groupPostsCtx, 
        setGroupPostsCtx
        }}>
        { children }
    </PostContext.Provider>
  )
}

export default PostContextProvider