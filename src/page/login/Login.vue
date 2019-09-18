<template>
  <div class="user-login">
    <div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用<br/>物流配送后台管理系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">管理员登录</h4>
        <el-form ref="form" :model="user" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="account" :rules="[ { required: true, message: '账号不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-edit input-icon"></i>
                    <el-input placeholder="账号" v-model="user.account"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-share input-icon"></i>
                    <el-input type="password" placeholder="密码" v-model="user.password"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">
                登 录
              </el-button>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/api/user'

import BasicContainer from '@vue-materials/basic-container'
const backgroundImage =
    'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png'
export default {
  components: { BasicContainer },
  name: 'UserLogin',
  data () {
    return {
      backgroundImage: backgroundImage,
      user: {
        account: '',
        password: ''
      }
    }
  },
  created () {},
  methods: {
    submitBtn () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    login () {
      user.login('/user/login', this.user)
    }

  }
}
</script>

<style lang="scss">
  .user-login {
    .user-login-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
    }
    .el-checkbox__label {
      color: #999;
      font-size: 13px;
    }
    .content-wrapper {
      position: absolute;
      top: -100px;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .slogan {
        text-align: center;
        color: #fff;
        font-size: 36px;
        letter-spacing: 2px;
        line-height: 48px;
        text-shadow: 1px 1px 0px #409EFF, -1px -1px 0px #409EFF, 2px 1px 0px #409EFF
      }
    }
    .form-container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 30px 40px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 1px 1px 2px #eee;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .form-Item {
      position: relative;
      flex-direction: column;
    }
    .form-line {
      position: relative;
      display: flex;
      align-items: center;
      &:after {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-color: #dcdcdc;
        border-radius: 0;
      }
    }
    .el-input {
      width: 240px;
      input {
        border: none;
        margin: 0;
        padding-left: 10px;
        font-size: 13px;
      }
    }
    .form-title {
      margin: 0 0 20px;
      text-align: center;
      color: #3080fe;
      letter-spacing: 12px;
    }
    .input-icon {
      color: #999;
    }
    .checkbox {
      margin-left: 5px;
    }
    .submit-btn {
      margin-bottom: 25px;
      width: 100%;
      background: #3080fe;
      border-radius: 28px;
    }
    .link {
      color: #999;
      text-decoration: none;
      font-size: 13px;
    }
    .line {
      color: #dcd6d6;
      margin: 0 8px;
    }
  }
  @media screen and (max-width: 720px) {
    .user-login {
      .content-wrapper {
        margin: 20px auto;
        top: 40px;
        max-width: 300px;
        display: block;
        .slogan {
          color: #666;
          font-size: 22px;
          line-height: 30px;
        }
      }
    }
  }
</style>
