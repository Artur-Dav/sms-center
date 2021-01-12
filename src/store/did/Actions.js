// Actions

import axios from '@/axios.js'

export default {
  GetList({commit}, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/did/list',
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
  GetDid ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/did/${payload}`,
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
        url: '/did',
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
        url: `/did/${payload.id}`,
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
  Delete({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: `/did/${payload}`,
        method: 'DELETE'
      })
      .then(res => {
        if (res.data.success) {
          resolve()
        }
      })
      .catch(err => reject(err))
    })
  },
  MassDelete ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/did/mass_delete',
        data: payload,
        method: 'DELETE'
      })
      .then(res => {
        if (res.data.success) {
          resolve()
        }
      })
      .catch(err => reject(err))
    })
  },
  GetImportLogList({commit}, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/did/kannel/import/log',
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
  ImportDid ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const form_data = new FormData()
      
      for (let key in payload) {
        form_data.append(key, payload[key])
      }

      axios({
        url: '/did/kannel/import',
        data: form_data,
        method: 'POST'
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
