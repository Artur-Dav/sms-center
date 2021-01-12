// Getters

export default {
  GetUserInfo(state) {
    return state.user_info
  },
  GetFullName(state) {
    const { first_name, last_name } = state.user_info
    if (!first_name || !last_name) {
      return ''
    }

    return `${first_name} ${last_name}`
  },
  GetAvatar(state) {
    return state.user_info.logo_file_uuid || ''
  },
  GetUserType(state) {
    return state.user_type
  }
}
