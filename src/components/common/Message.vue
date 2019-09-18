<template>
  <div></div>
</template>
<script>
export default {
  name: 'Message',
  methods: {
    handleShow (result) {
      if (result === true) {
        this.$message({
          type: 'success',
          message: '操作成功! 刷新数据'
        })
      } else {
        this.$message({
          type: 'error',
          message: result
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
