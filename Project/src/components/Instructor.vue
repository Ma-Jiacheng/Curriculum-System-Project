<template>
  <el-container style="height: 100%">
    <el-aside
      style="width: 250px; height: 750px; background-color: rgb(238, 241, 246)"
    >
      <el-row>
        <el-col>
          <h5 id="title">查询系统</h5>
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="informChange = 'studentlist'">
              <i class="el-icon-menu"></i>
              <span slot="title">学生名单</span>
            </el-menu-item>
            <el-menu-item index="2" @click="informChange = 'static'">
              <i class="el-icon-document"></i>
              <span slot="title">统计信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
          <el-button type="danger" id="button" @click="SignOut">退出</el-button>
      </el-row>
    </el-aside>
    <el-container style="height: 100%">
      <el-main>
        <Static
          :AllStudentCourse="AllStudentCourse"
          :AllStudent='ManageStudent'
          v-show="informChange === 'static'"
        ></Static>
        <div>
          <StudentList
            :StudentCourses="StudentCourses"
            :sendstudents="ManageStudent"
            v-show="informChange === 'studentlist'"
          ></StudentList>
          <div v-show="informChange === 'classschedule'">
            <el-button @click="informChange = 'studentlist'">返回</el-button>
            <el-button>{{ student.sno }}</el-button>
            <el-button>{{ student.sname }}</el-button>
            <ClassSchedule :sendCourse="totalCourse"> </ClassSchedule>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import StudentList from '../components/StudentList'
import Static from '../components/Static.vue'
import ClassSchedule from '../components/ClassSchedule'
export default {
  name: 'Instructor',
  components: {
    StudentList,
    Static,
    ClassSchedule
  },
  data () {
    return {
      totalCourse: '',
      instructor: '',
      ManageStudent: '',
      informChange: 'studentlist',
      student: '',
      AllStudentCourse: [],
      AllStudentBusyTime: []
    }
  },
  mounted () {
    this.instructor = JSON.parse(sessionStorage.getItem('user'))
    // 获取管理的学生信息
    axios
      .post('http://localhost:3000/api/user/instructorstudents', {
        tno: this.instructor.tno
      })
      .then((response) => {
        console.log(response)
        this.ManageStudent = Array.from(response.data)
        // 获取管理学生的课程信息
        var AllStudentCourse = []
        for (var i in this.ManageStudent) {
          var student = this.ManageStudent[i]
          axios
            .post('http://localhost:3000/api/user/studentcourses', {
              sno: student.sno
            })
            .then((response) => {
              AllStudentCourse.push(Array.from(response.data))
            })
        }
        this.AllStudentCourse = AllStudentCourse

        // 获取管理学生的上课时间段信息
        var AllStudentBusyTime = []
        for (var k in this.ManageStudent) {
          var stu = this.ManageStudent[k]
          axios
            .post('http://localhost:3000/api/user/studenttermbusytime', {
              sno: stu.sno,
              cterm: '2021-2022-2'
            })
            .then((response) => {
              AllStudentBusyTime.push(Array.from(response.data))
            })
        }
        this.AllStudentBusyTime = AllStudentBusyTime
        console.log('查询辅导员管理学生信息成功!')
      })
  },
  methods: {
    // 查询学生课程
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
      this.informChange = 'classschedule'
    },
    SignOut () {
      this.$router.push({path: '/'})
    }
  }
}
</script>
<style>
#title{
  text-align: center;
  font-size: x-large;
  font-weight: 600;
}
#button {
  position: relative;
  left: 14%;
  top: 460px;
  width: 180px;
}
</style>
