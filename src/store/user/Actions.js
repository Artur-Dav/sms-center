// Actions

import axios from '@/axios.js'

export default {
  GetList({commit}, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/user/list',
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
  GetById ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/user/${payload}`,
        method: 'GET'
      })
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(err => reject(res))
    })
  },
  Add ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/user',
        data: payload,
        method: 'POST'
      })
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(err => reject(err))
    })
  },
  Edit({ commet }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/user/${payload.id}`,
        data: payload.data,
        method: 'PATCH'
      })
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(err => reject(err))
    })
  },
  Delete ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/user/${payload}`,
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
