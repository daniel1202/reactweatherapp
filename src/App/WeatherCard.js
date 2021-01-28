import React, { useEffect } from 'react';
const Skycons = require('skycons')(window);
const defaults = {
  icon: 'CLEAR_DAY',
  color: 'white',
  size: 128,
  animate: true,
};
const icons = [
  { id: 5, icon: 'rain' },
  { id: 6, icon: 'snow' },
  { id: 8, icon: 'clear-day' },
  { id: 9, icon: 'cloudy' },
  { id: 2, icon: 'sleet' },
  { id: 3, icon: 'rain' },
  { id: 7, icon: 'fog' },
  { id: 10, icon: 'clear-night' },
];
const WeatherCard = ({
  location,
  temp,
  humidity,
  pressure,
  speed,
  sunrise,
  sunset,
  weatherId,
}) => {
  useEffect(() => {
    toggleIcon();
  }, [weatherId]);
  const toggleIcon = () => {
    let skycons = new Skycons({ color: 'white' });
    let foundIcon = icons.find((icon, index) => {
      if (weatherId > 800) {
        if (icon.id > 8) return true;
      } else {
        if (icon.id == Math.round(weatherId / 100, 0)) return true;
      }
    });
    if (foundIcon != undefined) {
      skycons.add('icon1', foundIcon.icon);
      skycons.play();
    }
  };
  return (
    <div className='weatherCard'>
      <canvas id='icon1' width='128' height='128' />
      <h1>{location}</h1>
      <h3>Temperatura : <b>{temp} C</b></h3>
      <h3>Wilgotność: <b>{humidity} %</b></h3>
      <h3>Ciśnienie: <b>{pressure} hPa</b></h3>
      <h3>Wiatr: <b>{speed} m/s</b></h3>
      <h3>Wschód: <b>{sunrise}</b></h3>
      <h3>Zachód: <b>{sunset}</b></h3>
    </div>
  );
};
export default WeatherCard;
