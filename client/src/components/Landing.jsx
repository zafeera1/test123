import React, { useState, useEffect } from 'react';
import image1 from '../assets/yellow.jpg';
import image2 from '../assets/green.jpg';
import image3 from '../assets/blue.jpg';


const Landing = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="landing-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      <div className="overlay">
        <h1 className="title"> </h1>
        <p className="description">
         
        </p>
        {/* <a
          href="/feed"
          className="btn-main"
        >
          Add Boldly To Your Menu
        </a> */}
      </div>
    </div>
  );
};

export default Landing;