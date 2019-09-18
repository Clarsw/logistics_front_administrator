import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Vuex from 'vuex'
// import Layout from '../components/layout/Layout'
import Layout from '@/components/layout/Layout'
import Login from '@/page/login/Login'

/* 超级管理员模块 */
import Super from '@/page/home/Super'
import User from '@/page/user/User'
import HistoryUser from '@/page/user/HistoryUser'
import Customer from '@/page/customer/Customer'
import HistoryCustomer from '@/page/customer/HistoryCustomer'
import Warehouse from '@/page/warehouse/Warehouse'
import OrderMgt from '@/page/order/OrderMgt'

/* 仓库管理员模块 */
import CenterWarehouseKeeper from '@/page/home/CenterWarehouseKeeper'
import WarehouseKeeper from '@/page/home/WarehouseKeeper'
import Car from '@/page/car/Car'
import HistoryCar from '@/page/car/HistoryCar'
import CarAdjust from '@/page/car/CarAdjust'
import Order from '@/page/order/Order'
import NewOrder from '@/page/order/NewOrder'
import InboundOrder from '@/page/order/InboundOrder'
import OutboundOrder from '@/page/order/OutboundOrder'
import DeliverOrder from '@/page/deliver/DeliverOrder'

/* 司机模块 */
import Driver from '@/page/home/Driver'
import HandoverOrder from '@/page/handoverorder/HandoverOrder'
import HistoryHandoverOrder from '@/page/handoverorder/HistoryHandoverOrder'
import CarLine from '@/page/car/CarLine'

/* 配送员模块 */
import Deliver from '@/page/home/Deliver'
import Delivering from '@/page/deliver/Delivering'
import HistoryDeliver from '@/page/deliver/HistoryDeliver'

/* 公共模块 */
import Self from '@/page/self/Self'
import AuthError from '@/components/common/AuthError'

// import getData from '../api/getDate.js'

Vue.use(Router)
Vue.use(Vuex)
Vue.prototype.$axios = axios

// export default new Router({
//   routes: [
//     {
//       path: '/admin',
//       // redirect: '/admin/home',
//       name: 'Admin',
//       meta: {
//         requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
//       },
//       component: Container
//     },
//     {
//       path: '/login',
//       // redirect: '/admin/home',
//       name: 'Login',
//       component: Login
//     }
//   ]
//   // linkActiveClass: 'mui-active'
// })
const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/login',
      meta: {
        requireAuth: false // 进入这个路由是不需要登录的
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false // 进入这个不路由是需要登录的
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: {
        requireAuth: true // 进入这个路由是需要登录的
      },
      component: Layout,
      children: [
        {path: '/admin/super_home',
          name: 'Super',
          component: Super,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},
        {path: '/admin/self',
          name: 'Self',
          component: Self,
          meta: {
            requireAuth: true // 进入这个路由是需要登录的
          }},
        {path: '/admin/user_mgt',
          name: 'User',
          component: User,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},
        {path: '/admin/history_user',
          name: 'HistoryUser',
          component: HistoryUser,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},
        {path: '/admin/order_mgt/order',
          name: 'OrderMgt',
          component: OrderMgt,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},

        {path: '/admin/warehouse_mgt',
          name: 'Warehouse',
          component: Warehouse,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},
        {path: '/admin/customer_mgt/customer',
          name: 'Customer',
          component: Customer,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},
        {path: '/admin/customer_mgt/history_customer',
          name: 'HistoryCustomer',
          component: HistoryCustomer,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [1]
          }},
        {path: '/admin/center_warehouse_keeper_home',
          name: 'CenterWarehouseKeeper',
          component: CenterWarehouseKeeper,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2]
          }},
        {path: '/admin/warehouse_keeper_home',
          name: 'WarehouseKeeper',
          component: WarehouseKeeper,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [3]
          }},
        {path: '/admin/driver_home',
          name: 'Driver',
          component: Driver,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [4]
          }},
        {path: '/admin/deliver_home',
          name: 'Deliver',
          component: Deliver,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [5]
          }}, {
          path: '/admin/car_mgt',
          name: 'Car',
          component: Car,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2]
          }},
        {path: '/admin/history_car',
          name: 'HistoryCar',
          component: HistoryCar,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2]
          }},
        {path: '/admin/car_adjust',
          name: 'CarAdjust',
          component: CarAdjust,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2]
          }},
        {path: '/admin/order',
          name: 'Order',
          component: Order,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2, 3]
          }},
        {path: '/admin/new_order',
          name: 'NewOrder',
          component: NewOrder,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2, 3]
          }},
        {path: '/admin/inbound_order',
          name: 'InboundOrder',
          component: InboundOrder,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2, 3]
          }},
        {path: '/admin/outbound_order',
          name: 'OutboundOrder',
          component: OutboundOrder,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [2, 3]
          }},
        {path: '/admin/deliver_order',
          name: 'DeliverOrder',
          component: DeliverOrder,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [3]
          }},
        {path: '/admin/handover_order',
          name: 'HandoverOrder',
          component: HandoverOrder,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [4]
          }},
        {path: '/admin/history_handover_order',
          name: 'HistoryHandoverOrder',
          component: HistoryHandoverOrder,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [4]
          }},
        {path: '/admin/car_line',
          name: 'CarLine',
          component: CarLine,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [4]
          }},
        {path: '/admin/delivering',
          name: 'Delivering',
          component: Delivering,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [5]
          }},
        {path: '/admin/history_deliver',
          name: 'HistoryDeliver',
          component: HistoryDeliver,
          meta: {
            requireAuth: true, // 进入这个路由是需要登录的
            targetAuth: [5]
          }}
      ]
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/auth_error',
      name: 'AuthError',
      component: AuthError,
      meta: {
        requireAuth: false // 进入这个路由是不需要登录的
      }
    }
  ],
  linkActiveClass: 'is-active'
})

export default router
