<template>
  <el-container>
    <!-- 顶部容器：提供一个课程查询框 -->
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">学期</template>
          <el-menu-item
            index="2-1"
            @click="
              yearCourse('2022-2');
              shows('term');
            "
            >2022年第二学期</el-menu-item
          >
          <el-menu-item
            index="2-2"
            @click="
              yearCourse('2022-1');
              shows('term');
            "
            >2022年第一学期</el-menu-item
          >
          <el-menu-item
            index="2-3"
            @click="
              yearCourse('2021-2');
              shows('term');
            "
            >2021年第二学期</el-menu-item
          >
          <el-menu-item
            index="2-4"
            @click="
              yearCourse('2021-1');
              shows('term');
            "
            >2021年第一学期</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">教学周</template>
          <el-menu-item
            index="2-1"
            @click="
              weekCourse('1');
              shows('week');
            "
            >第一周</el-menu-item
          >
          <el-menu-item
            index="2-2"
            @click="
              weekCourse('2');
              shows('week');
            "
            >第二周</el-menu-item
          >
          <el-menu-item
            index="2-3"
            @click="
              weekCourse('3');
              shows('week');
            "
            >第三周</el-menu-item
          >
          <el-menu-item
            index="2-4"
            @click="
              weekCourse('4');
              shows('week');
            "
            >第四周</el-menu-item
          >
          <el-menu-item
            index="2-5"
            @click="
              weekCourse('5');
              shows('week');
            "
            >第五周</el-menu-item
          >
          <el-menu-item
            index="2-6"
            @click="
              weekCourse('6');
              shows('week');
            "
            >第六周</el-menu-item
          >
          <el-menu-item
            index="2-7"
            @click="
              weekCourse('7');
              shows('week');
            "
            >第七周</el-menu-item
          >
          <el-menu-item
            index="2-8"
            @click="
              weekCourse('8');
              shows('week');
            "
            >第八周</el-menu-item
          >
          <el-menu-item
            index="2-9"
            @click="
              weekCourse('9');
              shows('week');
            "
            >第九周</el-menu-item
          >
          <el-menu-item
            index="2-10"
            @click="
              weekCourse('10');
              shows('week');
            "
            >第十周</el-menu-item
          >
          <el-menu-item
            index="2-11"
            @click="
              weekCourse('11');
              shows('week');
            "
            >第十一周</el-menu-item
          >
          <el-menu-item
            index="2-12"
            @click="
              weekCourse('12');
              shows('week');
            "
            >第十二周</el-menu-item
          >
          <el-menu-item
            index="2-13"
            @click="
              weekCourse('13');
              shows('week');
            "
            >第十三周</el-menu-item
          >
          <el-menu-item
            index="2-14"
            @click="
              weekCourse('14');
              shows('week');
            "
            >第十四周</el-menu-item
          >
          <el-menu-item
            index="2-15"
            @click="
              weekCourse('15');
              shows('week');
            "
            >第十五周</el-menu-item
          >
          <el-menu-item
            index="2-16"
            @click="
              weekCourse('16');
              shows('week');
            "
            >第十六周</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-header>

    <el-main style="height: 100%">
      <el-empty
        v-if="isEmpty === true"
        description="课表空空的"
        style="height: 100%"
      ></el-empty>
      <el-table
        v-if="isEmpty === false"
        :data="tableData"
        style="width: 100%; height: 100%"
        :row-style="{ height: '122px' }"
        :cell-style="{ textAlign: 'center' }"
        :cell-class-name="tableRowClassName"
        @cell-click="open"
        border
      >
        <el-table-column prop="time" width="112"></el-table-column>
        <el-table-column
          prop="Monday"
          label="周一"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Monday"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="Tuesday"
          label="周二"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Tuesday"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="Wednesday"
          label="周三"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Wednesday"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="Thursday"
          label="周四"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Thursday"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="Friday"
          label="周五"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Friday"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="Saturday"
          label="周六"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Saturday"></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="Sunday"
          label="周日"
          width="150"
          header-align="center"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.Sunday"></span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ClassSchedule',
  props: ['sendCourse'],
  data () {
    return {
      isEmpty: false,
      term: '2022-2',
      week: '16',
      show: 'term',
      thisTermCourse: [],
      totalCourse: [],
      term20222: [],
      term20221: [],
      term20212: [],
      term20211: []
    }
  },
  methods: {
    yearCourse (term) {
      this.term = term
      if (term === '2022-2') this.thisTermCourse = this.term20222
      else if (term === '2022-1') this.thisTermCourse = this.term20221
      else if (term === '2021-2') this.thisTermCourse = this.term20212
      else if (term === '2021-1') this.thisTermCourse = this.term20211
      this.isEmpty = this.thisTermCourse.length === 0
    },
    weekCourse (week) {
      this.week = week
    },
    shows (str) {
      this.show = str
    },
    tableRowClassName ({row, column, rowIndex, columnIndex}) {
      row.index = rowIndex
      column.index = columnIndex
    },
    open (row, column) {
      // console.log(row.index,column.index,cell,event)
      if (column.label) {
        let dayweek = column.label.replace('周', '星期')
        if (dayweek === '星期日') dayweek = '星期天'
        for (let i in this.thisTermCourse) {
          if (this.thisTermCourse[i].ctimeslot === (row.index + 1) && this.thisTermCourse[i].ctime.indexOf(dayweek) !== -1) {
            let totalInformations
            if (this.show === 'term') {
              totalInformations = '课程号：' + this.thisTermCourse[i].cno + '<br/>课程名：' + this.thisTermCourse[i].cname +
                                            '<br/>上课时间：' + this.thisTermCourse[i].ctime.replace(':', ' ') +
                                            '<br/>课程教室：' + this.thisTermCourse[i].cclassroom +
                                            '<br/>起止时间：第' + this.thisTermCourse[i].cstartweek + '周 ~ 第' + this.thisTermCourse[i].cendweek + '周' +
                                            '<br/>学时：' + this.thisTermCourse[i].chours + '学时'
            } else {
              totalInformations = '课程号：' + this.thisTermCourse[i].cno + '<br/>课程名：' + this.thisTermCourse[i].cname +
                                            '<br/>上课时间：' + this.thisTermCourse[i].ctime.replace(':', ' ') +
                                            '<br/>课程教室：' + this.thisTermCourse[i].cclassroom
            }
            this.$alert(totalInformations, '课程信息', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true
            })
          }
        }
      }
    }
  },
  computed: {
    tableData () {
      const arr = [
        {
          time: '上午第一节'
        },
        {
          time: '上午第二节'
        },
        {
          time: '下午第一节'
        },
        {
          time: '下午第二节'
        },
        {
          time: '晚上'
        }
      ]
      if (this.show === 'term') {
        for (var i in this.thisTermCourse) {
          if (this.thisTermCourse[i].ctime.indexOf('星期一') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Monday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
          if (this.thisTermCourse[i].ctime.indexOf('星期二') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Tuesday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
          if (this.thisTermCourse[i].ctime.indexOf('星期三') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Wednesday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
          if (this.thisTermCourse[i].ctime.indexOf('星期四') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Thursday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
          if (this.thisTermCourse[i].ctime.indexOf('星期五') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Friday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
          if (this.thisTermCourse[i].ctime.indexOf('星期六') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Saturday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
          if (this.thisTermCourse[i].ctime.indexOf('星期天') !== -1) {
            arr[this.thisTermCourse[i].ctimeslot - 1]['Sunday'] =
              this.thisTermCourse[i].cname +
              '<br/>' +
              this.thisTermCourse[i].cclassroom
          }
        }
      } else if (this.show === 'week') {
        for (var j in this.thisTermCourse) {
          let just =
            this.thisTermCourse[j].cstartweek <= this.week &&
            this.thisTermCourse[j].cendweek >= this.week
          if (this.thisTermCourse[j].ctime.indexOf('星期一') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Monday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
          if (this.thisTermCourse[j].ctime.indexOf('星期二') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Tuesday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
          if (this.thisTermCourse[j].ctime.indexOf('星期三') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Wednesday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
          if (this.thisTermCourse[j].ctime.indexOf('星期四') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Thursday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
          if (this.thisTermCourse[j].ctime.indexOf('星期五') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Friday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
          if (this.thisTermCourse[j].ctime.indexOf('星期六') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Saturday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
          if (this.thisTermCourse[j].ctime.indexOf('星期天') !== -1 && just) {
            arr[this.thisTermCourse[j].ctimeslot - 1]['Sunday'] =
              this.thisTermCourse[j].cname +
              '<br/>' +
              this.thisTermCourse[j].cclassroom
          }
        }
      }
      return arr
    }
  },
  // 第二部分修改：结束
  watch: {
    sendCourse (val) {
      this.totalCourse = val
      this.term20222 = this.totalCourse.filter((p) => {
        return p.cterm === '2021-2022-2'
      })
      this.term20221 = this.totalCourse.filter((p) => {
        return p.cterm === '2021-2022-1'
      })
      this.term20212 = this.totalCourse.filter((p) => {
        return p.cterm === '2020-2021-2'
      })
      this.term20211 = this.totalCourse.filter((p) => {
        return p.cterm === '2020-2021-1'
      })
      this.thisTermCourse = this.term20222
    }
  }
}
</script>
