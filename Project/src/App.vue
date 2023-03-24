<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route (to, from) {
      // 路由发生变化页面刷新
      this.$router.go(0)
    }
  }
}
</script>
