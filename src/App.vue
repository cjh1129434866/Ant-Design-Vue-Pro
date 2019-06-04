<template>
  <div id="app">
     <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment";
import "moment/locale/zh-cn" // moment得打包优化，默认式英文包可以不用管，这里把需要得中文包引入进来，就会只打包 中英文包，其他不需要得语言包不会被打包进来。
export default {
  data () {
    return {
      locale: zhCN
    }
  },
  watch: {
    "$route.query.locale" (val) {
      this.locale = val === "enUS" ? enUS : zhCN
      moment.locale(val === "enUS" ? "en" : "zh-cn")
    }
  }
}
</script>


<style lang="less">
</style>
