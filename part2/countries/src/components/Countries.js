const CountryList = ({ countries, setFilteredCountries }) => {
	return (
		<div>
			{countries.map(country => {
				return (
					<p key={country.name}>
						{country.name}
						<button onClick={() => setFilteredCountries([country])}>
							show
						</button>
					</p>
				)
			})}
		</div>
	)
}

export default CountryList
