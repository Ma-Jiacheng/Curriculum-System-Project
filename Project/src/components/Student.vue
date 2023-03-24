<template>
  <el-container>
    <el-aside
      style="width: 300px; height: 900px; background-color: rgb(238, 241, 246)"
    >
      <el-row class="tac" id="table">
        <el-col width="300px">
          <h5 id="word">查询系统</h5>
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="informChange = 'message'">
              <i class="el-icon-menu"></i>
              <span slot="title">学生信息查询</span>
            </el-menu-item>

            <el-menu-item index="2" @click="informChange = 'classSchedule'">
              <i class="el-icon-document"></i>
              <span slot="title">学生课表查询</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-button type="danger" id="button" @click="SignOut">退出</el-button>
      </el-row>
    </el-aside>
    <ClassSchedule
      v-show="informChange === 'classSchedule'"
      :sendCourse="totalCourse"
    ></ClassSchedule>
    <Information
      v-show="informChange === 'message'"
      :student="student"
    ></Information>
  </el-container>
</template>

<script>
import axios from 'axios'
import ClassSchedule from '../components/ClassSchedule'
import Information from '../components/StudentInfo'
export default {
  name: 'Student',
  components: {
    ClassSchedule,
    Information
  },
  data () {
    return {
      informChange: 'classSchedule',
      student: '',
      totalCourse: ''
    }
  },
  mounted () {
    this.student = JSON.parse(sessionStorage.getItem('user'))
    axios
      .post('http://localhost:3000/api/user/studentcourses', {
        sno: this.student.sno
      })
      .then((response) => {
        this.totalCourse = Array.from(response.data)
        console.log('查询学生课程信息成功!')
      })
  },
  methods: {
    SignOut () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
#word{
  text-align: center;
  font-size: large;
  font-weight: 600;
}
#button {
  position: relative;
  left: 15%;
  top: 460px;
  width: 200px;
}

html,
body,
#app,
.el-container {
  height: 100%;
}
</style>
