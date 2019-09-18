<template>
  <div class="container-right">
    <div class="search-banner">
      <div class="angle"></div>
      <div class="search-box">
        <template>
          <el-input @keyup.enter.native="handleSearchChange"
                    placeholder="请输入车辆编号"
                    v-model="searchWord"
                    clearable>
          </el-input>
        </template>
        <p class="search-btn" @click="handleSearchChange" >搜索</p>
      </div>
      <div class="select-box">
        <template>
          <div class="select">
            <p class="option-description">等级：</p>
            <el-select v-model="levelValue" clearable placeholder="请选择" @change="handleLevelChange">
              <el-option
                v-for="item in levelOption"
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
          ref="multipleTable"
          :data="allCarData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="carId"
            label="车辆ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="司机ID"
            width="120">
          </el-table-column>
          <el-table-column
            label="等级"
            width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.level === 1">
                跨区域
              </div>
              <div v-else>
                区域内
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="maxWeight"
            label="最大容量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="residueWeight"
            label="剩余容量"
            width="100">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
             <div>
                已废弃
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
  name: 'HistoryCar',
  components: {Pagination},
  data () {
    return {
      index: 1,
      loading: true,
      searchWord: '',
      allCarData: [
        // {
        //   carId: '',
        //   userId: '',
        //   maxWeight: '',
        //   residueWeight: '',
        //   level:''
        // }

      ],
      levelOption: [{
        value: '0',
        label: '区域内'
      }, {
        value: '1',
        label: '跨区域'
      }],
      levelValue: ''
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
      let carBrief = {'keyword': this.searchWord, 'level': this.levelValue, 'page': page}
      let data = await getData.getData.get('/car/getHistoryLocal', carBrief)
      this.loading = false
      console.log(this.loading)
      this.allCarData = data['carData']
      this.$refs.pagination.totalPage = data['totalPage'] * 10
    },
    handleLevelChange (value) {
      this.$router.push(this.$route.path + '?page=1')
      this.$refs.pagination.parentSelectChange()
      this.levelValue = value
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
