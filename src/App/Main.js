import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
const APIKey = '26250b426b197b36ae1fbfc42f8f5e75';

const Main = ({ background }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [sunTime, setSunTime] = useState([]);
  const [wind, setWind] = useState({});
  const [id, setId] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');
  const [citySearch, setCitySearch] = useState('');
  useEffect(() => {
    getGeoLocation();
  }, []);
  const getWeather = async (e) => {
    if (e !== undefined) e.preventDefault();
    clearError();
    if (currentLocation === '') {
      await axios({
        url: `http://api.openweathermap.org/data/2.5/weather?q=Białystok&units=metric&appid=${APIKey}`,
        method: 'GET',
      })
        .then((res) => {
          setCurrentWeather(res.data.main);
          setCurrentLocation(res.data.name);
          setWind(res.data.wind);
          setSunTime([
            new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(),
            new Date(res.data.sys.sunset * 1000).toLocaleTimeString(),
          ]);
          background(res.data.weather[0].id);
          setId(res.data.weather[0].id);
        })
        .catch(callbackError);
    } else {
      await axios({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${APIKey}`,
        method: 'GET',
      })
        .then((res) => {
          setCurrentWeather(res.data.main);
          setCurrentLocation(res.data.name);
          setWind(res.data.wind);
          setSunTime([
            new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(),
            new Date(res.data.sys.sunset * 1000).toLocaleTimeString(),
          ]);
          background(res.data.weather[0].id);
          setId(res.data.weather[0].id);
        })
        .catch(callbackError);
    }
  };
  const updateCurrentCity = (e) => {
    setCitySearch(e.target.value);
  };
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        clearError();
        setCurrentLocation('');
        axios({
          url: `http://api.openweathermap.org/data/2.5/weather?lat=${Math.round(
            position.coords.latitude,
            2
          )}&lon=${Math.round(
            position.coords.longitude,
            2
          )}&units=metric&appid=${APIKey}`,
          method: 'GET',
        })
          .then((res) => {
            setCurrentWeather(res.data.main);
            setCurrentLocation(res.data.name);
            setSunTime([
              new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(),
              new Date(res.data.sys.sunset * 1000).toLocaleTimeString(),
            ]);
            setWind(res.data.wind);
            background(res.data.weather[0].id);
            setId(res.data.weather[0].id);
          })
          .catch(callbackError);
      },
      function (error) {
        getWeather();
      }
    );
  };
  const clearError = () => {
    document.getElementById('error').innerText = '';
    document.querySelector('input').classList.remove('error');
  };
  const callbackError = (error) => {
    if (error.response.status / 100 >= 4) {
      document.getElementById('error').innerText =
        'Problem ze znalezieniem wybranej lokacji';
      document.querySelector('input').classList.add('error');
    }
  };
  return (
    <div className='mainDiv'>
      <form onSubmit={getWeather} className='searchForm'>
        <p id='error'></p>
        <label>
          Wyszukaj miasto{' '}
          <input
            value={citySearch}
            onChange={updateCurrentCity}
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
