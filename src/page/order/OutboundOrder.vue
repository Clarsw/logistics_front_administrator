<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入出库单编号"
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
          :data="outboundOrderData"
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
                待确认
              </div>
              <div v-else-if="scope.row.status === 1">
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
import Pagination from '@/components/common/Pagination'
import Message from '@/components/common/Message'

export default {
  name: 'OutboundOrder',
  components: {Pagination, Message},
  data () {
    return {
      loading: true,
      searchWord: '',
      outboundOrderData: [],
      warehouseOption: [],
      statusOption: [{
        value: '0',
        label: '待确认'
      }, {
        value: '1',
        label: '已完成'
      }],
      statusValue: ''
    }
  },
  mounted: function () {
    this.getAll()
  },
  methods: {
    // 获取仓库的出库单
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let orderBrief = {'keyword': this.searchWord, 'status': this.statusValue, 'page': page}
      let data = await getData.getData.get('/order/getOutbound', orderBrief)
      this.loading = false
      this.outboundOrderData = data['outboundOrderData']
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
    width: 30%;
    display: inline-block;
  }
</style>
