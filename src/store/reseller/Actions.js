// Actions

import axios from '@/axios.js'

export default {
  GetList({commit}, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/reseller/list',
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
        url: '/reseller',
        data: payload,
        method: 'POST'
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  Edit({ commet }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/reseller/${payload.id}`,
        data: payload.data,
        method: 'PATCH'
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  },
  Delete ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/reseller/${payload}`,
        method: 'DELETE'
      })
      .then(res => {
        if (res.data.success) {
          resolve()
        }
      })
      .catch(err => reject(err))
    })
  }
}
