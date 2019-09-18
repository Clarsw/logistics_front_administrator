<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入车辆编号"
                    v-model="searchWord"
                    clearable>
          </el-input>
        </template>
        <p class="search-btn" @click="handleSearchChange" >搜索</p>
      </div>
      <div class="select-box">
        <template>
          <div class="select">
            <p class="option-description">等级：</p>
            <el-select v-model="levelValue" clearable placeholder="请选择" @change="handleLevelChange">
              <el-option
                v-for="item in levelOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
          :data="allCarData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="carId"
            label="车辆ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="司机ID"
            width="120">
          </el-table-column>
          <el-table-column
            label="等级"
            width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.level === 1">
                跨区域
              </div>
              <div v-else>
                区域内
              </div>
            </template>
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
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">
                忙碌
              </div>
              <div v-else>
                空闲
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleClickSingerCar(scope.row.carId)" type="danger" size="small">删除</el-button>
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
        <div class="message">
          <template>
            <Message ref="message"></Message>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import getData from '@/api/getDate'
import Message from '@/components/common/Message'
// test
import CarAdd from '@/page/car/CarAdd'
import Pagination from '@/components/common/Pagination'

export default {
  name: 'Car',
  components: {Pagination, CarAdd, Message},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allCarData: [
        // {
        //   carId: '',
        //   userId: '',
        //   maxWeight: '',
        //   residueWeight: '',
        //   status:'',
        //   level:''
        // }

      ],
      levelOption: [{
        value: '0',
        label: '区域内'
      }, {
        value: '1',
        label: '跨区域'
      }],
      levelValue: '',
      selectCarId: [],
      selectedCarId: [],
      multipleSelection: []
    }
  },
  mounted: function () {
    this.getAll()
  },
  methods: {
    // 获取仓库的车辆
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let carBrief = {'keyword': this.searchWord, 'level': this.levelValue, 'page': page}
      let data = await getData.getData.get('/car/getLocal', carBrief)
      this.loading = false
      this.allCarData = data['carData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    deleteCar: async function (params) {
      let data = await getData.getData.post('/car/delete', {carId: params})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.selectedCarId = []
    },
    handleClickSingerCar (selection, method) {
      console.log(selection)
      this.multipleSelection[0] = selection
      let selected = []
      this.selectCarId[0] = (this.multipleSelection[0])
      selected.push(this.selectCarId[0])
      this.selectedCarId = selected
      this.open1()
    },
    handleLevelChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.levelValue = value
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
        title: '添加车辆',
        message: h(CarAdd, {ref: 'myRef', key: this.index}),
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
            this.$refs.myRef.submitForm('carValidateForm')
            let flag = this.$refs.myRef.carValidateForm.flag
            if (flag) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              // setTimeout(() => {
              let result = await this.$refs.myRef.addCar()
              if (result === true) {
                done()
                this.getAll()
                this.$message({
                  type: 'success',
                  message: '添加用户成功,刷新数据'
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
    },
    open1 () {
      console.log(this.selectedCarId)
      if (this.selectedCarId.length !== 0) {
        this.$confirm('此操作将永久删除车辆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCar(this.selectedCarId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择车辆'
        })
      }
    }
  }
}
</script>

<style>
</style>
