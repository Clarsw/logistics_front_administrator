<template>
  <el-form :model="userValidateForm" ref="userValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item
      label="姓名"
      prop="name"
      :rules="[
      { required: true, message: '姓名不能为空'}
    ]"
    >
      <el-input type="name" v-model.number="userValidateForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="手机号码"
      prop="phone"
      :rules="[
      { required: true, message: '手机号码不能为空'},
      { type: 'number', message: '手机号码必须为数字值'},
      { pattern: /^1[34578]\d{9}$/,message:'手机号码格式无效'}
    ]"
    >
      <el-input type="phone" v-model.number="userValidateForm.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="所属仓库"
      prop="warehouseId"
      :rules="[
      { required: true, message: '所属仓库不能为空'}
    ]">
    <el-select v-model="userValidateForm.warehouseId" clearable placeholder="请选择"   @change="handleStateChange">
      <el-option
        v-for="item in warehouseOption"
        :key="item.warehouseId"
        :label="item.name"
        :value="item.warehouseId">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item
      label="角色"
      prop="role"
      :rules="[
      { required: true, message: '用户角色不能为空'}
    ]">
      <el-select v-model="userValidateForm.role" placeholder="请选择用户角色">
        <el-option label="中心仓库管理员" value="2"></el-option>
        <el-option label="仓库管理员" value="3"></el-option>
        <el-option label="司机" value="4"></el-option>
        <el-option label="配送员" value="5"></el-option>
      </el-select>
    </el-form-item>
    <!--<el-form-item>-->
    <!--&lt;!&ndash;<el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>&ndash;&gt;-->
    <!--<el-button @click="resetForm('numberValidateForm')">重置</el-button>-->
    <!--</el-form-item>-->
  </el-form>
</template>
<script>
import getData from '@/api/getDate'
export default {
  data () {
    return {
      userValidateForm: {
        name: '',
        phone: '',
        role: '',
        warehouseId: '',
        flag: false
      },
      warehouseOption: this.$parent.warehouseOption
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userValidateForm.flag = true
        } else {
          this.userValidateForm.flag = false
        }
      })
    },
    addUser: async function (params) {
      let data = await getData.getData.post('/user/add', {
        name: this.userValidateForm.name,
        phone: this.userValidateForm.phone,
        role: this.userValidateForm.role,
        warehouseId: this.userValidateForm.warehouseId})
      return data.result
    }
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // }
  }
}
</script>
