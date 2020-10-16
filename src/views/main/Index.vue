<template>
  <div class="wrap">
    首页
    <button @click="goRouter">去我的消息</button>
  </div>
</template>

<script>
// import axios from '@/configs/axios'
// import SUCCESS from '@/constants/responseCode'
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    goRouter() {
      this.$router.push({
        name: 'Message'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import '~@/scss/pages/activity.scss';
</style>
