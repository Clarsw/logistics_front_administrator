<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    :current-page="current"
    :pager-count="5"
    layout="prev, pager, next"
    :total="totalPage">
  </el-pagination>
</template>
<script>
export default {
  name: 'Pagination',
  data () {
    return {
      totalPage: 0,
      current: Number(this.$route.query.page)
    }
  },
  mounted () {
    if (window.history && window.history.pushState) { // 监听浏览器回退或前进点击事件
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed () { // 释放浏览器回退或前进按钮点击事件
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    handleCurrentChange (page) {
      this.current = page
      this.$router.push(this.$route.path + '?page=' + this.current + '')
      this.$parent.getAll()
    },
    goBack () {
      this.current = Number(this.$route.query.page)
      if (this.$route.query.page) {
        this.$parent.getAll()
      }
    },
    parentSelectChange () {
      this.current = Number(this.$route.query.page)
    }
  }
}
</script>

<style scoped>

</style>
