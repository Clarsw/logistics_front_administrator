
import axios from 'axios'
import BASE_URL from '@/api/base'
import qs from 'qs'
const getData = {
  async get (url, params) {
    return new Promise((resolve, reject) => {
      axios.defaults.withCredentials = true
      axios({
        url: BASE_URL + url,
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: params
        // params: qs.stringify(params)
      })
        .then(res => {
          // 成功
          resolve(res.data)
        })
        .catch(res => {
          // 失败
          reject(res)
          alert('网络出错，请检查网络')
        })
    })
  },
  async post (url, data) {
    axios.defaults.withCredentials = true
    return new Promise((resolve, reject) => {
      axios({
        url: BASE_URL + url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data, {arrayFormat: 'repeat'})
      })
        .then(res => {
          // 成功
          resolve(res.data)
        })
        .catch(res => {
          // 失败
          reject(res)
          alert('网络出错，请检查网络')
        })
    })
  }
}
export default { getData }
