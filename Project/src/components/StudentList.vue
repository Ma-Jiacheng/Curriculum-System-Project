<template>
  <div>
    <div v-show="informChange==='studentlist'">
      <h2 id="title">学生列表</h2>
      <!-- <input type="text" placeholder="请输入名字/学号" v-model="keyword"> -->
      <el-table :data="showstudents" stripe border style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column
          v-for="k in Object.keys(studentKeys)"
          :prop="k"
          :key="k"
          :label="studentKeys[k]"
        ></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="keyword" placeholder="学号/姓名"></el-input>
          </template>
          <template slot-scope="scope">
            <el-button @click="SelectStudent(scope.row)">学生课表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ClassSchedule from '../components/ClassSchedule.vue'
export default {
  name: 'StudentList',
  props: ['StudentCourses', 'sendstudents'],
  components: {ClassSchedule},
  data () {
    return {
      studentKeys: {
        sno: '学号',
        sname: '姓名',
        ssex: '性别',
        inyear: '入学年份',
        sdepartment: '学院',
        smajor: '专业'
      },
      keyword: '',
      informChange: 'studentlist',
      studentinfo: ''
    }
  },
  watch: {
    sendstudents (val) {
      if (val) {
        this.students = val
      }
    }
  },
  computed: {
    showstudents () {
      if (!this.sendstudents) return []
      return this.sendstudents.filter((s) => {
        return (
          s.sname.indexOf(this.keyword) !== -1 ||
          (s.sno + '').indexOf(this.keyword) !== -1
        )
      })
    }
  },
  methods: {
    // 调用父组件函数
    SelectStudent (student) {
      this.StudentCourses(student)
    }
  }
}
</script>
<style scoped>
#title{
  text-align: center;
  position: relative;
  top: 0px;
}
</style>
