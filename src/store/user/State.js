// State

const user_info = localStorage.getItem('user-info')
export default {
  user_info: user_info && JSON.parse(user_info) || null,
  user_type: localStorage.getItem('user-type') || null
}