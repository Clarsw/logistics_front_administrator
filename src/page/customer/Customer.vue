<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入客户名或账号"
                    v-model="searchWord"
                    clearable>
          </el-input>
        </template>
        <p class="search-btn" @click="handleSearchChange" >搜索</p>
      </div>
      <div class="select-box">
        <template>
          <div class="select">
            <p class="option-description">状态：</p>
            <el-select v-model="stateValue" clearable placeholder="请选择"  @change="handleStateChange">
              <el-option
                v-for="item in stateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
          :data="allCustomerData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="customerId"
            label="客户ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="客户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            width="120">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{scope.row.status===0?'禁用中':'使用中'}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click=" scope.row.status===0 ? handleClickSingerUser(scope.row.customerId,'recover') : handleClickSingerUser(scope.row.customerId,'forbid')" type="danger" size="small">{{scope.row.status===0?'恢复使用':'禁止使用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
            <el-button @click="open1" type="danger">批量禁用</el-button>
            <el-button @click="open2" type="danger">批量恢复</el-button>
          </div>
          <div class="pagination-box">
            <pagination ref="pagination"></pagination>
          </div>
        </div>
      </template>
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
// test
import Pagination from '@/components/common/Pagination'

export default {
  name: 'Customer',
  components: {Pagination, Message},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allCustomerData: [
        // {
        //   customerId: '',
        //   account :'',
        //   password: '',
        //   name: '',
        //   phone: '',
        //    status :'',
        //   delMark: ''
        // }

      ],
      stateOption: [{
        value: 1,
        label: '使用中'
      }, {
        value: 0,
        label: '禁用中'
      }],
      stateValue: '',
      delValue: 0,
      multipleSelection: [],
      selectCustomerId: [],
      selectedCustomerId: []
    }
  },
  mounted: function () {
    this.getAll()
  },
  methods: {
    // 获取所有用户
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let customerBrief = {'keyword': this.searchWord, 'status': this.stateValue, 'page': page}
      let data = await getData.getData.get('/customer/getAll', customerBrief)
      this.loading = false
      this.allCustomerData = data['customerData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    forbidCustomer: async function (params) {
      let data = await getData.getData.post('/customer/forbid', params)
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.selectedCustomerId = []
    },
    recoverCustomer: async function (params) {
      let data = await getData.getData.post('/customer/recover', params)
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.selectedCustomerId = []
    },
    handleClickSingerUser (selection, method) {
      this.multipleSelection[0] = selection
      let selected = []
      this.selectCustomerId[0] = (this.multipleSelection[0])
      // let json = Object()
      // json.customerId = this.selectCustomerId[0]
      // selected.push(json)
      selected.push(this.selectCustomerId[0])
      this.selectedCustomerId = selected
      if (method === 'recover') {
        this.open2(this.selectedCustomerId)
      } else if (method === 'forbid') {
        this.open1()
      }
    },
    handleSelectionChange (selection) {
      this.multipleSelection = selection
      this.selectCustomerId.length = this.multipleSelection.length
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.selectCustomerId[i] = this.multipleSelection[i].customerId
      }
      let selected = []
      for (let i = 0; i < this.selectCustomerId.length; i++) {
        // let json = Object()
        // json.customerId = this.selectCustomerId[i]
        // selected.push(json)
        selected.push(this.selectCustomerId[i])
      }
      this.selectedCustomerId = selected
      console.log(this.selectedCustomerId)
      // console.log(JSON.parse(this.selectUserId))
    },
    handleStateChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.stateValue = value
      this.getAll()
    },
    handleRoleChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.roleValue = value
      this.getAll()
    },
    handleSearchChange () {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.getAll()
    },
    open1 () {
      if (this.selectedCustomerId.length !== 0) {
        this.$confirm('此操作将客户移入黑名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.forbidCustomer(this.selectedCustomerId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择客户'
        })
      }
    },
    open2 () {
      if (this.selectedCustomerId.length !== 0) {
        this.$confirm('此操作将客户移出黑名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.recoverCustomer(this.selectedCustomerId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择用户'
        })
      }
    }
  }
}
</script>

<style>

</style>
