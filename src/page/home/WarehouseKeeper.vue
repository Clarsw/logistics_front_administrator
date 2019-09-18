<template>
  <div class="container-right">
    <div class="chart" id="chart" style="width: 100%;height: 658px;" ref="myEchart">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import getData from '@/api/getData'
export default {
  name: 'WarehouseKeeper',
  // props: {
  //   className: {
  //     type: String,
  //     default: 'yourClassName'
  //   },
  //   id: {
  //     type: String,
  //     default: 'yourID'
  //   },
  //   width: {
  //     type: String,
  //     default: '500px'
  //   },
  //   height: {
  //     type: String,
  //     default: '500px'
  //   }
  // },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getOptionsData () {
      // let data = await getData.getData.get('/')
    },
    initChart () {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['配送订单', '入库订单', '派件订单']
        },
        series: [
          {
            name: '仓库订单',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '配送订单'},
              {value: 310, name: '入库订单'},
              {value: 310, name: '派件订单'}
            ]
          }
        ]
      })
    }
  }
}
</script>

<style>
  .container-right{
    color: black;
  }
  .chart{
    background-color: #ffffff;
  }
</style>
