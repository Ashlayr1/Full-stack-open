import { useState, useEffect } from 'react'
import personService from './services/persons'

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

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const duplicatePerson = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (duplicatePerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the oldnumber with new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...duplicatePerson, number: newNumber }

        personService
          .update(duplicatePerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id === duplicatePerson.id ? response.data : person
            ))
          })
          .catch(error => {
            alert(`Failed to update ${newName}'s number.`, error)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
          })
          .catch(error => {
            alert(`Failed to add ${newName}.`, error)
          })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
          .destroy(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          })
        .catch(error => {
          alert(`Failed to delete ${person.name}`, error)
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
