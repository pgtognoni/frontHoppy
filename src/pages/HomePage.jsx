import React from "react";
import { useState  } from "react";
import "../App.css";


function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

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

export default HomePage;
