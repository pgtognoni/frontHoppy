import React, { useContext } from 'react'
import { SessionContext } from "../contexts/SessionContext";


function HandleBackground() {

    const { setBackground, backgroundImages, setBackgroundImages, backgroundImagesApply, setBackgroundImagesApply } =
    useContext(SessionContext);


    const backgroundImagesShow1 = [
        "./image/Untitled-Copy@1-1904x993.png",
        "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
        "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
      ];
    
      const handleBackground = (image) => {
        if (image === "./image/Untitled-Copy@1-1904x993.png") {
          setBackgroundImages([
            "imageBackgrounChange1",
            "imageBackgrounChange2",
            "imageBackgrounChange3",
          ]);
          setBackgroundImagesApply([
            "./image/Untitled-Copy@1-1904x993.png",
            "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
            "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
          ]);
          setBackground(backgroundImagesShow1[0]);
        }
        if (
          image ===
          "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg"
        ) {
          setBackgroundImages([
            "imageBackgrounChange2",
            "imageBackgrounChange3",
            "imageBackgrounChange1",
          ]);
          setBackgroundImagesApply([        
            "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",
            "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
            "./image/Untitled-Copy@1-1904x993.png",
          ]);
          setBackground(backgroundImagesShow1[1]);
        }
        if (
          image === "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg"
        ) {
          setBackgroundImages([
            "imageBackgrounChange3",
            "imageBackgrounChange1",
            "imageBackgrounChange2",
          ]);
          setBackgroundImagesApply([
            "./image/164775-water-liquid-fluid-painting-art-1920x1080.jpg",
            "./image/Untitled-Copy@1-1904x993.png",
            "./image/desktop-wallpaper-sky-blue-clouds-digital-art-chromebook-pixel-background-and-cloud-pixel-art.jpg",        
          ]);
          setBackground(backgroundImagesShow1[2]);
        }
      };
    
  return (
    <div>
          <div className="backgroundsChoose">
            <button
              className={`image-bg-change ${backgroundImages[0]}`}
              onClick={(e) => handleBackground(backgroundImagesApply[0])}
            >
              B
            </button>

            <button
              className={`image-bg-change ${backgroundImages[1]}`}
              onClick={(e) => handleBackground(backgroundImagesApply[1])}
            >
              B
            </button>

            <button
              className={`image-bg-change ${backgroundImages[2]}`}
              onClick={(e) => handleBackground(backgroundImagesApply[2])}
            >
              B
            </button>
          </div>
    </div>
  )
}

export default HandleBackground