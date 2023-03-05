import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";
import PostForm from "../components/PostForm";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LandingPage() {
  const [posts, setPosts] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [addNewPost, setAddNewPost] = useState(false);
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
        setAddNewPost(false);
      }
    };
    const modal = document.querySelector(".modal-container");
    ref.current = modal;
    document.addEventListener("click", checkClickedOutside);
    return () => {
      document.removeEventListener("click", checkClickedOutside);
    };
  }, [addNewPost]);

  const openModal = (e) => {
    e.stopPropagation();
    setAddNewPost(true);
  };

  return (
    <>
      {!isLoading ? (
        <div className="column-center">
          <button className="add-new-post" onClick={(e) => openModal(e)}>
            <p>Add New Post</p>
            <span className="btn-add">+</span>
          </button>
          {addNewPost && <PostForm setAddNewPost={setAddNewPost} />}
          {posts.map((post) => {
            return (
              <div>
                <div className="postContainer">
                  <div className="postContent">
                    {post.type === "image" ? (
                      <img className="postEmbed" src={post.content} alt="" />
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
                        <div className="postedBy">
                        {!!post.createdBy
                          ? <>
                            <img className="postedByImg" src={post.createdBy[0].image[0]} alt="profile" loading="lazy"/>
                            <h1 className="postedByName">{post.createdBy[0].username}</h1>
                            </>
                          : null
                        }
                        </div>
                    <div className="postTexts">
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
      <iframe
        className="background3d"
        src="https://my.spline.design/untitledcopy-858101b02d0e98d0da4179fadde8c638/"
      ></iframe>
    </>
  );
}

export default LandingPage;
