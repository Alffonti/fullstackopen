import axios from 'axios'
import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import Result from './components/Result'

const App = () => {
	const [countries, setCountries] = useState([])
	const [newSearch, setNewSearch] = useState('')
	const [filteredCountries, setFilteredCountries] = useState(countries)

	useEffect(() => {
		axios.get('https://restcountries.com/v2/all').then(response => {
			setCountries(response.data)
		})
	}, [])

	const handleSearchChange = event => {
		setNewSearch(event.target.value)
		setFilteredCountries(
			countries.filter(country =>
				country.name.toLowerCase().includes(event.target.value.toLowerCase())
			)
		)
	}

	return (
		<div>
			<Filter value={newSearch} onChange={handleSearchChange} />
			<Result
				filteredCountries={filteredCountries}
				setFilteredCountries={setFilteredCountries}
			/>
		</div>
	)
}

export default App
