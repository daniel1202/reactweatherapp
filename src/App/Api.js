import axios from 'axios';
const API_KEY = '26250b426b197b36ae1fbfc42f8f5e75';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getData = async (city)=>{
    if(!city)city='Białystok';
    try{
        const {data}= await axios.get(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`)
        return data;
    }catch(error){
        console.log(error)
        return Promise.reject(error);
    }
}
export const getGeoLocationData = async (latitude,longitude) =>{
    try{
        const {data}= await axios.get(`${BASE_URL}weather?lat=${Math.round(latitude,2)}&lon=${Math.round(longitude,2)}&units=metric&appid=${API_KEY}`)
        return data;
    }catch(error){
        console.log(error)
        return Promise.reject(error);
    }    
}