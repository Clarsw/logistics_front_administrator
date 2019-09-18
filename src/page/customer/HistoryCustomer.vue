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
    </div>
    <div class="data-box">
      <template>
        <el-table
          v-loading="loading"
          element-loading-text="Loading..."
          ref="multipleTable"
          :data="allHistoryCustomerData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
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
           >
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
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
// test
import Pagination from '@/components/common/Pagination'
export default {
  name: 'Customer',
  components: {Pagination},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allHistoryCustomerData: [
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
      delValue: 1,
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
      let data = await getData.getData.get('/customer/getAllHistory', customerBrief)
      this.loading = false
      this.allHistoryCustomerData = data['customerData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    forbidUser: async function (params) {
      let data = await getData.getData.post('/customer/forbid', params)
      console.log(data.result)
    },
    recoverUser: async function (params) {
      let data = await getData.getData.post('/customer/recover', params)
      console.log(data.result)
    },
    handleClickSingerUser (selection, method) {
      this.multipleSelection[0] = selection
      let selected = []
      this.selectCustomerId[0] = (this.multipleSelection[0])
      let json = Object()
      json.customerId = this.selectCustomerId[0]
      selected.push(json)
      this.selectedCustomerId = selected
      if (method === 'recover') {
        this.recoverUser(this.selectedCustomerId)
      } else if (method === 'forbid') {
        this.forbidUser(this.selectedCustomerId)
      }
    },
    handleSelectionChange (selection) {
      console.log(selection)
      this.multipleSelection = selection
      this.selectCustomerId.length = this.multipleSelection.length
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.selectCustomerId[i] = this.multipleSelection[i].customerId
      }
      let selected = []
      for (let i = 0; i < this.selectCustomerId.length; i++) {
        let json = Object()
        json.customerId = this.selectCustomerId[i]
        selected.push(json)
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
    }
  }
}
</script>

<style>

</style>
