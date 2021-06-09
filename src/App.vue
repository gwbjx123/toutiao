<template>
  <div id="app">
    <!-- <h1>模仿今日头条</h1>
    <van-button>我是按钮</van-button> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
body{
  background:#fff;
  .card {
    width:96%;
    background:#fff;
    border:1px solid rgb(216, 214, 214);
    margin:10px auto;
    border-radius: 8px;
    overflow: hidden;
  }
  .bold{
    font-weight: bold
  }
}
</style>
