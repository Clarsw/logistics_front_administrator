<template>
  <div class="container-right" >
      <el-steps  align-center direction="vertical" space="100px">
        <el-step v-for="(item) in LineData" v-bind:key="item" :title="item.name" :description="item.address" status="finish"  ></el-step>
      </el-steps>
  </div>
</template>

<script>
import getData from '@/api/getDate'
export default {
  name: 'CarLine',
  data () {
    return {
      LineData: []
    }
  },
  mounted: function () {
    this.getLine()
  },
  methods: {
    async getLine () {
      let data = await getData.getData.get('/car/getLine', '')
      this.LineData = data
      console.log(this.LineData)
    }
    // handleCreateSteps () {
    //   let boxValue = Math.ceil(this.LineData.length / 6)
    //   let box = document.getElementsByClassName('container-right')[0]
    //   for (let i = 0; i < boxValue; i++) {
    //     let elSteps = document.createElement('div')
    //     elSteps.setAttribute('align-center', 'true')
    //     elSteps.setAttribute('class', 'el-steps el-steps--horizontal')
    //     let number = 0
    //     if (i !== boxValue - 1) {
    //       number = 6
    //       console.log(number)
    //     } else {
    //       number = this.LineData.length % 6
    //       console.log(number)
    //     }
    //     for (let j = 0; j < number; j++) {
    //       let elStep = document.createElement('div')
    //       // title="步骤1" description="这是一段很长很长很长的描述性文字"
    //       elStep.setAttribute('class', 'el-step is-horizontal is-center')
    //       elStep.setAttribute('title', '步骤1')
    //       elStep.setAttribute('description', '这是一段很长很长很长的描述性文字')
    //       elSteps.append(elStep)
    //     }
    //     box.append(elSteps)
    //   }
    //   console.log(boxValue)
    // }
    // next () {
    //   if (this.active++ > 7) this.active = 0
    // }
  }
}
</script>

<style scoped>
  .container-right {
    background: white;
    padding: 10px 0px;
    min-height: 638px;
  }
  .el-steps{
    padding: 40px 20px;
  }
  .el-steps--horizontal {
    white-space: normal;
  }
</style>
