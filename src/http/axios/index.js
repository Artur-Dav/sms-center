import axios from '../../axios.js'
import store from '../../store/store'

axios.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
    store.dispatch('auth/Logout')
  }
  // Promise.reject()
})

export default axios
