// Actions

import axios from '@/axios.js'

export default {
  GetList({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/payment_term/list',
        params,
        method: 'GET'
      })
      .then(res => {
        resolve(res.data.payload)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
