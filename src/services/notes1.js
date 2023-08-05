import axios from 'axios'
const baseUrl = '/api/notes'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data).catch('error GEt')
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch('error CREATE')   
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data).catch('error UPDATE')
}

const del = (id)=>{
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response=>response.data).catch('error DELETE')
}

export default { getAll, create, update, del }