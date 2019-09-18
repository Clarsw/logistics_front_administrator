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
        <template>
          <div class="select">
            <p class="option-description">状态：</p>
            <el-select v-model="statusValue" clearable placeholder="请选择" @change="handleLevelChange">
              <el-option
                v-for="item in statusOption"
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
          :data="allOrderData"
          style="width: 100%">
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
                <el-form-item label="收件人地址 :">
                  <span>{{ props.row.receiverAddress }}</span>
                </el-form-item>
                <el-form-item label="物品重量 :">
                  <span>{{ props.row.wareWeight }}</span>
                </el-form-item>
                <el-form-item label="运费 :">
                  <span>{{ props.row.freight }}</span>
                </el-form-item>
                <el-form-item label="寄件时间 :"
                prop="createDate">
                  <span>{{ props.row.createDate | dateFormat}}</span>
                </el-form-item>
                <el-form-item label="收件时间 :"
                prop="confirmDate">
                  <span v-if="props.row.confirmDate!==null"> {{ props.row.confirmDate | dateFormat}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单 ID"
            prop="orderId">
          </el-table-column>
          <el-table-column
            label="寄件人"
            prop="customerName">
          </el-table-column>
          <el-table-column
            label="收件人"
            prop="receiverName">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                待配送
              </div>
              <div v-else-if="scope.row.status === 1">
                配送中
              </div>
              <div v-else-if="scope.row.status === 2">
                订单完成
              </div>
              <div v-else-if="scope.row.status === 3">
                待配送
              </div>
              <div v-else-if="scope.row.status  === 4">
                待入库
              </div>
              <div v-else-if="scope.row.status  === 5">
                待派件
              </div>
              <div v-else-if="scope.row.status  === 6">
                派件中
              </div>
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
// test
import Pagination from '@/components/common/Pagination'
import Message from '@/components/common/Message'

export default {
  name: 'Order',
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

      ],
      statusOption: [{
        value: '0',
        label: '待配送'
      }, {
        value: '1',
        label: '配送中'
      }, {
        value: '4',
        label: '待入库'
      }
      // , {
      //   value: '5',
      //   label: '待派件'
      // }, {
      //   value: '6',
      //   label: '派件中'
      // }
      ],
      statusValue: ''
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
      let orderBrief = {'keyword': this.searchWord, 'status': this.statusValue, 'page': page}
      let data = await getData.getData.get('/order/getLocal', orderBrief)
      this.loading = false
      this.allOrderData = data['orderData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    handleLevelChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.statusValue = value
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

<style scoped>
  .el-table .el-form .el-form-item{
    width: 49%;
    display: inline-block;
  }
</style>
