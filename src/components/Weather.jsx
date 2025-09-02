// import React, { use, useEffect } from 'react'
// import './Weather.css'
// import search_icon from '../assets/search.png'
// import cloud from '../assets/cloud.png'
// import drizzle from '../assets/drizzle.png'
// import humidity from '../assets/humidity.png'
// import rain from '../assets/rain.png'
// import snow from '../assets/snow.png'
// import wind from '../assets/wind.png'
// import clear from '../assets/clear.png'

// const Weather = () => {
//     const search = async(city)=>{
//         const API_KEY = "8ad1cad2b73c131717c8c9dc1266b033";
//         try {
            
//             const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`;
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log(data);
        
//         } catch (error) {
            
//         }

//     }
//     useEffect(()=>{
//         search("London");
//     },[])


//   return (
//     <div className='weather'>
//         <div className='search-bar'>
//             <input type="text" placeholder='Enter city name'/>
//             <img src={search_icon} alt="" /> 
//         </div>

//         <img src={clear} alt="" className='weather-icon' />
//         <p className='temperature'>16°c</p>
//         <p className='location'>london</p>
//         <div className="weather-data">
//             <div className="col">
//                 <img src={humidity} alt="" />
//                 <div>
//                     <p>91%</p>
//                     <span>HUmidity</span>
//                 </div>
//             </div>
//             <div className="col">
//                 <img src={wind} alt="" />
//                 <div>
//                     <p>3.6 km/h</p>
//                     <span>wind speed</span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }



// export default Weather

import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import clear from '../assets/clear.png'

const Weather = () => {
const inputRef = useRef();
const [weatherData, setWeatherData] = useState(false);
const allicons ={
  "01d": clear,
  "01n": clear,
  "02d": cloud,
  "02n": cloud,
  "03d": cloud,
  "03n": cloud,
  "04d": drizzle,
  "04n": drizzle,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "13d": snow,
  "13n": snow,

}

  const search = async (city) => {
    const API_KEY = "8ad1cad2b73c131717c8c9dc1266b033";
    if(city===""){
      alert("Please enter a city name");
      return;
    }
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=matric&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allicons[data.weather[0].icon] || clear; 
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef}type="text" placeholder='Enter city name'/>
        <img src={searchIcon} alt="search"  onClick={()=>search(inputRef.current.value)}/> 
      </div>
      {weatherData?<>
      <img src={weatherData.icon} alt="weather" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="humidity" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="wind" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}

      
    </div>
  )
}

export default Weather
