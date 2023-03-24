<template>
  <el-container>
    <el-main>
      <h3 style="width: 300px" id="select">学生总人数：{{ this.busyTime.length }}</h3>
      <el-select v-model="thisDayWeek" placeholder="请选择">
        <el-option
          v-for="item in dayChoose"
          :key="item.values"
          :label="item.label"
          :value="item.values"
        >
        </el-option>
      </el-select>
      <div id="main" style="width: 1100px; height: 550px"></div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'FreeStatic',
  props: ['busyTime'],
  data () {
    return {
      thisDayWeek: '星期一',
      dayChoose: [
        {
          values: '星期一',
          label: '星期一'
        },
        {
          values: '星期二',
          label: '星期二'
        },
        {
          values: '星期三',
          label: '星期三'
        },
        {
          values: '星期四',
          label: '星期四'
        },
        {
          values: '星期五',
          label: '星期五'
        },
        {
          values: '星期六',
          label: '星期六'
        },
        {
          values: '星期天',
          label: '星期天'
        }
      ],
      id: ''
    }
  },
  beforeUpdate () {
    // 为了调用this.picture
    this.id = this.picture.id
  },
  mounted () {
    // 为了调用this.picture
    this.id = this.picture.id
  },
  computed: {
    dayWeekFree () {
      let x = this.busyTime.length * 5
      let arr = [x, x, x, x, x, x, x]
      for (let i in this.busyTime) {
        for (let j in this.busyTime[i]) {
          if (this.busyTime[i][j].day === '星期一') arr[0]--
          if (this.busyTime[i][j].day === '星期二') arr[1]--
          if (this.busyTime[i][j].day === '星期三') arr[2]--
          if (this.busyTime[i][j].day === '星期四') arr[3]--
          if (this.busyTime[i][j].day === '星期五') arr[4]--
          if (this.busyTime[i][j].day === '星期六') arr[5]--
          if (this.busyTime[i][j].day === '星期天') arr[6]--
        }
      }
      return arr
    },
    dayBusyTimeChange () {
      let arr = [0, 0, 0, 0, 0]
      for (let i in this.busyTime) {
        for (let j in this.busyTime[i]) {
          if (this.busyTime[i][j].day === this.thisDayWeek) {
            arr[5 - this.busyTime[i][j].ctimeslot]++
          }
        }
      }
      return arr
    },
    dayFreeTimeChange () {
      let x = -this.busyTime.length
      let arr = [x, x, x, x, x]
      for (let i in this.busyTime) {
        for (let j in this.busyTime[i]) {
          if (this.busyTime[i][j].day === this.thisDayWeek) {
            arr[5 - this.busyTime[i][j].ctimeslot]++
          }
        }
      }
      return arr
    },
    picture () {
      let myChart = this.echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            if (!params.length) return ''
            let s = params[0].axisValueLabel + '<br/>'
            for (const iterator of params) {
              // 如果是负数则反转
              let d = iterator.data < 0 ? -iterator.data : iterator.data
              s += iterator.marker + iterator.seriesName + '：' + d + '<br/>'
            }
            return s
          }
        },
        legend: {
          data: ['空闲人数', '有课人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (value) => {
                // 负数取反 显示的就是正数了
                if (value < 0) return -value
                else return value
              }
            },
            min: -parseInt(this.busyTime.length * 1.2),
            max: parseInt(this.busyTime.length * 1.2)
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: [
              '晚上',
              '下午第二节',
              '下午第一节',
              '上午第二节',
              '上午第一节'
            ]
          }
        ],
        series: [
          {
            name: '有课人数',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'right',
              formatter: (value) => {
                // 值都是负数的 所以需要取反一下
                if (value.data === 0) return ''
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: this.dayBusyTimeChange,
            color: '#FF664E'
          },
          {
            name: '空闲人数',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left',
              formatter: (value) => {
                // 值都是负数的 所以需要取反一下
                if (value.data < 0) return -value.data
                else return ''
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: this.dayFreeTimeChange,
            color: 'blue'
          }
        ]
      })
      return myChart
    }
  }
}
</script>

<style scoped>
#select{
  position: absolute;
  top: 20px;
  right: 10px;
}
</style>
