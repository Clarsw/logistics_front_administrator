<template>
  <el-aside  v-loading="loading"
             element-loading-text="Loading..."
             element-loading-background="rgba(0, 0, 0, 0.8)">
  <div class="container-nav">
    <div class="logo">
      <!--<img src="../../assets/adminLogo.jpg" alt="logo" style="width: 100%;height: 100%">-->
      <p class="shopName">Admin</p>
    </div>
    <template v-if="auth===1">
      <div class="nav-menu" >
        <ul class="menu-list">
          <li class="1-1">
            <router-link to="/admin/super_home">首页</router-link>
            <div class="selected-btn"></div>
          </li>
          <li class="1-2">
            <router-link to="/admin/user_mgt?page=1">员工管理</router-link>
            <div class="selected-btn"></div>
          </li>
        <li class="1-3">
          <router-link to="/admin/warehouse_mgt">仓库管理</router-link>
          <div class="selected-btn"></div>
        </li>
        <li class="1-4">
          <a class="dropdown-menu-btn" href="javascript:void(0)" @click="handleDropdownMenu">客户管理<i class="fa fa-angle-left  dropdown-icon"></i></a>
          <!--<div class="selected-btn"></div>-->
          <ul class="dropdown-menu">
            <li class="1-4-1">
              <router-link to="/admin/customer_mgt/customer?page=1">客户信息</router-link>
              <div class="dropdown-selected-btn selected-btn"></div>
            </li>
            <li class="1-4-2">
              <router-link to="/admin/customer_mgt/history_customer?page=1">历史客户</router-link>
              <div class="dropdown-selected-btn1 selected-btn"></div>
            </li>
          </ul>
        </li>
        </ul>
      </div>
    </template>
    <template v-if="auth===2">
      <div class="nav-menu" >
        <ul class="menu-list">
          <li class="1-1">
            <router-link to="/admin/warehouse_keeper_home">首页</router-link>
            <div class="selected-btn"></div>
          </li>
          <li class="1-2">
            <router-link to="/admin/car_mgt">车辆管理</router-link>
            <div class="selected-btn"></div>
          </li>
          <li class="1-3">
            <router-link to="/admin/order_mgt">订单管理</router-link>
            <div class="selected-btn"></div>
          </li>
          <li class="1-4">
            <router-link to="/admin/adjust_mgt">调度管理</router-link>
            <div class="selected-btn"></div>
          </li>
        </ul>
      </div>
      <!--<el-menu>-->
        <!--<el-menu-item index="1-1">首页</el-menu-item>-->
        <!--<el-menu-item index="1-2">车辆管理</el-menu-item>-->
        <!--<el-menu-item index="1-3">入库单管理</el-menu-item>-->
        <!--<el-menu-item index="1-4">出库单管理</el-menu-item>-->
        <!--<el-menu-item index="1-5">车辆调度</el-menu-item>-->
        <!--<el-menu-item index="1-6">配送调度</el-menu-item>-->
      <!--</el-menu>-->
    </template>
    <template v-if="auth===3">
      <div class="nav-menu">
        <ul class="menu-list">
          <li class="1-1" >
            <router-link to="/admin/driver_home">首页</router-link>
            <div class="selected-btn"></div>
          </li>
          <li class="1-2" >
            <router-link to="/admin/order_change">交接管理</router-link>
            <div class="selected-btn" ></div>
          </li>
        </ul>
      </div>
    </template>
    <template v-if="auth===4">
      <el-menu>
        <el-menu-item index="1-1">首页</el-menu-item>
        <el-menu-item index="1-2">揽件确认</el-menu-item>
        <el-menu-item index="1-3">签收确认</el-menu-item>
      </el-menu>
    </template>
  </div>
  </el-aside>
</template>

<script>
// import axios from 'axios'
import user from '@/api/user'

export default {
  name: 'LeftNav',
  data () {
    return {
      auth: '',
      loading: true
      // selectedBtn: 0
    }
  },
  mounted: function () {
    this.getMenu()
  },
  updated: function () { // 更新菜单后执行
    // this.changeParentStyle()
  },
  methods: {
    handleDropdownMenu (e) {
      e = (e || event)
      let target = e.target.parentNode.querySelector('ul')
      if (target.style.display === 'none') {
        target.style.display = 'block'
      } else {
        target.style.display = 'none'
      }
    },
    getMenu: async function () {
      let data = await user.checkRole('/user/checkRole')
      this.loading = false
      this.auth = data.auth
    }
  }
}
</script>

<style>
  .el-aside{
    width: 200px !important;
    height: 100%;
  }
  .logo{
    width: 150px;
    margin: 0 auto;
  }
  .container-nav .nav-menu .el-menu{
    border-right: none;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: transparent;
  }
  .container-nav .nav-menu li{
    display: block;
    position: relative;
    list-style: none;
    cursor: pointer;
    color:#696E7D;
  }
  .container-nav .nav-menu a:hover{
    background-color: #4E80C4;
  }
  /*.container-nav .nav-menu .selected-btn{*/
    /*position:absolute;*/
    /*top: 10px;*/
    /*left: 10px;*/
    /*height: 22px;*/
    /*border-left: 3px solid #4E80C4;*/
  /*}*/
  .container-nav .nav-menu .selected-btn{
    position:absolute;
    top: 10px;
    left: 10px;
    height: 22px;
    color:#696E7D;
  }
  .container-nav .nav-menu a{
    display: inline-block;
    text-decoration: none;
    padding: 12px 50px;
    width: 100px;
    color: inherit;
  }
  .container-nav .nav-menu .dropdown-icon{
    color: #4E80C4;
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .container-nav .nav-menu .dropdown-menu{
    display: none;
  }
  .container-nav .nav-menu .dropdown-menu a{
    /*margin-left: 10px;*/
  }
  .is-active + .selected-btn{
    position:absolute;
    top: 10px;
    left: 10px;
    height: 22px;
    border-left: 3px solid #4E80C4;
  }
  .is-active{
    background-color: #3B3E4D;
    color:#FFFFFF !important;
  }
  /*使用前必须先定义*/
  @font-face {
    /* 字体名称随意起 */
    font-family: Annabelle;
    /*你下载字体所在的位置*/
    src: url('../../assets/Annabelle.ttf');
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

</style>
