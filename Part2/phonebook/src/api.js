import axios from 'axios';

const apiUrl = 'https://api.jsonbin.io/v3/b/6683ec3fad19ca34f881c796';
const apiKey = '$2a$10$lQD0gmXoq8MwuoUvUc9REu1CVoFUxAJjTO0nn2X6YAnzunv9sOZgC'; // Replace with your API key

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': apiKey,
};

const getPersons = async () => {
  return axios.get(apiUrl)
    .then(response => response.data.record.persons || [])
    .catch(error => {
      console.error('Error fetching persons:', error);
      return [];
    });
};

const addPerson = async (newPerson, persons) => {
  const data = {
    persons: [...persons, newPerson],
  };

  return axios.put(apiUrl, data, { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding person:', error);
      throw error;
    });
};

export { getPersons, addPerson };
