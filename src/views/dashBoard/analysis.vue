<template>
  <div>
    {{$t("message")['time']}}
    <a-date-picker/>
    <charts style="height: 400px" :option="chartOption"/>
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>

<script>
import charts from "../../components/chart"
// import axios from "axios"
// import random from "lodash/random"
import { clearInterval } from 'timers';

// 使用 raw-loader插件 对 渲染 echarts得代码 显示在页面 上 
import chartCode from '!!raw-loader!../../components/chart';
export default {
  components: {
    charts
  },
  data () {
    return {
      chartOption: {},
      chartCode
    }
  },
  mounted () {
    this.getChartData()
    this.interval = setInterval(() => {
      this.getChartData()
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100))
      // // 采用下面这种重新赋值得方式 替代 深度 监听，提升性能
      // this.chartOption = { ...this.chartOption }
    }, 3000)
  },
  methods: {
    getChartData() {
      this.axios({
        url: "/api/dashboard/chart",
        method: 'get',
        params: {ID: 12345}
      }).then(res => {
        this.chartOption = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: res.data
          }]
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style>

</style>
