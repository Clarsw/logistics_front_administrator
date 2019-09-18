<template>
  <el-form :model="deliverValidateForm" ref="deliverValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item
      prop="userId"
      label="配送员"
      width="150"
      :rules="[
      { required: true, message: '配送员不能为空'},
    ]">
      <el-select v-model="deliverValidateForm.userId" clearable placeholder="请选择">
        <el-option
          v-for="item in deliverOptions"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import getData from '@/api/getDate'

export default {
  data () {
    return {
      deliverValidateForm: {
        userId: '',
        flag: false
      },
      orderId: this.$parent.orderId,
      deliverOptions: this.$parent.deliverOptions
    }
  },
  mounted () {
    console.log(this.orderId, this.deliverOptions)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.deliverValidateForm.flag = true
        } else {
          this.deliverValidateForm.flag = false
        }
      })
    },
    deliverAdjust: async function (params) {
      let data = await getData.getData.post('/order/deliverAdjust', {
        'userId': this.deliverValidateForm.userId,
        'orderId': this.orderId
      })
      return data.result
    }
  }
}
</script>
