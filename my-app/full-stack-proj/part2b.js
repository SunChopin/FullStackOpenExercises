import { useState } from 'react'

const Person = ({person}) => {
  return (
    <li>{person.name} {person.num}</li>
  )
}

const PersonList = ({persons}) => {
  return (
    <div>
      <ul>
      {persons.map(person => 
          <Person key={person.id} person={person} />
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
        <PersonList persons={newFilter} />
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456', id: 1 },
    { name: 'Ada Lovelace', num: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', num: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', num: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('a new name...')
  const [newNum, setNewNum] = useState('a new num...')
  const [newFilter, SetNewFilter] = useState([])// [] used for define an array object
  const addName = (event) => {
    event.preventDefault()
    const isExist = persons.some(person => person['name'] === newName)
    //console.log(persons)
    if (isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        num: newNum,
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNum('')
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
  

  return (
    <div>
      <h2>Person filter</h2>
      <Filter handleFilterNameChange={handleFilterNameChange} newFilter={newFilter}/>
      <h2>Add a new person</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} newName={newName} newNum={newNum}/>
      <h2>Phonebook</h2>
      <PersonList persons={persons}/>
    </div>
  )
}

export default App