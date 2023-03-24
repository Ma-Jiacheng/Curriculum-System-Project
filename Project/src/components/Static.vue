<template>
  <div>
    <h1 id="title">选课情况统计</h1>
    <div
      id="dev-month"
      :style="{ width: '1200px', height: '650px', fontSize: '25px' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Static',
  props: ['AllStudent', 'AllStudentCourse'],
  data () {
    return {
      data: []
    }
  },
  watch: {
    AllStudentCourse (val) {
      if (val.length === this.AllStudent.length) {
        console.log(val)
        this.GetData()
        this.GetChart()
      }
    }
  },
  methods: {
    GetData () {
      // 统计每个课程选课人数
      var coursenum = []
      for (var i in this.AllStudentCourse) {
        var courses = this.AllStudentCourse[i]
        courses.forEach((c) => {
          coursenum[c.cname] = coursenum[c.cname] ? ++coursenum[c.cname] : 1
        })
      }
      let key = Object.keys(coursenum)
      let value = Object.values(coursenum)
      let result = []
      for (let i = 0; i < key.length; i++) {
        let item = [key[i], value[i]]
        result.push(item)
      }
      this.data[0] = result
    },
    GetChart () {
      let data = this.data[0]
      let chart1 = this.echarts.init(document.getElementById('dev-month'))
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        dataset: {
          source: data
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          dimeosions: 0
        },
        series: [
          {
            color: '#9a60b4',
            name: '选课人数',
            type: 'bar',
            dimensions: 1
          }
        ]
      }
      chart1.setOption(option)
    }
  }
}
</script>

<style scoped>
#title{
  text-align: center;
  font-size: larger;
}
</style>
