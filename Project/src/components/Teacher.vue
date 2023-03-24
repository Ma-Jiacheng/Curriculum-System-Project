<template>
  <el-container style="height: 100%">
    <el-aside
      style="width: 300px; height: 900px; background-color: rgb(238, 241, 246)"
    >
      <el-row class="tac" id="table">
        <el-col width="300px">
          <h5 id="title">查询系统</h5>
          <el-menu default-active="/Teacher" class="el-menu-vertical-demo">
            <el-menu-item index="/Teacher" @click="isShow = 'class'">
              <i class="el-icon-menu"></i>
              <span slot="title">课程查询</span>
            </el-menu-item>
            <el-menu-item index="/Teacher01" @click="isShow = 'student'">
              <i class="el-icon-document"></i>
              <span slot="title">学生信息查询</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-button type="danger" id="button" @click="SignOut">退出</el-button>
      </el-row>
    </el-aside>
    <el-container style="height: 100%" v-if="isShow === 'class'">
      <!-- 顶部容器：提供一个课程查询框 -->
      <el-header>
        <el-button
          type="primary"
          icon="el-icon-message-solid"
          style="background-color: #409eff; border-color: #409eff"
          disabled
          >当日课程</el-button
        >
        <el-button
          class="el-icon-date"
          type="primary"
          style="background-color: #409eff; border-color: #409eff"
          disabled
          >{{ date }}</el-button
        >
        <el-table :data="TodayCourses" border style="width: 100%" id="table2">
          <el-table-column prop="cno" label="课程号" width="180">
          </el-table-column>
          <el-table-column prop="cname" label="课程" width="180">
          </el-table-column>
          <el-table-column prop="ctime" label="上课时间" width="180">
          </el-table-column>
          <el-table-column prop="cclassroom" label="上课地点">
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          icon="el-icon-message-solid"
          id="bt1"
          style="background-color: #409eff; border-color: #409eff"
          disabled
          >全部课程</el-button
        >
        <el-table :data="Courses" border style="width: 100%" id="table1">
          <el-table-column prop="cno" label="课程号" width="180">
          </el-table-column>
          <el-table-column prop="cname" label="课程" width="180">
          </el-table-column>
          <el-table-column prop="ctime" label="上课时间" width="180">
          </el-table-column>
          <el-table-column prop="cclassroom" label="上课地点">
          </el-table-column>
          <el-table-column label="统计信息">
            <template slot-scope="scope">
              <el-button @click="Statistics(scope)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-header>
    </el-container>
    <el-container style="height: 100%" v-if="isShow === 'student'">
      <!-- 顶部容器：提供一个课程查询框 -->
      <el-header>
        <span>课程选择</span>
        <el-select id="select" v-model="value">
          <el-option
            id="a111"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <hr
          style="filter: alpha(opacity=100, finishopacity=0, style=3)"
          width="100%"
          color="blue"
          SIZE="3"
        />
      </el-header>
      <el-main>
        <StudentList
          :StudentCourses="StudentCourses"
          :sendstudents="sendstudents"
        ></StudentList>
      </el-main>
    </el-container>
    <el-container style="height: 100%" v-if="isShow === 'studentcourses'">
      <el-header>
        <el-button @click="isShow = 'student'">返回</el-button>
        <el-button>{{ this.student.sno }}</el-button>
        <el-button>{{ this.student.sname }}</el-button>
      </el-header>
      <el-main>
        <ClassSchedule :sendCourse="totalCourse"> </ClassSchedule>
      </el-main>
    </el-container>
    <el-container style="height: 100%" v-if="isShow === 'freestatic'">
      <el-button @click="isShow = 'class'" style='width:80px' id="bt">返回</el-button>
      <FreeStatic :busyTime='busyTime'></FreeStatic>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import StudentList from '../components/StudentList'
import ClassSchedule from '../components/ClassSchedule'
import FreeStatic from '../components/FreeStatic'
export default {
  name: 'Teacher',
  components: {
    StudentList,
    ClassSchedule,
    FreeStatic
  },
  data () {
    return {
      value: '0',
      isShow: 'class',
      weeknum: '',
      date: '',
      week: '',
      Courses: [],
      busyTime: [],
      AllCourseStudent: [],
      totalCourse: [],
      AllCourseStudentBusyTime: []
    }
  },
  computed: {
    // 今日课程
    TodayCourses () {
      const arr = this.Courses.filter((p) => {
        return (
          p.cstartweek <= this.weeknum &&
          p.cendweek >= this.weeknum &&
          p.ctime.indexOf(this.week) !== -1
        )
      })
      return arr
    },
    // 课程选择框
    options () {
      var opts = []
      for (var i in this.Courses) {
        var course = this.Courses[i]
        opts.push({
          value: i,
          label: course.cname
        })
      }
      return opts
    },
    // 传给子组件的学生列表
    sendstudents () {
      return this.AllCourseStudent[this.value]
    }
  },
  methods: {
    Statistics (scope) {
      this.busyTime = this.AllCourseStudentBusyTime[scope.$index]
      this.isShow = 'freestatic'
    },
    getWeekNum () {
      // 获得当前日期是第几周的方法
      var year = new Date().getFullYear()
      var week = moment(new Date()).format('E') // 获得今天是星期几
      var startweek = moment(new Date(year + '-01-01')).format('E') // 获得今年的1月1号是星期几
      // 今天到1月1号的时间戳之差
      var millisDiff =
        new Date(moment().format('yyyy-MM-DD')).getTime() -
        new Date(year + '-01-01').getTime()
      var days =
        (millisDiff -
          week * (24 * 60 * 60 * 1000) -
          (7 - startweek) * (24 * 60 * 60 * 1000)) /
        86400000
      this.weeknum = days / 7 + 2 - 10
      // 这里加的2代表的是本周和今年1月1号所在的那一周
    },
    getdataTime () {
      let wk = new Date().getDay()
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let weeks = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      this.week = weeks[wk]
      this.date = yy + '.' + mm + '.' + dd + '.' + this.week
    },
    // 传给子组件，返回查看课表的学生信息
    StudentCourses (student) {
      this.student = student
      axios
        .post('http://localhost:3000/api/user/studentcourses', {
          sno: student.sno
        })
        .then((response) => {
          console.log(response)
          this.totalCourse = Array.from(response.data)
        })
      this.isShow = 'studentcourses'
    },
    // 退出返回
    SignOut () {
      this.$router.push({ path: '/' })
    }
  },
  mounted () {
    this.teacher = JSON.parse(sessionStorage.getItem('user'))
    // 获取老师的课程信息
    axios
      .post('http://localhost:3000/api/user/teachercourses', {
        tno: this.teacher.tno
      })
      .then((response) => {
        this.Courses = Array.from(response.data)
        // 获取各个课程下选课学生以及各个课程下选课学生在课程对应学期的有课时间段
        var AllCourseStudent = []
        var AllCourseStudentBusyTime = []
        for (var i in this.Courses) {
          var course = this.Courses[i]
          var students = []
          var cterm = course.cterm
          axios
            .post('http://localhost:3000/api/user/coursestudents', {
              cno: course.cno
            })
            .then((response) => {
              students = Array.from(response.data)
              AllCourseStudent.push(students)
              var StudentBusyTime = []
              for (var h in students) {
                var sno = students[h].sno
                axios
                  .post('http://localhost:3000/api/user/studenttermbusytime', {
                    sno: sno,
                    cterm: cterm
                  })
                  .then((response) => {
                    StudentBusyTime.push(Array.from(response.data))
                  })
              }
              AllCourseStudentBusyTime.push(StudentBusyTime)
            })
        }
        this.AllCourseStudent = AllCourseStudent
        this.AllCourseStudentBusyTime = AllCourseStudentBusyTime
        console.log('查询老师课程信息成功!')
      })
    this.getWeekNum()
    this.getdataTime()
  }
}
</script>

<style scoped>
#bt{
  position: relative;
  top: 2%;
  left: 20px;
}
.el-icon-date {
  position: absolute;
  top: 1%;
  left: 80%;
}
#button {
  position: relative;
  top: 450px;
  width: 200px;
  left: 15%;
}
#title {
  text-align: center;
  font-size: large;
  font-weight: 600;
}
#iconmenu {
  color: #000;
  text-decoration: none;
}
#bt1 {
  position: relative;
  top: 40%;
}
#table1 {
  position: relative;
  top: 48%;
}
#table2 {
  position: relative;
  top: 8%;
}
</style>
