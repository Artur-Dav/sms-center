// Actions

import axios from '@/axios.js'

export default {
  GetList({commit}, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/bulk/list',
        params,
        method: 'GET'
      })
      .then(res => {
        resolve(res.data.payload)
      })
      .catch(err => reject(err))
    })
  },
  GetById ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/bulk/${payload}`,
        method: 'GET'
      })
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(err => reject(err))
    })
  },
  Add({ commet }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/bulk',
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
  Run ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/bulk/${payload}/run`,
        data: {},
        method: 'POST'
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  },
  Hold ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/bulk/${payload}/hold`,
        data: {},
        method: 'POST'
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  }
}
