import axios from 'axios';

const apiUrl = 'http://localhost:3001/persons';

const headers = {
    'Content-Type': 'application/json',
};

const getPersons = async () => {
    return axios.get(apiUrl)
        .then(response => response.data || [])
        .catch(error => {
            console.error('Error fetching persons:', error);
            return [];
        });
};

const addPerson = async (newPerson) => {
    return axios.post(apiUrl, newPerson)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding person:', error);
            throw error;
        });
};

const deletePerson = async (person) => {
    return axios.delete(`${apiUrl}/${person.id}`)
        .then(response => response.code)
        .catch(error => {
            console.error('Error deleting person', error)
            throw error;
        })
}

export { getPersons, addPerson, deletePerson };