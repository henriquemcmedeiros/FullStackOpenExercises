import { useState, useEffect } from 'react';
import { getPersons, addPerson, deletePerson } from './api';

const Filter = (props) => {
  const handlerFilter = (event) => {
    props.setFilter(event.target.value.toLowerCase());
  };

  return (
    <>
      filter shown with <input value={props.filter} onChange={handlerFilter} />
    </>
  );
};

const PersonForm = (props) => {
  const handlerNewName = (event) => {
    props.setNewName(event.target.value);
  };

  const handlerNewNumber = (event) => {
    props.setNewNumber(event.target.value);
  };

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.newName} onChange={handlerNewName} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={handlerNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const People = (props) => {
  const filteredPersons = props.persons.filter((person) =>
    person.name.toLowerCase().includes(props.filter)
  );

  const handlerDelete = (person) => {
    props.onDelete(person);
  };

  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
            <button onClick={() => handlerDelete(person)}>delete</button>
          </p>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getPersons()
      .then(data => setPersons(data))
      .catch(error => console.error('Error setting persons:', error));
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
      name: newName,
      number: newNumber,
    };

    let alreadyExists = persons.some(person => person.name === newPerson.name);

    if (!alreadyExists) {
      addPerson(newPerson)
        .then(() => {
          setPersons([...persons, newPerson]);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => console.error('Error adding person:', error));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handlerDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(personToDelete)
        .then(() => {
          let filterPeople = persons.filter(person => person.id !== personToDelete.id)
          setPersons([...filterPeople])
        })
        .catch(error => console.error('Error deleting person:', error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm onSubmit={handleAddPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <People persons={persons} filter={filter} onDelete={handlerDelete}/>
    </div>
  );
};

export default App;