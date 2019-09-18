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
            type="selection"
            width="55">
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
            sortable
            prop="receiverAddress">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div>
                待派件
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-main">
          <div class="function-btn">
            <el-button @click="open1" type="primary">确认派件</el-button>
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
      confirmId: '',
      multipleSelection: [],
      selectOrderId: [],
      selectedOrderId: []
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
      let data = await getData.getData.get('/order/getDelivery', orderBrief)
      this.loading = false
      this.allOrderData = data['orderData']
    },
    getDeliver: async function () {
      let data = await getData.getData.get('/user/getDeliver', '')
      this.deliverOptions = data
      // for (let i = 0; i < this.driverOptions.length; i++) {
      //   this.driverOptions[i].disabled = false
      // }
    },
    orderDeliver: async function (params) {
      let data = await getData.getData.post('/order/deliver', {'orderId': params})
      this.$refs.message.handleShow(data.result)
      if (data.result === true) {
        this.getAll()
      }
      this.selectedOrderId = []
    },
    handleSearchChange () {
      this.$router.push(this.$route.path)
      this.getAll()
    },
    handleConfirm (value) {
      this.confirmId = value
      this.open()
    },
    handleSelectionChange (selection) {
      this.multipleSelection = selection
      this.selectOrderId.length = this.multipleSelection.length
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.selectOrderId[i] = this.multipleSelection[i].orderId
      }
      let selected = []
      for (let i = 0; i < this.selectOrderId.length; i++) {
        // let json = Object()
        // json.userId = this.selectUserId[i]
        // selected.push(json)
        selected.push(this.selectOrderId[i])
      }
      this.selectedOrderId = selected
      console.log(this.selectedOrderId)
      // console.log(JSON.parse(this.selectUserId))
    },
    open () {
      this.index++
      const h = this.$createElement
      this.$msgbox({
        title: '选择配送员',
        message: h(DeliverSelect, {ref: 'myRef', key: this.index}),
        // h(
        // 'p', null, [
        //   h('span', null, '内容可以是 '),
        //   h('div', { style: 'color: teal' }, '')
        // ]),
        orderId: this.selectedOrderId,
        deliverOptions: this.deliverOptions,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            this.$refs.myRef.submitForm('deliverValidateForm')
            let flag = this.$refs.myRef.deliverValidateForm.flag
            if (flag) {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              // setTimeout(() => {
              let result = await this.$refs.myRef.deliverAdjust()
              if (result === true) {
                done()
                this.getAll()
                this.$message({
                  type: 'success',
                  message: '订单分配配送员成功,刷新数据'
                })
              } else {
                done()
                this.$message({
                  type: 'error',
                  message: '分配失败' + result
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
      if (this.selectedOrderId.length !== 0) {
        this.$confirm('此操作将为订单分配派件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.open()
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
