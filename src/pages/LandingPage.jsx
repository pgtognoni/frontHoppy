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
                <div className="postContainer">
                  <div className="postContent">
                    {post.type === "image" ? (
                      <img className="postImage" src={post.content} alt="" />
                    ) : (
                      <iframe
                        className="postEmbed"
                        //   width="1200px"
                        //   height="220px"
                        src={post.content}
                      ></iframe>
                    )}
                  </div>
                  <div className="innerPost">
                    <div>
                      <h1 className="postTitle">{post.title}</h1>
                      <p className="postDescription">{post.description}</p>
                    </div>
                    <div className="postButtonsParent">
                      <button className="postInteractions">
                        ❤️{post.likes}
                      </button>
                      <button className="postInteractions">
                        😠{post.likes}
                      </button>
                      <button className="postInteractions">
                        👤{post.likes}
                      </button>
                    </div>
                  </div>
                </div>                
              </div>
            );
          })}              
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default LandingPage;
