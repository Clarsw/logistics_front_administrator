<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入仓库名或编号"
                    v-model="searchWord"
                    clearable>
          </el-input>
        </template>
        <p class="search-btn" @click="handleSearchChange" >搜索</p>
      </div>
      <div class="select-box">
        <template>
          <div class="select">
            <p class="option-description">城市:</p>
            <el-cascader
              placeholder="请选择省/市/区"
              v-model="cityValue1"
              :options="cityOptions"
              clearable="true"
              @change="handleCityChange">
            </el-cascader>
          </div>
        </template>
      </div>
    </div>
    <div class="data-box">
      <template>
        <el-table
          v-loading="loading"
          element-loading-text="Loading..."
          ref="multipleTable"
          :data="allWarehouseData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="warehouseId"
            label="仓库ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="仓库名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="负责人ID"
            width="120">
          </el-table-column>
          <el-table-column
          prop="level"
          label="等级"
          width="80">
        </el-table-column>
          <el-table-column
            prop="maxWeight"
            label="最大容量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="residueWeight"
            label="剩余容量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="阀值"
            width="100">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="open1(scope.row)" type="primary" size="small">更新</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
            <el-button @click="open" type="primary">添加</el-button>
          </div>
          <div class="pagination-box">
            <pagination ref="pagination"></pagination>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import getData from '@/api/getDate'
import options from '@/api/country'
// test
import WarehouseAdd from '@/page/warehouse/WarehouseAdd'
import Pagination from '@/components/common/Pagination'
import WarehouseUD from '@/page/warehouse/WarehouseUD'

export default {
  name: 'Warehouse',
  components: {Pagination, WarehouseAdd, WarehouseUD},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allWarehouseData: [
        // {
        //   warehouseId: '',
        //   name: '',
        //   address: '',
        //   userId: '',
        //   level: '',
        //   maxWeight: ''
        //   residueWeight:'',
        //   status:'',
        // }

      ],
      cityOptions: options,
      cityValue1: '',
      cityValue: ''
    }
  },
  mounted: function () {
    this.getAll()
  },
  methods: {
    // 获取所有仓库
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let warehouseBrief = {'keyword': this.searchWord, 'city': this.cityValue, 'page': page}
      let data = await getData.getData.get('/warehouse/getAll', warehouseBrief)
      this.loading = false
      this.allWarehouseData = data['warehouseData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    handleCityChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      if (value.length !== 0) {
        this.cityValue = value[0] + value[1] + value[2]
      } else {
        this.cityValue = ''
      }
      this.getAll()
    },
    handleSearchChange () {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.getAll()
    },
    // 弹出框
    open () {
      this.index++
      const h = this.$createElement
      this.$msgbox({
        title: '添加仓库',
        message: h(WarehouseAdd, {ref: 'myRefAdd', key: this.index}),
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
            this.$refs.myRefAdd.submitForm('warehouseValidateForm')
            let flag = this.$refs.myRefAdd.warehouseValidateForm.flag
            if (flag) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              let result = await this.$refs.myRefAdd.addWarehouse()
              if (result === true) {
                done()
                this.getAll()
                this.$message({
                  type: 'success',
                  message: '添加仓库成功,刷新数据'
                })
              } else {
                done()
                this.$message({
                  type: 'error',
                  message: '添加失败' + result
                })
              }
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            } else {
              this.$message({
                type: 'info',
                message: '格式错误'
              })
            }
          } else {
            done()
          }
        }
      })
    },
    // 更新弹出框
    open1 (selected) {
      let updateWarehouse
      let json = Object()
      json.warehouseId = selected.warehouseId
      json.name = selected.name
      json.address = selected.address
      json.level = selected.level
      json.maxWeight = selected.maxWeight
      json.userId = selected.userId
      updateWarehouse = json
      this.index++
      const h = this.$createElement
      this.$msgbox({
        updateWarehouse: updateWarehouse,
        title: '更新仓库',
        message: h(WarehouseUD, {ref: 'myRefUD', key: this.index}),
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
            this.$refs.myRefUD.submitForm('warehouseValidateForm')
            let flag = this.$refs.myRefUD.warehouseValidateForm.flag
            if (flag) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              let result = await this.$refs.myRefUD.updateWarehouse()
              if (result === true) {
                done()
                this.getAll()
                this.$message({
                  type: 'success',
                  message: '更新仓库成功,刷新数据'
                })
              } else {
                done()
                this.$message({
                  type: 'error',
                  message: '添加失败' + result
                })
              }
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            } else {
              this.$message({
                type: 'info',
                message: '格式错误'
              })
            }
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
