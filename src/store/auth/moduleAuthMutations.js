export default {
  AuthSuccess(state, response) {
    state.token = response.token
    state.user_type = response.user_type
    state.expiration_time = response.expiration_time
  },
  AuthLogout(state) {
    state.user_type = ''
    state.user_info = ''
    state.token = ''
    state.expiration_time = ''
  }
}
