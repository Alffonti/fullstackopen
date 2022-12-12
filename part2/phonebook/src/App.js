import { useEffect, useState } from 'react'
import personService from './services/person'

import Filter from './components/Filter'
import Notification from './components/Notification'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [filteredPersons, setFilteredPersons] = useState(persons)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationType, setNotificationType] = useState(null)

	useEffect(() => {
		personService.getAll().then(initialPersons => {
			setPersons(initialPersons)
		})
	}, [])

	const addPerson = event => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber,
		}
		const hasName = persons.find(p => p.name === newName)

		if (hasName) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const updatedPerson = { ...hasName, number: newNumber }
				personService
					.update(hasName.id, updatedPerson)
					.then(returnedPerson => {
						setPersons(
							persons.map(person =>
								person.id !== hasName.id ? person : returnedPerson
							)
						)
						setNewName('')
						setNewNumber('')
						setNotificationMessage(
							`Changed ${returnedPerson.name}'s phone number`
						)
						setNotificationType('success')
						setTimeout(() => {
							setNotificationMessage(null)
							setNotificationType(null)
						}, 5000)
					})
					.catch(error => {
						console.error(error.message)
						setNotificationMessage(
							`Information of ${updatedPerson.name} has already been deleted from our server`
						)
						setNotificationType('error')
						setTimeout(() => {
							setNotificationMessage(null)
							setNotificationType(null)
						}, 5000)
					})
			}
		} else {
			personService.create(personObject).then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
				setNotificationMessage(`Added ${returnedPerson.name}`)
				setNotificationType('success')
				setTimeout(() => {
					setNotificationMessage(null)
					setNotificationType(null)
				}, 5000)
			})
		}
	}

	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService.remove(id).then(() => {
				setPersons(persons.filter(p => p.id !== id))
			})
			setNotificationMessage(`Removed ${name}`)
			setNotificationType('success')
			setTimeout(() => {
				setNotificationMessage(null)
				setNotificationType(null)
			}, 5000)
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

	const personsToShow = newSearch === '' ? persons : filteredPersons

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notificationMessage} type={notificationType} />
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
			{personsToShow.map(person => (
				<Person
					key={person.id}
					person={person}
					deletePerson={() => deletePerson(person.id, person.name)}
				/>
			))}
		</div>
	)
}

export default App
