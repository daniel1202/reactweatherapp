import React, { useState, useEffect,useRef } from 'react';
import {getData,getGeoLocationData} from './Api';
import WeatherCard from './WeatherCard';

const Main = ({ background }) => {
  const errorText = useRef();
  const cityInput = useRef();
  const [currentWeather, setCurrentWeather] = useState({});
  const [sunTime, setSunTime] = useState([]);
  const [wind, setWind] = useState({});
  const [id, setId] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');
  useEffect(() => {
    getGeoLocation();
  }, []);
  const getWeather = async (e) => {
    if (e !== undefined) e.preventDefault();
    clearError();
    if (currentLocation === '') {
      await getData(null).then(callbackSuccess).catch(callbackError);
    } else {
      await getData(cityInput.current.value).then(callbackSuccess).catch(callbackError);
    }
  };
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        clearError();
        setCurrentLocation('');
        await getGeoLocationData(position.coords.latitude,position.coords.longitude)
          .then(callbackSuccess)
          .catch(callbackError);
      },
      function (error) {
        getWeather();
      }
    );
  };
  const clearError = () => {
    errorText.current.innerText = '';
    cityInput.current.classList.remove('error');
  };
  const callbackSuccess = (response)=>{
    setCurrentWeather(response.main);
    setCurrentLocation(response.name);
    setWind(response.wind);
    setSunTime([
      new Date(response.sys.sunrise * 1000).toLocaleTimeString(),
      new Date(response.sys.sunset * 1000).toLocaleTimeString(),
    ]);
    background(response.weather[0].id);
    setId(response.weather[0].id);
  }
  const callbackError = (error) => {
    console.error(error)
    if (error.response.status / 100 >= 4) {
      errorText.current.innerText =
        'Problem ze znalezieniem wybranej lokacji';
        cityInput.current.classList.add('error');
    }
  };
  return (
    <div className='mainDiv'>
      <form onSubmit={getWeather} className='searchForm'>
        <p id='error' ref={errorText}></p>
        <label>
          Wyszukaj miasto{' '}
          <input
            ref={cityInput}
            type='text'
            placeholder='wpisz miasto'
          />
        </label>

        <button type='submit'>Szukaj</button>
      </form>
      <WeatherCard
        location={currentLocation}
        temp={currentWeather.temp}
        humidity={currentWeather.humidity}
        pressure={currentWeather.pressure}
        speed={wind.speed}
        sunrise={sunTime[0]}
        sunset={sunTime[1]}
        weatherId={id}
      />
    </div>
  );
};
export default Main;
