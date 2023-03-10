import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { SessionContext } from "../../contexts/SessionContext";
const BACK_URL = import.meta.env.VITE_BACK_URL;

function PostForm({
  heading,
  isUpdating = false,
  postId,
  setAddNewPost,
  setPosts,
  posts,
  setPostsCall,
  setGroupPosts,
  groupPosts,
  groupId,
  groupPostsCtx,
  setGroupPostsCtx
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [content, setContent] = useState();
  const [section, setSection] = useState();

  const { user } = useContext(SessionContext);
  const location = useLocation().pathname;
  //console.log( groupPosts, groupId)
  const { id } = useParams();


  const handleSubmit = async (e) => {

    
    //console.log(groupId, groupPosts, location)

    e.preventDefault()

    //const jwtToken = window.localStorage.getItem('token');
    const userId = user._id;
    
    let group = '' 
    
    if (location === `/groups/${id}`) {
      group = 'TRUE'
    } else {
      group = 'FALSE'
    }
    
    const response = await fetch(
      ` ${BACK_URL}/posts${isUpdating ? `/${postId}/update` : "/new"}`,
      {
        method: `${isUpdating ? "PUT" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          type,
          content,
          section,
          createdBy: userId,
          group: group,
          groupId: id
        }),
      }
    );
    if (response.status === 201) {
      const data = await response.json()
      if (location === '/') {
        navigate(`/`)
        // setAddNewPost(false);
        let newArr = [...posts];
        newArr = [data, ...posts]
        newArr.unshift(data);
        setPosts(newArr)
        setPostsCall(true)
      } else {
        navigate(`/groups/${id}`)              
        let newArr = [...groupPostsCtx];
        newArr = [data, ...newArr]
        console.log(newArr)
        setGroupPostsCtx(newArr)
      }
    }
  };

  const cancelEdit = (e) => {
    e.preventDefault()
    // setAddNewPost(false)
  }

  return (
    // <div className='modal-container'>
    //   <div className="modal-box dark-form new-post">
    //     <button className="close-modal" onClick={() => setAddNewPost(false)}>x</button>
    //     <h1>{heading}</h1>
    //     <form onSubmit={e => hundleSubmit(e)} className='modal-content column-center'>
    //       <label>
    //         <p>Title</p>
    //         <input
    //           type="text"
    //           value={title}
    //           onChange={(event) => setTitle(event.target.value)}
    //         />
    //       </label>
    //       <label>
    //       <p>Description</p>
    //           <textarea cols='35' maxLength="250" rows='3' type='text' name='description' onChange={(event) => setDescription(event.target.value)}></textarea>
    //       </label>
    //       <label className="select-form">
    //       <p>Choose a type:</p>
    //         <select value={type} onChange={(event) => setType(event.target.value)}>
    //           <option value="">Types</option>
    //           <option value="image">Image</option>
    //           <option value="video">Video</option>
    //         </select>
    //       </label>
    //       <label>
    //         <p>Content:</p>
    //         <input type="text" value={content}
    //           onChange={(event) => setContent(event.target.value)}/>
    //       </label>
    //       <label className="select-form"> 
    //       <p>Choose a section:</p>
    //         <select value={section} onChange={(event) => setSection(event.target.value)}>
    //           <option value="">Sections</option>
    //           <option value="meme">Meme</option>
    //           <option value="lifestyle">lifestyle</option>
    //           <option value="gaming">Gaming</option>
    //           <option value="educational">Education</option>
    //           <option value="food">Food</option>
    //           <option value="business">Business</option>
    //         </select>
    //       </label>
    //       <div className='btn-container'>
    //         <button type='button' className='btn-form cancel' onClick={(e) => cancelEdit(e)}>Cancel</button>
    //         <button className='btn-form save' type="submit">{isUpdating ?" Update" : "Create"}</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>


<div className="modal fade" id="createNewPost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">New Post</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="col-form-label">Title</label>
                <input maxLength="10" type="text" className="form-control" id="name" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="col-form-label">Description</label>
                <textarea maxLength="250" className="form-control" id="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <div className="mb-3">
                    <button className="logout btn-sidebar dropdown-toggle btn-form" type="button" data-bs-toggle="dropdown">
                        <p className=''>{section ? section : "section"}</p>
                    </button>
                    <ul className="dropdown-menu">
                        <li><p onClick={(event) => setSection("meme")} className="dropdown-item" value="meme">Memes</p></li>
                        <li><p onClick={(event) => setSection("lifestyle")} className="dropdown-item" value="lifestyle">Lifestyle</p></li>
                        <li><p onClick={(event) => setSection("educational")} className="dropdown-item" value="educational">Education</p></li>
                        <li><p onClick={(event) => setSection("gaming")} className="dropdown-item" value="gaming">Gaming</p></li>
                        <li><p onClick={(event) => setSection("food")} className="dropdown-item" value="food">Food</p></li>
                        <li><p onClick={(event) => setSection("business")} className="dropdown-item" value="business">Business</p></li>
                    </ul>
            </div>
            <div className="mb-3">
                    <button className="logout btn-sidebar dropdown-toggle btn-form" type="button" data-bs-toggle="dropdown">
                        <p className=''>{type ? type : "type"}</p>
                    </button>
                    <ul className="dropdown-menu">
                        <li><p onClick={(event) => setType("image")} className="dropdown-item" value="image" >Image</p></li>
                        <li><p onClick={(event) => setType("video")} className="dropdown-item" value="video" >Video</p></li>
                    </ul>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="col-form-label" >Image</label>
                <input type="text" className="form-control" value= {content} id="image" onChange={(event) => setContent(event.target.value)}/>
            </div>            
        <div className="modal-footer btn-container">
            <button type="button" className='btn-form cancel' data-bs-dismiss="modal">CANCEL</button>
            <button type="submit" className='btn-form save' data-bs-dismiss="modal">CREATE</button>
        </div>
            </form>
        </div>
        </div>
    </div>
    </div>
  );
}

export default PostForm;
