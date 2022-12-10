const Persons = ({ newSearch, persons, filteredPersons }) => {
	const personsToShow = newSearch === '' ? persons : filteredPersons

	return (
		<div>
			{personsToShow.map(person => (
				<p key={person.name}>
					{person.name} {person.number}{' '}
				</p>
			))}
		</div>
	)
}

export default Persons
