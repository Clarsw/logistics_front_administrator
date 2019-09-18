<template>
  <div class="container-header">
    <div class="my-modal banner-right" @mouseleave="isShow=0">
      <div class="my-modal-container">
        <p @click="showMyList"><i class=" fa fa-user-o fa-2x"></i>  {{username}}</p>
        <ul class="my-modal-list" v-if="isShow===1">
          <li><router-link to="/admin/self" tag="span">设置</router-link></li>
          <li><p @click="logout">退出</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/api/user'
import store from '@/store'
export default {
  name: 'Banner',
  data () {
    return {
      isShow: 0,
      username: store.getName()
    }
  },
  methods: {
    logout () {
      user.logout('/user/logout')
    },
    showMyList () {
      if (this.isShow === 0) {
        this.isShow = 1
      } else {
        this.isShow = 0
      }
    }
  }
}
</script>

<style scoped>
/*.container-header .logo img{*/
  /*display: block;*/
  /*width: 40px;*/
  /*height: 40px;*/
  /*margin: auto 20px;*/
/*}*/
  .container-header .my-modal{
    position:fixed ;
    width: 140px;
    top:10px;
    right: 30px;
    color: #FFFFFF;
    background: #3D4A5D;
    text-align: center;
    cursor: pointer;
  }
.container-header .my-modal .my-modal-container p{
  margin-bottom: 8px;
}
  .container-header .my-modal .my-modal-container .my-modal-list li{
    display: block;
    padding: 10px 10px;
  }
.container-header .my-modal .my-modal-container .my-modal-list li:hover{
  background-color: #4E80C4;
}
</style>
