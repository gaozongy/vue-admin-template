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
        //设置最大值和最小值
        mini:0,
        max:100
      },
      yAxis: {
        //隐藏y轴
        show: false,
        //均分
        type: 'category'
      },
      //系列
      series: [
        {
          type: 'bar',
          data: [78],
          //宽度设置
          barWidth:10,
          color:'yellowgreen',
          //背景颜色设置
          showBackground: true,
          //设置背景颜色
          backgroundStyle:{
            color:'#eee'
          },
          //文本标签设置
          label:{
            show: true,
            //改变文本内容
            formatter:'|',
            //文本标签位置调试
            position:'right'
          }
        }
      ],
      //调试布局
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
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
