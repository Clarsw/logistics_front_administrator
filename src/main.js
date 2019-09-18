// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import vFilter from '@/utils/vFilter'
import md5 from 'js-md5'

Vue.use(ElementUI)

// for (let key in vFilter) {
//   console.log(key['dateFormat'])
//   console.log(key)
//   Vue.filter(key, vFilter[key])
// }
Vue.filter('dateFormat', vFilter.vFilter.dateFormat)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

router.beforeEach(async (to, from, next) => {
  let auth = sessionStorage.getItem('userauth')
  // let auth = md5('1')
  if (to.meta.requireAuth === true && auth) {
    if (to.path === '/admin') {
      if (auth === md5('1')) {
        next('/admin/super_home')
      } else if (auth === md5('2')) {
        next('/admin/center_warehouse_keeper_home')
      } else if (auth === md5('3')) {
        next('/admin/warehouse_keeper_home')
      } else if (auth === md5('4')) {
        next('/admin/driver_home')
      } else if (auth === md5('5')) {
        next('/admin/deliver_home')
      }
    } else if (to.meta.targetAuth !== undefined) {
      let flag = false
      for (let i = 0; i < to.meta.targetAuth.length; i++) {
        if (auth === md5(String(to.meta.targetAuth[i]))) {
          flag = true
          break
        }
      }
      if (!flag) {
        next('/auth_error')
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    if (to.path === '/login') { // 如果是登录页面，就直接next(),释放钩子
      if (sessionStorage.getItem('username') && sessionStorage.getItem('userauth')) {
        next('/admin')
      } else {
        next()
      }
    } else if (to.path === '/auth_error') { // 不然就跳转到登录页面
      next()
    } else {
      next('/login')
    }
  }
})
