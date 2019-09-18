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
            type="selection"
            width="55">
          </el-table-column>
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
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleClickSingerUser(scope.row.userId,'reset')" type="danger" size="small">重置密码</el-button>
              <el-button @click=" handleClickSingerUser(scope.row.userId,'delete')" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
            <el-button @click="open1" type="danger">批量删除</el-button>
            <!--<el-button @click="recoverUser(selectedUserId)">批量恢复</el-button>-->
            <el-button @click="open2" type="danger">批量重置密码</el-button>
            <el-button @click="open" type="primary">添加</el-button>
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
import UserAdd from '@/page/user/UserAdd'
import Pagination from '@/components/common/Pagination'

export default {
  name: 'User',
  components: {Pagination, UserAdd, Message},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allUserData: [{
        userId: '',
        account: '',
        password: '',
        name: '',
        phone: '',
        priority: '',
        warehouseId: ''
      }
      ],
      roleOption: [{
        value: 2,
        label: '中心仓库管理员'
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
      stateValue: 0,
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
    // getWarehouse: function () {
    //   for (let i = 0; i < this.allUserData.length; i++) {
    //     let flag = 1
    //     if (this.warehouseOption.length !== 0) {
    //       for (let j = 0; j < this.warehouseOption.length; j++) {
    //         if (this.allUserData[i].warehouseId === this.warehouseOption[j].value) {
    //           flag = 0
    //           break
    //         } else {
    //           flag = 1
    //         }
    //       }
    //     }
    //     if (flag) {
    //       let json = Object()
    //       json.value = this.allUserData[i].warehouseId
    //       json.label = this.allUserData[i].warehouseName
    //       this.warehouseOption.push(json)
    //     }
    //   }
    // },
    // 获取所有用户
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let userBrief = {
        'keyword': this.searchWord,
        'priority': this.roleValue,
        'warehouseId': this.warehouseValue,
        'page': page
      }
      let data = await getData.getData.get('/user/getAll', userBrief)
      this.loading = false
      this.allUserData = data['userData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    deleteUser: async function (params) {
      let data = await getData.getData.post('/user/delete', {userId: params})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.selectedUserId = []
    },
    // recoverUser: async function (params) {
    //   let data = await getData.getData.post('/user/recover', params)
    //   console.log(data.result)
    // },
    resetPassword: async function (params) {
      let data = await getData.getData.post('/user/resetPassword', {userId: params})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.selectedUserId = []
    },
    handleClickSingerUser (selection, method) {
      this.multipleSelection[0] = selection
      console.log(this.multipleSelection[0])
      let selected = []
      this.selectUserId[0] = (this.multipleSelection[0])
      // let json = Object()
      // json.userId = this.selectUserId[0]
      // selected.push(json)
      selected.push(this.selectUserId[0])
      this.selectedUserId = selected
      // if (method === 'recover') {
      //   this.recoverUser(this.selectedUserId)
      // } else if (method === 'forbid') {
      //   this.forbidUser(this.selectedUserId)
      // } else
      if (method === 'reset') {
        this.open2()
      } else if (method === 'delete') {
        this.open1()
      }
    },
    handleSelectionChange (selection) {
      this.multipleSelection = selection
      this.selectUserId.length = this.multipleSelection.length
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.selectUserId[i] = this.multipleSelection[i].userId
      }
      let selected = []
      for (let i = 0; i < this.selectUserId.length; i++) {
        // let json = Object()
        // json.userId = this.selectUserId[i]
        // selected.push(json)
        selected.push(this.selectUserId[i])
      }
      this.selectedUserId = selected
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
    // 弹出框
    open () {
      this.index++
      const h = this.$createElement
      this.$msgbox({
        warehouseOption: this.warehouseOption,
        title: '添加用户',
        message: h(UserAdd, {ref: 'myRef', key: this.index}),
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
            this.$refs.myRef.submitForm('userValidateForm')
            let flag = this.$refs.myRef.userValidateForm.flag
            if (flag) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              // setTimeout(() => {
              let result = await this.$refs.myRef.addUser()
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
      if (this.selectedUserId.length !== 0) {
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(this.selectedUserId)
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
    },
    open2 () {
      if (this.selectedUserId.length !== 0) {
        this.$confirm('此操作将重置用户密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.selectedUserId)
          this.resetPassword(this.selectedUserId)
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
