<template>
  <el-aside>
    <div class="container-nav">
      <div class="logo">
        <p class="shopName">Admin</p>
      </div>
      <template v-if="auth===allAuth.super">
        <el-row class="tac nav-menu">
          <el-col :span="12">
            <el-menu ref="navMenu"
                     :default-active="$route.path"
                     class="el-menu-vertical-demo"
                     text-color="#fff"
                     active-text-color="#ffffff">
              <el-menu-item index="1">
                <router-link to="/admin/super_home" slot="title" tag="span" name="menu"><i class="fa fa-home fa-2x awesome"></i>首页
                </router-link>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="fa fa-user-circle-o fa-2x awesome"></i>
                  <span name="drop-menu-title">用户管理</span>
                </template>
                <el-menu-item index="2-1">
                  <router-link to="/admin/user_mgt?page=1" tag="span" name="drop-menu" data-index="2">当前用户</router-link>
                </el-menu-item>
                <el-menu-item index="2-2"><router-link to="/admin/history_user?page=1" tag="span" name="drop-menu" data-index="2">历史用户</router-link></el-menu-item>
              </el-submenu>
              <el-menu-item index="3">
                <router-link to="/admin/warehouse_mgt?page=1" slot="title" tag="span" name="menu"><i class="fa fa-building fa-2x awesome"></i>仓库管理
                </router-link>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">
                  <i class="fa fa-address-card-o fa-2x awesome"></i>
                  <span name="drop-menu-title">客户管理</span>
                </template>
                <el-menu-item index="4-1">
                  <router-link to="/admin/customer_mgt/customer?page=1" tag="span" name="drop-menu" data-index="4">当前客户</router-link>
                </el-menu-item>
                <el-menu-item index="4-2">
                  <router-link to="/admin/customer_mgt/history_customer?page=1" tag="span" name="drop-menu" data-index="4">历史客户
                  </router-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="5">
                <router-link to="/admin/order_mgt/order?page=1" slot="title" tag="span" name="menu"><i class="fa fa-linode fa-2x awesome"></i>订单管理
                </router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </template>
      <template v-if="auth===allAuth.centerWarehouseKeeper">
        <el-row class="tac nav-menu">
          <el-col :span="12">
            <el-menu ref="navMenu"
                     :default-active="$route.path"
                     class="el-menu-vertical-demo"
                     text-color="#fff"
                     active-text-color="#ffffff">
              <el-menu-item index="1">
                <router-link to="/admin/center_warehouse_keeper_home" slot="title" tag="span" name="menu"><i class="fa fa-home fa-2x awesome"></i>首页
                </router-link>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="fa fa-car fa-2x awesome"></i>
                  <span name="drop-menu-title">车辆管理</span>
                </template>
                <el-menu-item index="2-1">
                  <router-link to="/admin/car_mgt?page=1" tag="span" name="drop-menu" data-index="2">仓库车辆</router-link>
                </el-menu-item>
                <el-menu-item index="2-2"><router-link to="/admin/history_car?page=1" tag="span" name="drop-menu" data-index="2">废弃车辆</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="fa fa-book fa-2x awesome"></i>
                  <span name="drop-menu-title">订单管理</span>
                </template>
                <el-menu-item index="3-1">
                  <router-link to="/admin/order?page=1" tag="span" name="drop-menu" data-index="3">全部订单</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <router-link to="/admin/new_order" tag="span" name="drop-menu" data-index="3">新的订单</router-link>
                </el-menu-item>
                <el-menu-item index="3-3">
                  <router-link to="/admin/inbound_order?page=1" tag="span" name="drop-menu" data-index="3">查看入库单</router-link>
                </el-menu-item>
                <el-menu-item index="3-4">
                  <router-link to="/admin/outbound_order?page=1" tag="span" name="drop-menu" data-index="3">查看出库单</router-link>
                </el-menu-item>
                <!--<el-menu-item index="3-5">-->
                  <!--<router-link to="/admin/customer_mgt/history_customer?page=1" tag="span" name="drop-menu" data-index="3">订单交接</router-link>-->
                <!--</el-menu-item>-->
              </el-submenu>
              <el-menu-item index="4">
                <router-link to="/admin/car_adjust?page=1" slot="title" tag="span" name="menu"><i class="fa fa-truck fa-2x awesome"></i>车辆调度</router-link>
              </el-menu-item>
              <!--<el-menu-item index="4">-->
                <!--<router-link to="/admin/warehouse_mgt?page=1" slot="title" tag="span" name="menu"><i class="fa fa-motorcycle fa-2x awesome"></i>配送调度</router-link>-->
              <!--</el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
      </template>
      <template v-if="auth===allAuth.warehouseKeeper">
        <el-row class="tac nav-menu">
          <el-col :span="12">
            <el-menu ref="navMenu"
                     :default-active="$route.path"
                     class="el-menu-vertical-demo"
                     text-color="#fff"
                     active-text-color="#ffffff">
              <el-menu-item index="1">
                <router-link to="/admin/warehouse_keeper_home" slot="title" tag="span" name="menu"><i class="fa fa-home fa-2x awesome"></i>首页
                </router-link>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="fa fa-book fa-2x awesome"></i>
                  <span name="drop-menu-title">订单管理</span>
                </template>
                <el-menu-item index="3-1">
                  <router-link to="/admin/order?page=1" tag="span" name="drop-menu" data-index="3">全部订单</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <router-link to="/admin/new_order" tag="span" name="drop-menu" data-index="3">新的订单</router-link>
                </el-menu-item>
                <el-menu-item index="3-3">
                  <router-link to="/admin/inbound_order?page=1" tag="span" name="drop-menu" data-index="3">查看入库单</router-link>
                </el-menu-item>
                <el-menu-item index="3-4">
                  <router-link to="/admin/outbound_order?page=1" tag="span" name="drop-menu" data-index="3">查看出库单</router-link>
                </el-menu-item>
                <!--<el-menu-item index="3-5">-->
                <!--<router-link to="/admin/customer_mgt/history_customer?page=1" tag="span" name="drop-menu" data-index="3">订单交接</router-link>-->
                <!--</el-menu-item>-->
              </el-submenu>
              <!--<el-menu-item index="4">-->
                <!--<router-link to="/admin/car_adjust?page=1" slot="title" tag="span" name="menu"><i class="fa fa-truck fa-2x awesome"></i>车辆调度</router-link>-->
              <!--</el-menu-item>-->
              <el-menu-item index="4">
              <router-link to="/admin/deliver_order" slot="title" tag="span" name="menu"><i class="fa fa-motorcycle fa-2x awesome"></i>配送调度</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </template>
      <template v-if="auth===allAuth.driver">
        <el-row class="tac nav-menu">
          <el-col :span="12">
            <el-menu ref="navMenu"
                     :default-active="$route.path"
                     class="el-menu-vertical-demo"
                     text-color="#fff"
                     active-text-color="#ffffff">
              <el-menu-item index="1">
                <router-link to="/admin/driver_home" slot="title" tag="span" name="menu"><i class="fa fa-home fa-2x awesome"></i>首页
                </router-link>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="fa fa-book fa-2x awesome"></i>
                  <span name="drop-menu-title">交接单管理</span>
                </template>
                <el-menu-item index="2-1">
                  <router-link to="/admin/car_line" tag="span" name="drop-menu" data-index="2">车辆路线</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/admin/handover_order" tag="span" name="drop-menu" data-index="2">当前交接单</router-link>
                </el-menu-item>
                <el-menu-item index="2-3">
                  <router-link to="/admin/history_handover_order?page=1" tag="span" name="drop-menu" data-index="2">历史交接单</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </template>
      <template v-if="auth===allAuth.deliver">
        <el-row class="tac nav-menu">
          <el-col :span="12">
            <el-menu ref="navMenu"
                     :default-active="$route.path"
                     class="el-menu-vertical-demo"
                     text-color="#fff"
                     active-text-color="#ffffff">
              <el-menu-item index="1">
                <router-link to="/admin/deliver_home" slot="title" tag="span" name="menu"><i class="fa fa-home fa-2x awesome"></i>首页
                </router-link>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="fa fa-book fa-2x awesome"></i>
                  <span name="drop-menu-title">订单管理</span>
                </template>
                <el-menu-item index="2-1">
                  <router-link to="/admin/delivering" tag="span" name="drop-menu" data-index="2">配送订单</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/admin/history_deliver?page=1" tag="span" name="drop-menu" data-index="2">历史订单</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </template>
    </div>
  </el-aside>
</template>
<script>
import Store from '@/store'
import md5 from 'js-md5'
export default {
  name: 'LeftNav1',
  data () {
    return {
      auth: '',
      allAuth: {super: md5('1'), centerWarehouseKeeper: md5('2'), warehouseKeeper: md5('3'), driver: md5('4'), deliver: md5('5')}
      // selectedBtn: 0
    }
  },
  mounted: function () {
    this.getMenu()
  },
  updated: function () {
    this.handleActive()
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    handleActive () { // 打开当前子菜单
      let isActive = document.getElementsByClassName('is-active')[0]
      if (isActive && isActive.dataset.index) {
        let currentIndex = isActive.dataset.index
        this.$refs.navMenu.open(currentIndex)
      }
      // console.log(isActive.getAttribute('index'))
      // let blank = isActive.previousSibling
      // let pre = blank.previousSibling
      // console.log(pre)
      // pre.style.color = '#19A5FA'
    },
    getMenu: function () {
      let currentAuth = Store.getAuth()
      this.auth = currentAuth
    }
  }
}
</script>

<style>
  .el-aside {
    width: 200px !important;
    height: 100%;
  }

  .logo {
    width: 150px;
    margin: 0 auto;
  }

  .container-nav .nav-menu .el-menu {
    border-right: none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: transparent;
  }

  .container-nav .nav-menu .el-col-12 {
    width: 100%;
  }

  /*使用前必须先定义*/
  @font-face {
    /* 字体名称随意起 */
    font-family: Annabelle;
    /*你下载字体所在的位置*/
    src: url('../../assets/Annabelle.ttf');
  }

  .awesome {
    font-size: 1.5em;
    margin: 2px;
  }

  .shopName {
    /*使用你自己的字体*/
    font-family: Annabelle;
    font-style: oblique;
    font-size: 35px;
    font-weight: 500;
    color: #19A5FA;
    margin-top: 20px;
  }
  .nav-menu span[name="drop-menu-title"] {
    display: inline-block;
    height: 50px;
    width: 138px;
    padding-left: 60px;
    margin-left: -50px;
  }

  .nav-menu span[name="drop-menu"] {
    display: inline-block;
    height: 50px;
    width: 160px;
    padding-left: 40px;
    margin-left: -40px;
  }

  .nav-menu span[name="menu"] {
    display: inline-block;
    height: 56px;
    width: 170px;
    padding-left: 35px;
    margin-left: -25px;

  }

  .is-active, .is-active > i {
    color: #19A5FA;
  }

  .nav-menu .el-menu-item i {
    margin-left: -5px;
    margin-right: 10px;
    width:25px;
  }

</style>
