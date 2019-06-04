<template>
  <div style="text-align: center; padding-top: 100px;">
    <IconFont type="icon-icon-404" style="font-size: 100px;"></IconFont> 
    <!-- <img :src="logo" alt="">  -->
    <Logo/>
  </div>
</template>

<script>
// import logo from '@/assets/logo.svg'
import Logo from '@/assets/logo.svg' // 当使用了svg loader之后 这里 就变成了一个函数式组件
export default {
  components: {
    Logo
  }
  // data () {
  //   return {
  //     logo
  //   }
  // }
}
</script>

<style>

</style>
