<template>
    <el-form :model="accountData" status-icon :rules="rules" ref="accountForm" label-width="100px"
             class="demo-passwordForm" style="width: 90%; background-color: white">
      <el-form-item label="当前密码:" prop="currentPassword">
        <el-input type="password" v-model="accountData.currentPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新的密码:" prop="password">
      <el-input type="password" v-model="accountData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPassword">
      <el-input type="password" v-model="accountData.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
</template>

<script>
import getData from '@/api/getDate'
export default {
  name: 'ChangePassword',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.accountData.checkPassword !== '') {
          this.$refs.accountForm.validateField('checkPassword')
          callback()
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入当前密码'))
      } else {
        callback()
      }
    }
    return {
      accountData: {
        userId: this.$parent.userId,
        password: '',
        checkPassword: '',
        currentPassword: ''
      },
      flag: false,
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        currentPassword: [
          {validator: validatePass3, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 更新密码
    updatePassword: async function () {
      let data = await getData.getData.post('/user/updatePassword', {
        'userId': this.accountData.userId, 'currentPassword': this.accountData.currentPassword, 'password': this.accountData.password})
      return data.result
    },
    submitForm (formName) {
      console.log('1')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.flag = true
        } else {
          this.flag = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
