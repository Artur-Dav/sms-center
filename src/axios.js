import axios from 'axios'
import store from './store/store.js'

const baseURL = 'http://88.198.219.62/api_smsc/v1/'
const token = localStorage.getItem("user-token")

function AuthToken(token) {
  return new Promise(resolve => {
    axios.defaults.headers.common["X-Auth-Token"] = token
    resolve()
  });
}
if (token) {
  AuthToken(token)
  .then(() => {
    store.dispatch("auth/VerifyToken")
  })
}

export default axios.create({
  baseURL
  // headers
})