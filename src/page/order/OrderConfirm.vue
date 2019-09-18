<template>
  <el-form :model="orderValidateForm" ref="orderValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item
      label="重量"
      prop="wareWeight"
      :rules="[
      { required: true, message: '订单重量不能为空'},
      { type: 'number', message: '订单重量必须为数字值'},
    ]"
    >
      <el-input type="text" v-model.number="orderValidateForm.wareWeight" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="运费"
      prop="freight"
      :rules="[
      { required: true, message: '运费不能为空'},
      { type: 'number', message: '运费必须为数字值'},
    ]"
    >
      <el-input type="text" v-model.number="orderValidateForm.freight" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import getData from '@/api/getDate'
export default {
  data () {
    return {
      orderValidateForm: {
        orderId: this.$parent.orderId,
        wareWeight: '',
        freight: '',
        flag: false
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.orderValidateForm.flag = true
        } else {
          this.orderValidateForm.flag = false
        }
      })
    },
    orderConfirm: async function (params) {
      let data = await getData.getData.post('/order/confirm', {
        'wareWeight': this.orderValidateForm.wareWeight,
        'freight': this.orderValidateForm.freight,
        'orderId': this.orderValidateForm.orderId
      })
      return data.result
    }
  }
}
</script>
