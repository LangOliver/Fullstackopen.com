import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
let token = null

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("newObject:  ", newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
