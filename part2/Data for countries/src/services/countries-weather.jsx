import axios from "axios"
const countriesURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'


export const getAllCountries = () => {
    return axios.get(countriesURL)
    .then(res => res.data)
    .catch(err => console.error('Error fetching countries:', err))
}
export const getWeather = (capital) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    return (
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`)
    .then(res => res.data)
    .catch(err => err)
    )
}
