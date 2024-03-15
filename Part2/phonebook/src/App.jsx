import { useState } from 'react'

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

const App = (props) => {
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