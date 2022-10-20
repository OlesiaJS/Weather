import { useState } from "react";
import "../src/components/style.css";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";
import GetSvgCondition from "./components/Condition";
import axios from "axios";

function App() {
  const [humidity, setHumidity] = useState('');
  const [tepmerature, setTepmerature] = useState('');
  const [condition, setCondition] = useState('');
  const [country, setCountry] = useState('');
  const [inputLocationName, setInputLocationName] = useState('Oslo');
  const [LocationTime, setLocationTime] = useState('');
  const [WeatherIcon, setWeatherIcon] = useState('./imgSvg/imgage-1.png');
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState('./imgSvg/heroBg');

  const updateWeather = () => {
    fetch('https://api.weatherapi.com/v1/current.json?key=237b94cd56344d69b80133558221510&q=' + inputLocationName + '+"&aqi=no')
      .then(el => el.json())
      .then(data => {
        setInputLocationName(data.location.name);
        setHumidity(data.current.humidity);
        setTepmerature(data.current.temp_c);
        setCondition(data.current.condition.text);
        setCountry(data.location.country);
        setLocationTime(data.location.localtime);
        setWeatherIcon(data.current.condition.icon);
        setError(false);
        getPhoto();
      })
      .catch(error => setError(true));
  };

  async function getPhoto() {
    let imageURLQuery;
    const city_state = inputLocationName;
    debugger;
    console.log(city_state);
    const initialPlacesRequest = await axios
      .get(`/.netlify/functions/api?city=${city_state}`)
      .catch(console.error);
    const photoRef = initialPlacesRequest?.data?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
    if (photoRef) {
      console.log(photoRef);
      imageURLQuery = await axios
        .get(`/.netlify/functions/apiAxiosS?photo_reference=${photoRef}`)
        .catch(console.error);

      setImageUrl(URL.createObjectURL(imageURLQuery)); //declared earlier
    }
  }
  {/* <a href={'info'}>info</a> */ }
  return (
    <><><header className="header">You can find out the weather and information about the city, here
    </header>
      <div className="wrapper">
        <section className="weather-search"> {/*style={{ backgroundImage: `url(${imageUrl} */}
          <div className="search-field">
            <input className="search-field-input" name="search" type='text' value={inputLocationName} onChange={(event) => {
              setInputLocationName(event.target.value);
            }} />
            <button className="search-field-button" type='button' onClick={updateWeather}></button>
          </div>
          <div className="weather-info">
            <div className="weather-info-temp">
              {(error)
                ? <><p>'Oops, no data for this place'</p>
                  <ul>
                    <li className="weather-info-temp-current temp-style"><span className="temp-current-value"><FaTemperatureLow size="16px" /></span></li>
                    <li className="drizzle-type"><GetSvgCondition size="16px" myCondition={condition} /></li>
                    <li className="drizzle-type"><WiHumidity size="16px" /> {humidity}</li>
                  </ul></>
                : <><div className="weather-info-icon">
                  <img className="weather-icon-img" src={WeatherIcon} alt=''></img>
                </div>
                  <div className="weather-info-temp-current">
                    <p className="drizzle-type"><FaTemperatureLow size="16px" />{tepmerature}</p>
                    <p className="drizzle-type"><GetSvgCondition size="16px" myCondition={condition} /> {condition}</p>
                    <p className="drizzle-type"><WiHumidity size="20px" /> {humidity}</p>
                  </div> </>}
            </div>
            <div class="weather-info-location">
              <p class="drizzle-type">{inputLocationName},{country}</p>
              <p class="drizzle-type">{LocationTime}</p>
              <p><a class="drizzle-type" href={'info'}>info</a></p>
            </div>
          </div>
        </section>

        <section class="popular-cities-section">
          <h2 class="header">Check the weather in most popular cities in the world</h2>
          <div class="popular-cities-list">
            <div className="popular-cities NewYork">
              <button class="button-cities" >New York</button>
            </div>
            <div className="popular-cities Paris">
              <button class="button-cities" type='button' onClick={(event) => { setInputLocationName('Paris'); }}>Paris</button>
            </div>
            <div className="popular-cities London">
              <button class="button-cities">London</button>
            </div>
            <div className="popular-cities Dubai">
              <button class="button-cities">Dubai</button>
            </div>
          </div>
        </section>
      </div></>
      <footer class="footer">
        <p>Olesia 2022</p>
      </footer></>
  );
}

export default App;
