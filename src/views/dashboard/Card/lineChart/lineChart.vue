<template>
  <!--容器-->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from 'echarts'

export default {
  name: '',
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    //配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        type: 'category'
      },
      yAxis: {
        //隐藏y轴
        show: false
      },
      //系列
      series: [
        {
          type: 'line',
          data: [10, 7, 45, 89, 23,52,12,32,45],
          //拐点样式设置
          itemStyle: {
            opacity: 0
          },
          //线条的样式
          lineStyle: {
            color: 'purple'
          },
          //填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          //设置平滑的线
          smooth:true
        }
      ],
      //调试布局
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
