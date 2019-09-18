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
  name: 'Super',
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
        xAxis: {
          type: 'category',
          data: ['用户', '客户', '订单', '仓库', '车辆']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 110, 130, 120],
          type: 'bar',
          color: '#19A5FA'
        }]
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
