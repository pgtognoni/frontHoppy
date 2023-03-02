import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";

function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/posts`);
    console.log("Data", response.data);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  return (
    <div>      
      {!isLoading ? (
        <div>
          {posts.map((post) => {
            return (
                <div>
              <div className="postDiv">
                {post.type === "image" ? <img className="postContent" src={post.content} alt=""/> : <iframe  className="postContent" width="400px" height="230px" src={post.content}></iframe>}
                <h1 className="postTitle">{post.title}</h1>
                <p className="postDescription">{post.description}</p>
              </div>
                <h2>❤️{post.likes}</h2>
                </div>
            );
          })}
          {console.log("Div Posts", posts)}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default LandingPage;
