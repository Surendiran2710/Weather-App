import { useEffect, useState } from 'react';
import './App.css';
import propTypes from 'prop-types'


/*Images*/
import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import mistIcon from './assets/mist.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import snowIcon from './assets/snow.png'
import humidityIcon from './assets/humidity.png'
import scatteredIcon from './assets/scattered.png'
import brokenIcon from './assets/broken.png'
import showerRainIcon from './assets/showerrain.png'
import stormIcon from './assets/storm.png'
import PropTypes from 'prop-types';


const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="Icon" />
      </div>
      <div className='temp'>
        {temp}°C
      </div>
      <div className='location'>
        {city}
      </div>
      <div className='country'>
        {country}
      </div>
      <div className='cordinate'>
        <div>
          <span className='lat'>
            Latitude
          </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='long'>
            Longitude
          </span>
          <span>{lon}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt="" />
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>

        <div className='element'>
          <img src={windIcon} alt="wind" className='icon' />
          <div className='data'>
            <div className='wind'>{wind} km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>

    </>
  )
};

WeatherDetails.propTypes={
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
}
function App() {

  let api_key = "aee1195b7b1263575b224199d72713cf";

  const [text, setText] = useState("London")
  const [icon, setIcon] = useState(cloudIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": scatteredIcon,
    "03n": scatteredIcon,
    "04d": brokenIcon,
    "04n": brokenIcon,
    "09d": showerRainIcon,
    "09n": showerRainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": stormIcon,
    "11n": stormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon,
  };

  const search = async () => {
    setLoading(true);


    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${api_key}`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;

      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode]);
      setCityNotFound(false);
    } catch (error) {
      console.error('An error occurred:', error.message);
      setError('An error occurred whlie fetching weather data.')
    } finally {
      setLoading(false);

    }

  };



  const handleCity = (e) => {
    setText(e.target.value)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);




  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>

        </div>


        {loading && <div className='loading-message'>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='city-not-found'>City not found</div>}

        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity}
          wind={wind} />}
        <p className='copyrights'>
          Designed by <span>Surendiran</span>
        </p>
      </div>


    </>
  );
}

export default App;

