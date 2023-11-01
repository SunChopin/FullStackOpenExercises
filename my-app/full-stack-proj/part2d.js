import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Person = ({person, handleDelete}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </li>

  )
}

const PersonList = ({persons, handleDelete}) => {
  return (
    <div>
      <ul>
      {persons.map(person => 
          <Person key={person.id} person={person} handleDelete={handleDelete}/>
        )}       
      </ul>      
    </div>
  )
}

const Filter = ({handleFilterNameChange, newFilter}) => {
  return (
    <div>
      <div>
        filter keywords: <input onChange={handleFilterNameChange} />
      </div>
      <div>
        result: <PersonList persons={newFilter} />
      </div>
    </div>
  )
}

const PersonForm = ({addName, handleNameChange, handleNumChange,newName,newNum}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new name...')
  const [newNum, setNewNum] = useState('a new num...')
  const [newFilter, SetNewFilter] = useState([])// [] used for define an array object
  const [notificationMessage, setNotificationMessage] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    const isExist = persons.some(person => person['name'] === newName)
    //console.log(persons)
    if (isExist) {  
      const person = persons.find(per => per['name'] === newName)
      const changedPerson = { ...person, number: newNum }
      const id = person.id
      window.confirm(`${person.name} is already added in the phonebook, replace number?`)
      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNum('')
          setNotificationMessage(
            `${returnedPerson.name}'s phone number updated`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
        })
    } else {
      const nameObject = {
        name: newName,
        number: newNum,
      }
      personService
        .create(nameObject)
        .then(returnedPerson  => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
          setNotificationMessage(
            `${returnedPerson.name}'s info added`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
    })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    const personToShow = persons.filter(person => person['name'].toLowerCase().includes(event.target.value.toLowerCase()))
    SetNewFilter(personToShow)
    //console.log('is array:', Array.isArray(personToShow))
    //console.log(personToShow)
  }

  const handleDeleteOf = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .deleteItem(person.id)
        .then(returnedPerson =>{
          setPersons(persons.filter(n => n.id !== person.id))
        })
    }
  }
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  return (
    <div>
      <h2>Person filter</h2>
      <Filter handleFilterNameChange={handleFilterNameChange} newFilter={newFilter} />
      <h2>Add a new person</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} newName={newName} newNum={newNum} />
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <PersonList persons={persons} handleDelete={handleDeleteOf} />
    </div>
  )
}

export default App