import React from 'react'

function ImageStore(props) {

    const { setNewImage, setImageStore } = props;

    const cancelEdit = (e) => {
        e.preventDefault()
        setImageStore(false);
    }

  return (
    <div className='modal-container'>
    <div className='modal-box dark-form' >
        <button className="close-modal" onClick={(e) => cancelEdit(e)}>x</button>
        <div>
            <h1>Image Store</h1>
            <p> Show available Images </p>
            <div className='btn-container'>
                <button type='button' className='btn-form cancel' onClick={(e) => cancelEdit(e)}>Cancel</button>
                <button type='submit' className='btn-form save'>Update</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ImageStore