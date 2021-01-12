// Actions

import axios from '@/axios.js'

export default {
  Restart({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/gateway',
        data: { command: 'restart' },
        method: 'POST'
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
  }
}
