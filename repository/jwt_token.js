/* eslint-disable object-shorthand */
import axios from 'axios'

const instance = axios.create({
  headers: {
    Encryption_Enabled: false
  },
  withCredentials: true,
  baseURL: process.env.VUE_APP_Host
})

async function refreshToken (refresh) {
  return await instance.post('/sso/token', { token: refresh })
}

async function login (username, password, axios) {
  return await axios.post('/sso/token', {
    username: username,
    password: password
  })
}

export default {
  login,
  refreshToken
}
