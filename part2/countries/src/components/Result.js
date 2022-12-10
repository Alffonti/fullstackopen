import Countries from './Countries'
import Country from './Country'

const Result = ({ filteredCountries, setFilteredCountries }) => {
	return (
		<>
			{filteredCountries.length > 10 && (
				<p>Too many matches, specify another filter</p>
			)}
			{filteredCountries.length <= 10 && filteredCountries.length > 1 && (
				<Countries
					countries={filteredCountries}
					setFilteredCountries={setFilteredCountries}
				/>
			)}
			{filteredCountries.length === 1 && (
				<Country country={filteredCountries[0]} />
			)}
		</>
	)
}

export default Result
