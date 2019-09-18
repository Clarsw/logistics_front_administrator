<template>
  <div class="container">
    <div class="banner">
      <template>
        <banner></banner>
      </template>
    </div>
    <div class="left-nav">
      <template>
        <left-nav1></left-nav1>
      </template>
    </div>
    <div class="right-main">
      <template>
        <router-view/>
      </template>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner/Banner.vue'
import LeftNav from '@/components/leftnav/LeftNav.vue'
import LeftNav1 from '@/components/leftnav/LeftNav1.vue'
export default {
  name: 'Layout',
  components: {LeftNav, Banner, LeftNav1},
  data () {
    return {

    }
  },
  // component: {
  //   banner: Banner,
  //   leftNav: LeftNav,
  //   leftNav1: LeftNav1
  // },
  mounted: function () {
  },
  methods: {
  }

}
</script>

<style>
  /*#fixed-background{*/
    /*position: fixed;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*z-index: -1;*/
    /*background: rgb(238,239,243); !* 备用属性 *!*/
    /*!*background: -webkit-linear-gradient(left top, rgb(60,45,70) 0%, rgb(203,170,120)80%); !* Safari 5.1 - 6.0 *!*!*/
    /*!*background: -o-linear-gradient(bottom right,  rgb(60,45,70) 0%, rgb(203,170,120)80%); !* Opera 11.1 - 12.0 *!*!*/
    /*!*background: -moz-linear-gradient(bottom right, rgb(68,56,78) 0%, rgb(203,170,120)80%); !* Firefox 3.6 - 15 *!*!*/
    /*!*background: linear-gradient(to bottom right,  rgb(60,45,70) 0%, rgb(203,170,120)80%) ; !* 标准的语法 *!*!*/
  /*}*/
  .container{
    display: flex;
    background-color: #CACED7;
  }
  .left-nav{
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(42,48,62,1);
  }
  .banner{
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 200px;
    background: #3D4A5D; /* 备用属性 */
    background: -webkit-linear-gradient(left top, rgb(60,70,85) 0%, rgb(60,75,95)80%); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right,  rgb(60,70,85) 0%, rgb(60,75,95)80%); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, rgb(60,70,85) 0%, rgb(60,75,95)80%); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right,  rgb(60,70,85) 0%, rgb(60,75,95)80%) ; /* 标准的语法 */
    border-left: 3px #4E80C4 solid;
    z-index: 1000;
  }
  .right-main{
    flex: 1;
    overflow: hidden;
    margin: 60px 10px 10px 210px;
  }
</style>
