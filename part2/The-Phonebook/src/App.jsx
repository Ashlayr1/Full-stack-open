import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)}>Delete</button>
    </li>
  )
}

const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person
            key={person.id}
            person={person}
            removePerson={removePerson}
          />
        )}
      </ul>
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input
      value={filter}
      onChange={handleFilterChange}
    />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={props.addPerson}>
        <div>
          Name: <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
        </div>
        <div>
          Number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([ ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: 'success'
  })

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // function for showing notification
  const showNotification = (message, type = 'success', duration = 5000) => {
    setNotification({ message, type})

    if (duration > 0) {
      setTimeout(() => {
        setNotification({ message: null, type: 'success'})
      }, duration)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    // check for dublicate person
    const duplicatePerson = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    )

    // If duplicate person, ask confirmation for updating phone number
    if (duplicatePerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with new one ?`
      )

      // When confirmed, update new number
      if (confirmUpdate) {
        const updatedPerson = { ...duplicatePerson, number: newNumber }

        personService
          .update(duplicatePerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id === duplicatePerson.id ? response.data : person
            ))
            showNotification(
              `${newName}'s number has succesfully been updated`, 'success'
            )
          })
          // display error message when failed to update number
          .catch(() => {
            showNotification(
              `Failed to update ${newName}'s number`, 'error'
            )
          })
      }
      // If no duplicate person, create new person
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            // Display success message
            showNotification(
              `Added ${newName}`, 'success'
            )
          })
          // display error in case of failed action
          .catch(() => {
            showNotification(
              `Failed to add ${newName}.`, 'error'
            )
          })
    }
    // reset input field
    setNewName('')
    setNewNumber('')
  }

  // handle deletion of person
  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
          .destroy(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
            showNotification(
              `Deleted ${person.name}`, 'success'
            )
          })
        .catch(() => {
          showNotification(
            `${person.name} has already been removed from server`, 'error'
          )
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPerson = filter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message}
        type={notification.type}
      />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons
        persons={filteredPerson}
        removePerson={removePerson} />
    </div>
  )
}

export default App
