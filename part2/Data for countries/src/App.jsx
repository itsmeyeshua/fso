import { useEffect, useState } from 'react'
import { getAllCountries, getWeather } from './services/countries-weather';

const Weather = ({capital}) => {
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeather(capital).then(data => setTemp(data))
    .catch(err => setError(err));
  }, [capital])

  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {temp && 
      <div>
        <p>Temperature {temp.main.temp}</p>
        <img src={`https://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`} alt={temp.weather[0].description} />
        <p>Wind {temp.wind.speed}m/s</p>
      </div>
      }
    </div>
  )
}

function App() {
  const [country, setCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [info, setInfo] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllCountries()
    .then(data => {
      setAllCountries(data);
    })
    .catch(err => console.error(err));
  }, [])

  const handleChangeInput = (e) => {
    let search = e.target.value.toLowerCase();
    setCountry(search);
    if (search == "") {
      setMessage(null);
      setInfo(null);
      return ;
    }
    let found = allCountries.filter(country => country.name.official.toLowerCase().includes(search.toLowerCase()));
    if (found.length > 10) {
      setMessage("Too many matches, specify another filter");
      setInfo(null);
    }
    else {
      setInfo(found);
      setMessage(null);
    }
  }

  const handleShowOneCountry = (countryName) => {
    const country = allCountries.filter(country => country.name.official.toLowerCase().includes(countryName.toLowerCase()));
    setInfo(country);
  }



  return (
    <div>
      <span>find countries</span>
      <input type="text" value={country} onChange={handleChangeInput}/>
      {message && <p>{message}</p>}
      {info && info.length > 1 && info.map((curr) => (
        <div key={curr.name.official}>
          <span>{curr.name.official}</span>
          <button onClick={() => handleShowOneCountry(curr.name.official)}>show</button>
        </div>
      ))}
      {info && info.length == 1 &&
        <div>
          <h2>{info[0].name.official}</h2>
          <p>Capital {info[0].capital[0]}</p>
          <p>Area {info[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(info[0].languages).map((language, index) => {
              return <li key={index}>{language}</li>
            })}
          </ul>
          <img src={info[0].flags.png} alt="flag" />
          <Weather capital={info[0].capital[0]} />
        </div>}
    </div>
  )
}

export default App
