import React,{ useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from "../../contexts/SessionContext";

const BACK_URL = import.meta.env.VITE_BACK_URL;

function CreateNewGroup() {
    const [ section, setSection ] = useState()
    const [ name, setName ] = useState()
    const [ description, setDescription ] = useState()
    const [ image, setImage ] = useState()
    const [ tags, setTags ] = useState()

    const { user, fetchGroups, setFetchGroups } = useContext(SessionContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tagsTolower = tags.toLowerCase()
        const data = {
            name,
            description,
            image,
            section,
            tags: tagsTolower,
            createdBy: user._id
        }
        const token = window.localStorage.getItem("token");
        const res = await axios.post(`${BACK_URL}/groups/new`, data, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
        if (res.status === 201) {
              navigate(`/groups`)
              setFetchGroups(true)
          }
    }


  return (
    <div className="modal group-modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">New Group</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="col-form-label">Name:</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <div className="mb-3">
                    <button className="logout btn-sidebar dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <p className=''>Categories</p>
                    </button>
                    <ul className="dropdown-menu">
                        <li><p className="dropdown-item" onClick={(event) => setSection("meme")}>Memes</p></li>
                        <li><p className="dropdown-item" onClick={(event) => setSection("lifestyle")}>Lifestyle</p></li>
                        <li><p className="dropdown-item" onClick={(event) => setSection("gaming")}>Education</p></li>
                        <li><p className="dropdown-item" onClick={(event) => setSection("food")}>Gaming</p></li>
                        <li><p className="dropdown-item" onClick={(event) => setSection("educational")}>Food</p></li>
                        <li><p className="dropdown-item" onClick={(event) => setSection("business")}>Business</p></li>
                    </ul>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="col-form-label" >Description:</label>
                <textarea className="form-control" id="description" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="col-form-label" >Image:</label>
                <input type="text" className="form-control" value={image} id="image" onChange={(e) => {setImage(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="col-form-label"><p>Hashtags can make your group more popular, add some but <code>no more than 5</code> separeted by a <code>space</code></p></label>
                <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => {setTags(e.target.value)}} />
            </div>
            <div className="modal-footer btn-container">
                <button type="submit" className='btn-form save' data-bs-dismiss="modal">CREATE</button>
                <button type="button" className='btn-form cancel' data-bs-dismiss="modal">CANCEL</button>
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>
  )
}

export default CreateNewGroup