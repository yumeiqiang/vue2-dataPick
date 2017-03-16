<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    return this.$router.push({path:'/home'})
  }
}
</script>

<style scoped>

</style>
