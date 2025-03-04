import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const create = newObject => {
    return axios.post(baseUrl, newObject).then(res => res.data);
}

export const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}
export const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)
}
