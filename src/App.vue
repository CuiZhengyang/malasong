<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="text/scss" lang="scss">
  @import "./assets/css/common.scss";
  #app {
    min-height: 100%;
    background-size: rem(100);
    background-repeat: no-repeat;
    background-position: 50% 97%;
  }
</style>
