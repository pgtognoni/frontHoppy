import React, { useState, useContext, useRef, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const Store = () => {
const { setUser, user } = useContext(SessionContext)
console.log("USER", user)

let date = new Date().getDay();
console.log(date)
  return (
    <div className="storeBody">
    <h1 className='storeTitle'>Store</h1>
    <div className="dailyCollection">
    <div>
    <h1 style={{fontSize: "250px"}}>Daily</h1>
    <h1>Collection</h1>
    </div>
    {date === 0 ?
    <div className="dailyCollectionContainer">
    <div className="itemCard">
        <img className="dailyCollectionImg" src="https://i.seadn.io/gcs/files/c3c8704e98806a8ebb03acdd28e1c51d.png?auto=format&w=1000" alt="" />  
        <button className='itemButton'>🪙 10</button>
    </div>
    <div className="itemCard">
        <img className="dailyCollectionImg" src="https://i.seadn.io/gcs/files/4d451d19fc542046e44aa3bf95458491.png?auto=format&w=1000" alt="" />  
        <button className='itemButton'>🪙 10</button>
    </div>
    <div className="itemCard">
        <img className="dailyCollectionImg" src="https://i.seadn.io/gcs/files/e6fb8c6928bcd4afdffb9fa24e7e1cc9.png?auto=format&w=1000" alt="" />  
        <button className='itemButton'>🪙 10</button>
    </div>
    <div className="itemCard">
        <img className="dailyCollectionImg" src="https://i.seadn.io/gcs/files/114fbc898b9cb20e9ed0355900557778.png?auto=format&w=1000" alt="" />  
        <button className='itemButton'>🪙 10</button>
    </div> 
    </div>
    :
    null
    }
    </div>
        {/* <img src="https://i.seadn.io/gcs/files/f92adefa88e02bb6e98493417a5aed1c.png?auto=format&w=1000" alt="" /> */}
    </div>
  )
}

export default Store