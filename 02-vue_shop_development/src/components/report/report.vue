<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="myEcharts" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
import Echarts from 'echarts'
import _ from 'lodash'
export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
    }
  },
  created() {},
  async mounted() {
    // 初始化
    var myChart = Echarts.init(document.getElementById('myEcharts'))
    // 准备数据配置项
    const { data: res } = await this.$http.get(`reports/type/1`)
    var option = _.merge(res.data, this.options)
    // 展示数据
    myChart.setOption(option)
  },

  methods: {},
}
</script>

<style lang="less" scoped>
</style>
