<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
      </div>
      <div class="select-box">
      </div>
    </div>
    <div class="data-box">
      <template>
        <el-table
          v-loading="loading"
          element-loading-text="Loading..."
          :data="handoverOrderData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  class="demo-table-expand">
                <el-form-item label="订单号:" v-for='value in scope.row.orderDetial' v-bind:key="value">
                  {{value}}
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="出库单ID"
            prop="outboundOrderId">
          </el-table-column>
          <el-table-column
            label="目的仓库"
          >
            <template  slot-scope="scope">
              <div  v-for="(item) in warehouseOption"  v-bind:key="item.warehouseId" v-if="item.warehouseId===scope.row.warehouseId" >
                {{item.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
            prop="createDate">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                未收件
              </div>
              <div v-else-if="scope.row.status === 1">
                已收件
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 0" @click="handleClickSinger(scope.row.outboundOrderId)" type="primary" size="small">确认收件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
            <el-button @click="handleCheckFinished" type="danger" v-if="handoverOrderStatus === 1">揽件完成</el-button>
            <el-button @click="handleCheckFinished" type="danger" v-if="handoverOrderStatus === 0">送件完成</el-button>
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
// test
import Message from '@/components/common/Message'

export default {
  name: 'HanoverOrder',
  components: {Message},
  data () {
    return {
      loading: true,
      handoverOrderData: [],
      handoverOrderId: '',
      handoverOrderStatus: '',
      warehouseOption: [],
      outboundOrderId: ''
    }
  },
  mounted: function () {
    this.getAll()
    this.getWarehouse()
  },
  methods: {
    // 获取仓库信息
    getWarehouse: async function () {
      let data = await getData.getData.get('/warehouse/getAllBrief', '')
      this.warehouseOption = data
    },
    // 获取当前交接单
    getAll: async function () {
      // let page = this.$route.query.page
      this.loading = true
      // let orderBrief = {'keyword': this.searchWord, 'status': this.statusValue, 'page': page}
      let data = await getData.getData.get('/order/getHandover')
      this.loading = false
      this.handoverOrderData = data['handoverOrderData']
      this.handoverOrderId = data['handoverOrderId']
      this.handoverOrderStatus = data['handoverOrderStatus']
      console.log(this.handoverOrderStatus)
      // this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    outboundConfirm: async function (params) {
      let data = await getData.getData.post('/order/outboundConfirm', {'outboundOrderId': params})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
    },
    allOutboundConfirm: async function (params) {
      let data = ''
      if (this.handoverOrderStatus === 1) {
        data = await getData.getData.post('/order/allOutboundConfirm', {'handoverOrderId': params})
      } else {
        data = await getData.getData.post('/order/allOutboundConfirm1', {'handoverOrderId': params})
      }
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
    },
    handleClickSinger (value) {
      this.outboundOrderId = value
      this.open()
    },
    handleCheckFinished () {
      let flag = true
      for (let i = 0; i < this.handoverOrderData.length; i++) {
        if (this.handoverOrderData[i].status !== 1) {
          flag = false
          break
        } else {
          flag = true
        }
      }
      this.open1(flag)
    },
    open () {
      if (this.outboundOrderId !== '') {
        this.$confirm('此操作将确认揽件或送达, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.outboundConfirm(this.outboundOrderId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择出库单'
        })
      }
    },
    open1 (flag) {
      console.log(flag)
      if (flag) {
        this.$confirm('此操作将确认所有出库单均已完成, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.allOutboundConfirm(this.handoverOrderId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '还有尚未出库成功的出库单'
        })
      }
    }
    // handleLevelChange (value) {
    //   this.$router.push(this.$route.path + '?page=1')
    //   this.$refs.pagination.parentSelectChange()
    //   this.statusValue = value
    //   this.getAll()
    // },
    // handleSearchChange () {
    //   this.$router.push(this.$route.path + '?page=1')
    //   this.$refs.pagination.parentSelectChange()
    //   this.getAll()
    // }
  }
}
</script>

<style scoped>
  .el-table .el-form .el-form-item{
    width: 30%;
    display: inline-block;
  }
</style>
