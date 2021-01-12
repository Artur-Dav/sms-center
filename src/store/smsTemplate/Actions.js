// Actions

import axios from '@/axios.js'

export default {
  GetList ({commit}, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/sms_template/list',
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
  Approve ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/sms_template/${payload}/approve`,
        data: {},
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
  Reject ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/sms_template/${payload}/reject`,
        data: {},
        method: 'PATCH'
      })
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(err => reject(err))
    })
  }
}
