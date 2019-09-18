<template>
  <div class="container-right">
    <el-form :model="accountData" status-icon :rules="rules" ref="accountForm" label-width="100px"
             class="demo-accountForm" style="width: 50%; background-color: white">
      <!--<el-form-item label="密码" prop="pass">-->
      <!--<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="确认密码" prop="checkPass">-->
      <!--<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
      <!--</el-form-item>-->
      <div class="base-info-box">
        <div class="account base-info">账号:</div>
        <p>{{accountData.account}}</p>
      </div>
      <div class="base-info-box">
        <div class="priority base-info">职位:</div>
        <p v-if="accountData.priority === 1">
          超级管理员
        </p>
        <p v-else-if="accountData.priority === 2">
          中心仓库管理员
        </p>
        <p v-else-if="accountData.priority === 3">
          仓库管理员
        </p>
        <p v-else-if="accountData.priority === 4">
          司机
        </p>
        <p v-else-if="accountData.priority === 5">
          配送员
        </p>
      </div>
      <div class="base-info-box">
        <div class="warehouse-name base-info">所属仓库:</div>
        <p>{{accountData.warehouseName}}</p>
      </div>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="accountData.name"  :placeholder=initName></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input v-model="accountData.phone" :placeholder=initPhone></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('accountForm')">提交</el-button>
        <el-button @click="resetForm('accountForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="change-pass">
      <el-button @click="open1" type="primary">修改密码</el-button>
    </div>
    <div class="message">
      <template>
      <Message ref="message"></Message>
    </template>
    </div>
  </div>
</template>
<script>
import getData from '@/api/getDate'
import Message from '@/components/common/Message'
import ChangePassword from '@/page/self/ChangePassword'
import User from '@/api/user'
export default {
  components: {Message, ChangePassword},
  name: 'Self',
  data () {
    // "userId": 1,
    //   "account": "sdf23",
    //   "password": "1312aa",
    //   "name": "aa",
    //   "phone": "110",
    //   "priority": 1,
    //   "warehouseId": 1,
    //   "warehouseName": "岭南师范学院仓库"
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error('请输入数字值'))
        // } else {
        //   if (value < 18) {
        //     callback(new Error('必须年满18岁'))
        //   } else {
        //     callback()
        //   }
        // }
        let regName = /^[\u4e00-\u9fa5]{2,4}$/
        if (!regName.test(value)) {
          callback(new Error('请输入有效姓名'))
        } else {
          callback()
        }
      }, 1000)
    }
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error('请输入数字值'))
        // } else {
        //   if (value < 18) {
        //     callback(new Error('必须年满18岁'))
        //   } else {
        //     callback()
        //   }
        // }
        let regPhone = /^1[34578]\d{9}$/
        if (!regPhone.test(value)) {
          callback(new Error('请输入有效手机号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass')
    //     }
    //     callback()
    //   }
    // }
    // let validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      initName: '',
      initPhone: '',
      accountData: {
        userId: '',
        account: '',
        password: '',
        name: '',
        phone: '',
        priority: '',
        warehouseId: '',
        warehouseName: ''
      },
      rules: {
        // pass: [
        //   {validator: validatePass, trigger: 'blur'}
        // ],
        // checkPass: [
        //   {validator: validatePass2, trigger: 'blur'}
        // ],
        name: [
          {validator: checkName, trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    }
  },
  mounted: function () {
    this.getAccount()
    this.getWarehouse()
  },
  methods: {
    // 获取当前用户
    getWarehouse: async function () {
      let data = await getData.getData.get('/warehouse/getAllBrief', '')
      this.warehouseOption = data
    },
    getAccount: async function () {
      let data = await getData.getData.get('/user/getAccount', '')
      this.accountData = data
      this.initName = this.accountData.name
      this.initPhone = this.accountData.phone
      console.log(data)
    },
    updateAccount: async function () {
      let data = await getData.getData.post('/user/update', {'userId': this.accountData.userId, 'name': this.accountData.name, 'phone': this.accountData.phone})
      this.$refs.message.handleShow(data.result)
      // if (data.result === true) {
      //   this.$message({
      //     type: 'success',
      //     message: '更新成功!'
      //   })
      // } else {
      //   this.$message({
      //     type: 'error',
      //     message: '更新失败!'
      //   })
      // }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.open()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.accountData.name = this.initName
      this.accountData.phone = this.initPhone
    },
    open () {
      this.$confirm('此操作将更新用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateAccount()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    open1 () {
      this.index++
      const h = this.$createElement
      this.$msgbox({
        title: '修改密码',
        userId: this.accountData.userId,
        message: h(ChangePassword, {ref: 'myRef', key: this.index}),
        // h(
        // 'p', null, [
        //   h('span', null, '内容可以是 '),
        //   h('div', { style: 'color: teal' }, '')
        // ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            this.$refs.myRef.submitForm('accountForm')
            let flag = this.$refs.myRef.flag
            if (flag) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              // setTimeout(() => {
              let result = await this.$refs.myRef.updatePassword()
              if (result === true) {
                done()
                User.logout('/user/logout')
                this.$message({
                  type: 'success',
                  message: '密码修改成功,请重新登陆'
                })
              } else {
                done()
                this.$message({
                  type: 'error',
                  message: '修改失败' + result
                })
              }
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
              // }, 3000)
            } else {
              this.$message({
                type: 'info',
                message: '格式错误'
              })
            }
            // <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
            //     <el-button @click="resetForm('numberValidateForm')">重置</el-button>
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
      //   .then(action => {
      //   this.$message({
      //     type: 'info',
      //     message: '添加用户成功'
      //   })
      // })
    }

  }
}
</script>
<style>
  .base-info-box ::after {
    content: "";
    display: table;
    clear: both;
  }

  .base-info-box ::before {
    content: "";
    display: table;
  }

  .base-info {
    width: 100px;
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .base-info-box > p {
    color: #606266;
    position: relative;
    font-size: 14px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }

</style>
