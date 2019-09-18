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
          @selection-change="handleSelectionChange">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="demo-table-expand">
                <el-form-item label="寄件人手机号码 :">
                  <span>{{ props.row.customerPhone }}</span>
                </el-form-item>
                <el-form-item label="寄件人地址 :">
                  <span>{{ props.row.customerAddress }}</span>
                </el-form-item>
                <el-form-item label="收件人手机号码 :">
                  <span>{{ props.row.receiverPhone }}</span>
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
            label="寄件人"
            prop="customerName"
            width="120">
          </el-table-column>
          <el-table-column
            label="收件人"
            prop="receiverName"
            width="120">
          </el-table-column>
          <el-table-column
            label="收件人地址"
            prop="receiverAddress">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div>
                已完成
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
import Pagination from '@/components/common/Pagination'

export default {
  name: 'Deliver',
  components: {Pagination, Message},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allOrderData: [
        // {
        //   carId: '',
        //   userId: '',
        //   maxWeight: '',
        //   residueWeight: '',
        //   level:''
        // }

      ]
    }
  },
  mounted: function () {
    this.getAll()
    this.getDeliver()
  },
  methods: {
    // 获取仓库的配送的订单
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let orderBrief = {'keyword': this.searchWord, 'page': page}
      let data = await getData.getData.get('/order/getHistoryDeliver', orderBrief)
      this.loading = false
      this.allOrderData = data['orderData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    handleSearchChange () {
      this.$router.push(this.$route.path + '?page=1')
      this.getAll()
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
