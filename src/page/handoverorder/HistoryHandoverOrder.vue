<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入交接单编号"
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
          :data="handoverOrderData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  class="demo-table-expand">
                <el-form-item label="出库单号:" v-for='value in scope.row.orderDetial' v-bind:key="value">
                  {{value}}
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="交接单ID"
            prop="handoverOrderId">
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
  name: 'HistoryHanoverOrder',
  components: {Pagination, Message},
  data () {
    return {
      loading: true,
      searchWord: '',
      handoverOrderData: []
    }
  },
  mounted: function () {
    this.getAll()
  },
  methods: {
    // 获取仓库的入库单
    getAll: async function () {
      let page = this.$route.query.page
      this.loading = true
      let orderBrief = {'keyword': this.searchWord, 'page': page}
      let data = await getData.getData.get('/order/getHistoryHandover', orderBrief)
      this.loading = false
      this.handoverOrderData = data['handoverOrderData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
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
