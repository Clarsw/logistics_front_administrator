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
  name: 'Driver',
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
          data: ['一月', '二月', '三月', '四月', '五月', '六月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330],
          type: 'line'
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
