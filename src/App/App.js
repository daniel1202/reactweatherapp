import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
const images = [
  { id: 5, image: '/Images/rain.jpg' },
  { id: 6, image: '/Images/snow.jpg' },
  { id: 8, image: '/Images/sun.jpg' },
  { id: 9, image: '/Images/cloudy.jpg' },
  { id: 2, image: '/Images/thunderstorm.jpg' },
  { id: 3, image: '/Images/drizzle.jpg' },
  { id: 7, image: '/Images/mist.jpg' },
  { id: 10, image: '/Images/night.jpg' },
];
function App() {
  const toggleBackground = (condition) => {
    let mainDiv = document.getElementsByClassName('bg_Image');
    let foundImage = images.find((image, index) => {
      if (condition > 800) {
        if (image.id > 8) return true;
      } else {
        if (image.id == Math.round(condition / 100, 0)) return true;
      }
    });
    mainDiv[0].style.backgroundImage = `url(${foundImage.image})`;
  };
  return (
    <div className='App bg_Image'>
      <Main background={toggleBackground} />
      <h5 className='info'>*Czas podany według stefy GMT+2</h5>
    </div>
  );
}

export default App;
