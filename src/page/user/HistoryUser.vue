<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入用户名或账号"
                    v-model="searchWord"
                    clearable>
          </el-input>
        </template>
        <p class="search-btn" @click="handleSearchChange" >搜索</p>
      </div>
      <div class="select-box">
        <template>
          <div class="select">
            <p class="option-description">角色：</p>
            <el-select v-model="roleValue" clearable placeholder="请选择" @change="handleRoleChange">
              <el-option
                v-for="item in roleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </template>
        <template>
          <div class="select">
            <p class="option-description">所属仓库：</p>
            <el-select v-model="warehouseValue" clearable placeholder="请选择"   @change="handleStateChange">
              <el-option
                v-for="item in warehouseOption"
                :key="item.warehouseId"
                :label="item.name"
                :value="item.warehouseId">
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
          :data="allUserData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="userId"
            label="用户ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="account"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            width="120">
          </el-table-column>
          <el-table-column label="角色" width="120">
            <template slot-scope="scope">
              <!--{{scope.row.priority===0?'普通员工':'管理员'}}-->
              <div v-if="scope.row.priority === 1">
                超级管理员
              </div>
              <div v-else-if="scope.row.priority === 2">
                仓库管理员
              </div>
              <div v-else-if="scope.row.priority === 3">
                司机
              </div>
              <div v-else-if="scope.row.priority === 4">
                配送员
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            label="所属仓库"
            width="">
            <template  slot-scope="scope">
            <div  v-for="(item) in warehouseOption"  v-bind:key="item.warehouseId" v-if="item.warehouseId===scope.row.warehouseId" >
              {{item.name}}
            </div>
            </template>
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
  name: 'HistoryUser',
  components: {Pagination},
  data () {
    return {
      loading: true,
      searchWord: '',
      allUserData: [
        // {
        //   userId: '',
        //   account: '',
        //   password: '',
        //   name: '',
        //   phone: '',
        //   priority: '',
        //   warehouseId:'',
        //   warehouseName:'',
        // }

      ],
      roleOption: [{
        value: 1,
        label: '超级管理员'
      }, {
        value: 2,
        label: '仓库管理员'
      }, {
        value: 3,
        label: '仓库管理员'
      }, {
        value: 4,
        label: '司机'
      }, {
        value: 5,
        label: '配送员'
      }],
      warehouseOption: [],
      roleValue: '',
      stateValue: 1,
      warehouseValue: '',
      multipleSelection: [],
      selectUserId: [],
      selectedUserId: []
    }
  },
  mounted: function () {
    this.getAll()
    this.getWarehouse()
  },
  methods: {
    // 生成所属仓库ID和仓库名
    getWarehouse: async function () {
      let data = await getData.getData.get('/warehouse/getAllBrief', '')
      this.warehouseOption = data
    },
    // 获取所有用户
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let userBrief = {'keyword': this.searchWord, 'priority': this.roleValue, 'warehouseId': this.warehouseValue, 'delMark': this.stateValue, 'page': page}
      let data = await getData.getData.get('/user/getAllHistory', userBrief)
      this.loading = false
      this.allUserData = data['userData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    // forbidUser: async function (params) {
    //   let data = await getData.getData.post('/user/delete', params)
    //   console.log(data.result)
    // },
    // recoverUser: async function (params) {
    //   let data = await getData.getData.post('/user/recover', params)
    //   console.log(data.result)
    // },
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
