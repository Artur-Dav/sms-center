// Actions

import axios from '@/axios.js'

export default {
  GetList({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/invoice/list',
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
  },
  Add({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/invoice',
        data: payload,
        method: 'POST'
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  }
}
