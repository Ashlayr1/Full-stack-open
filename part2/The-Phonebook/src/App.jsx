import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.id} person={person} />
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const dublicatePerson = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (dublicatePerson) {
      alert(`${newName} is already added to phonebook.`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={filteredPerson} />
    </div>
  )
}

export default App
