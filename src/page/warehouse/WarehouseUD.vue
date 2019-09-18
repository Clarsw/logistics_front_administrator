<template>
  <el-form :model="warehouseValidateForm" ref="warehouseValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item
      label="仓库名"
      prop="name"
      :rules="[
      { required: true, message: '仓库名不能为空'}
    ]"
    >
      <el-input type="name" v-model.number="warehouseValidateForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="负责人ID"
      prop="userId"
      :rules="[
      { required: true, message: '负责人ID不能为空'}
    ]"
    >
      <el-input type="account" v-model.number="warehouseValidateForm.userId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="等级"
      prop="level"
      :rules="[
      { required: true, message: '仓库等级不能为空'}
    ]"
    >
      <el-input type="level" v-model.number="warehouseValidateForm.level" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="最大容量"
      prop="maxWeight"
      :rules="[
      { required: true, message: '仓库最大容量不能为空'}
    ]"
    >
      <el-input type="maxWeight" v-model.number="warehouseValidateForm.maxWeight" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="地址"
      prop="address"
      :rules="[
      { required: true, message: '地址不能为空'}
    ]"
    >
      <el-input type="address" v-model.number="warehouseValidateForm.address" autocomplete="off"></el-input>
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
      warehouseValidateForm: {
        updateId: this.$parent.updateWarehouse.warehouseId,
        name: this.$parent.updateWarehouse.name,
        userId: this.$parent.updateWarehouse.userId,
        level: this.$parent.updateWarehouse.level,
        maxWeight: this.$parent.updateWarehouse.maxWeight,
        address: this.$parent.updateWarehouse.address,
        flag: false
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.warehouseValidateForm.flag = true
        } else {
          this.warehouseValidateForm.flag = false
        }
      })
    },
    updateWarehouse: async function (params) {
      let data = await getData.getData.post('/warehouse/update', {
        updateId: this.warehouseValidateForm.updateId,
        name: this.warehouseValidateForm.name,
        userId: this.warehouseValidateForm.userId,
        level: this.warehouseValidateForm.level,
        maxWeight: this.warehouseValidateForm.maxWeight,
        address: this.warehouseValidateForm.address})
      return data.result
    }
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // }
  }
}
</script>
