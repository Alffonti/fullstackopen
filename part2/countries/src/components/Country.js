import axios from 'axios'
import { useEffect, useState } from 'react'

function Country({ country }) {
	const api_key = process.env.REACT_APP_API_KEY
	const [weather, setWeather] = useState('')

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
			)
			.then(response => {
				setWeather(response.data)
			})
	}, [country.capital])

	return (
		<>
			<h1>{country.name}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h2>languages:</h2>
			<ul>
				{country.languages.map(language => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img src={country.flag} alt="" style={{ width: '200px' }} />
			{weather && (
				<>
					<h2>Weather in {country.capital}</h2>
					<p>temperature {weather.main.temp} Celsius</p>
					<img
						src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt=""
					/>
					<p>wind {weather.wind.speed} m/s</p>
				</>
			)}
		</>
	)
}

export default Country
