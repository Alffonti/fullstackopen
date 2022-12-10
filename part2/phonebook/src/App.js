import axios from 'axios'
import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [filteredPersons, setFilteredPersons] = useState(persons)

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then(response => {
			setPersons(response.data)
		})
	}, [])

	const addPerson = event => {
		event.preventDefault()
		const hasName = persons.find(p => p.name === newName)
		if (hasName) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			}
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleNameChange = event => {
		setNewName(event.target.value)
	}

	const handleNumberChange = event => {
		setNewNumber(event.target.value)
	}

	const handleSearchChange = event => {
		setNewSearch(event.target.value)
		setFilteredPersons(
			persons.filter(person =>
				person.name.toLowerCase().includes(event.target.value.toLowerCase())
			)
		)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newSearch} onChange={handleSearchChange} />
			<h2>add new</h2>
			<PersonForm
				onSubmit={addPerson}
				nameValue={newName}
				nameOnChange={handleNameChange}
				numberValue={newNumber}
				numberOnChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons
				newSearch={newSearch}
				persons={persons}
				filteredPersons={filteredPersons}
			/>
		</div>
	)
}

export default App
