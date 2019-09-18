<template>
  <el-form :model="carValidateForm" ref="carValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item
      label="等级"
      prop="level"
      :rules="[
      { required: true, message: '车辆等级不能为空'},
      { type: 'number', message: '车辆等级必须为数字值'},
    ]"
    >
      <el-input type="level" v-model.number="carValidateForm.level" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="最大容量"
      prop="maxWeight"
      :rules="[
      { required: true, message: '车辆最大容量不能为空'},
      { type: 'number', message: '车辆最大容量必须为数字值'},
    ]"
    >
      <el-input type="maxWeight" v-model.number="carValidateForm.maxWeight" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import getData from '@/api/getDate'
export default {
  data () {
    return {
      carValidateForm: {
        level: '',
        maxWeight: '',
        flag: false
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.carValidateForm.flag = true
        } else {
          this.carValidateForm.flag = false
        }
      })
    },
    addCar: async function (params) {
      console.log(123)
      let data = await getData.getData.post('/car/add', {
        'level': this.carValidateForm.level,
        'maxWeight': this.carValidateForm.maxWeight})
      return data.result
    }
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // }
  }
}
</script>
