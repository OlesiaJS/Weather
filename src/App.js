import { useState } from "react";
import './index.css';
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";
// import GetPhoto from "./components/GetPhoto";
import axios from "axios";

function App() {
  const [humidity, setHumidity] = useState('');
  const [tepmerature, setTepmerature] = useState('');
  const [condition, setCondition] = useState('');
  const [country, setCountry] = useState('');
  const [inputLocationName, setInputLocationName] = useState('Dnepropetrovsk');
  const [error, setError] = useState(false);
  let imageUrl = '';

  const updateWeather = () => {
    fetch('https:api.weatherapi.com/v1/current.json?key=237b94cd56344d69b80133558221510&q=' + inputLocationName + '+"&aqi=no')
      .then(el => el.json())
      .then(data => {
        setInputLocationName(data.location.name);
        setHumidity(data.current.humidity);
        setTepmerature(data.current.temp_c);
        setCondition(data.current.condition.text);
        setCountry(data.location.country);
        setError(false);
        GetPhoto();
      })
      .catch(error => setError(true));
  };

  async function GetPhoto() {

    const city_state = inputLocationName;
    const ApiKey = 'AIzaSyBIhFd5eMzeNnx1ziS1KQJ7qqPtEaty53g';
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const placesRequestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city_state}&key=${ApiKey}&inputtype=textquery&fields=name,photos`;
    console.log('ehfff');
    const initialPlacesRequest = await axios
      .get(placesRequestUrl)
      .catch(console.error);
    const photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
    console.log(photoRef);
    if (photoRef) {
      const imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${ApiKey}&maxwidth=700&maxheight=700`;
      const imageURLQuery = await fetch(proxyUrl + imageLookupURL)
        .then(r => r.blob())
        .catch(console.error);
      imageUrl = URL.createObjectURL(imageURLQuery); //declared earlier
    }

    return (
      <div className="comparison-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <img src={imageUrl} alt="" />
      </div>
    );

  }



  return (
    <div className="wrapper">
      {(error)
        ? <div>'Oops, no data for this place'</div>
        : <><header className="App-header">
          {inputLocationName} <br /> {country}
        </header>
          <div className="comparison-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
            <img src={imageUrl} alt="" />
          </div>
          {/* <GetPhoto
            city={'inputLocationName'}
            imgUrl={'0'}
            cityChange={(imgUrl) => {
              console.log(imgUrl);
              console.log(i);
            }}
          /> */}
          {(tepmerature && condition) &&

            <div className="wrapper-all-condition">
              <div className="condition-item">{condition}</div>
              <div className="condition-item">< FaTemperatureLow /> {tepmerature}</div>
              <div className="condition-item">< WiHumidity /> {humidity}</div>
            </div>
          }</>
      }
      <div>
        <input type='text' value={inputLocationName} onChange={(event) => {
          setInputLocationName(event.target.value);
        }} />
        <button className="button-city" type='button' onClick={updateWeather}>Choose a city</button>
      </div>
    </div>
  );
}

export default App;
