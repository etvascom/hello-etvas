import axios from 'axios'
import storage from '@shared/storage'

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND || '/api/',
})

client.interceptors.request.use(config => {
  const token = storage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, Promise.reject)

export default client
