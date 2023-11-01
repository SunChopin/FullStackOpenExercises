import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleFilterNameChange, countryFilter, handleShow}) => {
  return (
    <div>
      <div>
        find countries: <input onChange={handleFilterNameChange} />
      </div>
      <div>
        result: <ShowList countryFilter={countryFilter} handleShow={handleShow}/>
      </div>
    </div>
  )
}

const ShowList = ({countryFilter, handleShow}) => {
  
if (countryFilter.length === 1) {
    return (
      <div>
        <DispInfo countryFilter={countryFilter[0]}/>
      </div>
    )

  } else if (countryFilter.length > 10) {
    return (
      <div>
        too many matches, specify another filter.
      </div>
    )

  } else {
    return (
      <div>
        {countryFilter.map(country => 
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>show</button>
          </li>
        )} 
      </div>
    )

  }
}

const DispInfo = ({countryFilter}) => {
  const languageList = Object.values(countryFilter.languages)
  return (
    <div>
      <h2>
        {countryFilter.name.common}
      </h2>
      <div>capital {countryFilter.capital}</div>
      <div>area {countryFilter.area}</div>
      <h3>languages:</h3>
      <ul>
      {languageList.map(language => 
          <li key={language}>{language}</li>
        )} 
      </ul>
      <img src={countryFilter.flags.png} alt={countryFilter.flags.alt}/>
      <DispWeather location={countryFilter.capital}/>
    </div>
  )
}

const ShowOfList = ({countryShow}) => {
  if (countryShow === null) {
    return (null)
  } else {
    return (
      <div> 
        <DispInfo countryFilter={countryShow} />
      </div>
    )
  }
}

const DispWeather = ({location}) => {
  const [weather, SetWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`)
      .then(response => {
        SetWeather(response.data)
      })
  }, [location])

  if (weather) {
    return (
      <div> 
        <h2> Weather in {location}</h2>
        <div>Temperature {weather.main.temp} Celcius</div>
        <img src={'https://openweathermap.org/img/wn/'+ weather.weather[0].icon + '@2x.png'}/>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

const App = () => {
  
  const [countryFilter, SetCountryFilter] = useState([])// [] used for define an array object
  const [countryList, SetCountryList] = useState([])
  const [countryShow, SetCountryShow] = useState(null)

  const handleFilterNameChange = (event) => {
    if (event.target.value === '') {
      SetCountryFilter([])
      SetCountryShow(null)
    } else {
      const countryToShow = countryList.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      //console.log(`countryToShow.length`, countryToShow.length)
      SetCountryFilter(countryToShow)
      SetCountryShow(null)
    }
  }

  const handleShow = (country) =>{
    SetCountryShow(country)
  }

  useEffect(() => {
    if (countryList) {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          SetCountryList(response.data)
        })
    }
  }, [])

  return (
    <div>
      <Filter handleFilterNameChange={handleFilterNameChange} countryFilter={countryFilter} handleShow={handleShow} />
      <ShowOfList countryShow={countryShow} />
    </div>
  )
}

export default App