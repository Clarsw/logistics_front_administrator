<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入订单编号"
                    v-model="searchWord"
                    clearable>
          </el-input>
        </template>
        <p class="search-btn" @click="handleSearchChange" >搜索</p>
      </div>
      <div class="select-box">
      </div>
    </div>
    <div class="data-box">
      <template>
        <el-table
          v-loading="loading"
          element-loading-text="Loading..."
          :data="allOrderData"
          style="width: 100%"
          :default-sort = "{prop: 'receiverAddress', order: 'descending'}"
          @selection-change="handleSelectionChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="demo-table-expand">
                <el-form-item label="寄件人 :">
                  <span>{{ props.row.customerName }}</span>
                </el-form-item>
                <el-form-item label="寄件人手机号码 :">
                  <span>{{ props.row.customerPhone }}</span>
                </el-form-item>
                <el-form-item label="寄件人地址 :">
                  <span>{{ props.row.customerAddress }}</span>
                </el-form-item>
                <el-form-item label="物品重量 :">
                  <span>{{ props.row.wareWeight }}</span>
                </el-form-item>
                <el-form-item label="运费 :">
                  <span>{{ props.row.freight }}</span>
                </el-form-item>
                <el-form-item label="寄件时间 :">
                  <span>{{ props.row.createDate }}</span>
                </el-form-item>
                <el-form-item label="收件时间 :">
                  <span>{{ props.row.confirmDate }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单 ID"
            prop="orderId"
            width="120">
          </el-table-column>
          <el-table-column
            label="收件人"
            prop="receiverName"
            width="120">
          </el-table-column>
          <el-table-column
            label="收件人手机号码"
            prop="receiverPhone"
            width="220">
          </el-table-column>
          <el-table-column
            label="收件人地址"
            sortable
            prop="receiverAddress">
          </el-table-column>
          <el-table-column
            label="状态"
             width="100">
            <template slot-scope="scope">
              <div>
                派件中
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleConfirm(scope.row.orderId)" type="primary" size="small">确认送达</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
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
import DeliverSelect from '@/page/deliver/DeliverSelect'

export default {
  name: 'Deliver',
  components: {DeliverSelect, Message},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      deliverOptions: [],
      allOrderData: [
        // {
        //   carId: '',
        //   userId: '',
        //   maxWeight: '',
        //   residueWeight: '',
        //   level:''
        // }

      ],
      confirmId: ''
    }
  },
  mounted: function () {
    this.getAll()
    this.getDeliver()
  },
  methods: {
    // 获取仓库的配送的订单
    getAll: async function () {
      this.loading = true
      let orderBrief = {'keyword': this.searchWord}
      let data = await getData.getData.get('/order/getDelivering', orderBrief)
      this.loading = false
      this.allOrderData = data['orderData']
    },
    orderFinish: async function () {
      let data = await getData.getData.post('/order/finish', {'orderId': this.confirmId})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.confirmId = []
    },
    handleSearchChange () {
      this.$router.push(this.$route.path)
      this.getAll()
    },
    handleConfirm (value) {
      this.confirmId = value
      this.open()
    },
    open () {
      if (this.confirmId !== '') {
        this.$confirm('此操作将确认将货物送达客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.orderFinish()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择订单'
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-table .el-form .el-form-item{
    width: 49%;
    display: inline-block;
  }
</style>
