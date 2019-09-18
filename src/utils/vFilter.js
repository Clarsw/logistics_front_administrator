// 过滤
const vFilter = {
  myTime: function (date) {
    let arr = date.split('T')
    let d = arr[0]
    let darr = d.split('-')
    let t = arr[1]
    let tarr = t.split('.000')
    let marr = tarr[0].split(':')
    let dd = parseInt(darr[0]) + '/' + parseInt(darr[1]) + '/' + parseInt(darr[2]) + ' ' + parseInt(marr[0]) + ':' + parseInt(marr[1]) + ':' + parseInt(marr[2])
    return dd
  },
  addZero: function (num) {
    return num < 10 ? '0' + num : num
  },
  formatDateTime: function (date) {
    let time = new Date(Date.parse(date))
    time.setTime(time.setHours(time.getHours() + 8))
    let Y = time.getFullYear() + '-'
    let M = this.addZero(time.getMonth() + 1) + '-'
    let D = this.addZero(time.getDate()) + ' '
    let h = this.addZero(time.getHours()) + ':'
    let m = this.addZero(time.getMinutes()) + ':'
    let s = this.addZero(time.getSeconds())
    return Y + M + D + h + m + s
  },
  dateFormat: function (date) {
    let time1 = date
    let time2 = this.a.vFilter.myTime(time1)
    // function myTime (date) {
    //   let arr = date.split('T')
    //   let d = arr[0]
    //   let darr = d.split('-')
    //
    //   let t = arr[1]
    //   let tarr = t.split('.000')
    //   let marr = tarr[0].split(':')
    //
    //   let dd = parseInt(darr[0]) + '/' + parseInt(darr[1]) + '/' + parseInt(darr[2]) + ' ' + parseInt(marr[0]) + ':' + parseInt(marr[1]) + ':' + parseInt(marr[2])
    //   return dd
    // }

    // 数字补0操作
    // function addZero (num) {
    //   return num < 10 ? '0' + num : num
    // }

    // function formatDateTime (date) {
    //   let time = new Date(Date.parse(date))
    //   time.setTime(time.setHours(time.getHours() + 8))
    //   let Y = time.getFullYear() + '-'
    //   let M = addZero(time.getMonth() + 1) + '-'
    //   let D = addZero(time.getDate()) + ' '
    //   let h = addZero(time.getHours()) + ':'
    //   let m = addZero(time.getMinutes()) + ':'
    //   let s = addZero(time.getSeconds())
    //   return Y + M + D + h + m + s
    //   // }
    // }
    return this.a.vFilter.formatDateTime(time2)
  }.bind(this)
}

export default{vFilter}
