import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  const handlerFilter = (event) => {
    props.setFilter(event.target.value.toLowerCase()); 
  };

  return (
    <>
      filter shown with <input value={props.filter} onChange={handlerFilter} />
    </>
  )
}

const PersonForm = (props) => {
  const handlerNewName = (event) => {
    props.setNewName(event.target.value)
  }

  const handlerNewNumber = (event) => {
    props.setNewNumber(event.target.value)
  }

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.newName} onChange={handlerNewName}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={handlerNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const People = (props) => {
  if (props.persons.length) {
    const filteredPersons = props.persons.filter((person) =>
      person.name.toLowerCase().includes(props.filter)
    );
  
    return (
      <>
        {filteredPersons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
      </>
    )
  }

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/henriquemcmedeiros/FullStackOpenExercises/main/Part2/phonebook/db.json')
      .then(response => {
        setPersons(response.data.persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    let jaExiste = persons.some(person => JSON.stringify(person.name) === JSON.stringify(newPerson.name));

    if (!jaExiste)
      setPersons([...persons, ...[newPerson]])
    else
      alert(`${newName} is already added to phonebook`)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <People persons={persons} filter={filter} />
    </div>
  )
}

export default App