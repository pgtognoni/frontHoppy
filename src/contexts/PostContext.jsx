import axios from 'axios';
import React from 'react'
import { createContext, useState, useEffect, useRef } from "react";

export const PostContext = createContext();

function PostContextProvider({children}) {
    const [ postsContext, setPostsContext ] = useState([]);
    const [ isLoadingPost, setIsLoadingPost ] = useState(true);

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:5005/posts`);
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
        }}>
        { children }
    </PostContext.Provider>
  )
}

export default PostContextProvider