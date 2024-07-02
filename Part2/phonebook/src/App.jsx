import { useState, useEffect } from 'react';
import { getPersons, addPerson } from './api';

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

  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
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
      addPerson(newPerson, persons)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm onSubmit={handleAddPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <People persons={persons} filter={filter} />
    </div>
  );
};

export default App;