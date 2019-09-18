import BASE_URL from './base'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'

async function login (url, data) {
  console.log(data)
  axios.defaults.withCredentials = true
  axios({
    url: BASE_URL + url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }],
    data: data
  })
    .then(response => {
      let data = response.data
      if (data.username !== undefined) {
        store.setSession(data.username, data.auth)
        router.push('/admin')
      } else {
        alert('帐号或密码错误')
      }
    })
}
async function logout (url) {
  axios.defaults.withCredentials = true
  axios({
    url: BASE_URL + url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      let data = response.data
      if (data.result === true) {
        store.removeSession()
        router.push('/login')
      } else {
        alert('退出失败')
      }
    })
}
export default {login, logout}
