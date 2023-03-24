<template>
  <div class="studentlist">
  <h1>课程列表组件</h1>
    <h2>课程列表</h2>
    <input type="text" placeholder="请输入课程号/学号" v-model='keyword'>
    <el-table :data="showcourses" stripe border style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column
        v-for="k in Object.keys(courseKeys)"
        :prop="k"
        :key="k"
        :label="courseKeys[k]"
      ></el-table-column>
      <el-table-column><el-button>选课学生</el-button></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  data: function () {
    return {
      courseKeys: {
        cno: '课程号',
        cname: '课程名',
        cterm: '学期',
        chours: '学时',
        ccredit: '学分',
        cstartweek: '开始周',
        cendweek: '结束周',
        cclassroom: '教室',
        ctime: '上课时间',
        ctimeslot: '时间段编号', // 1（1-2节），2（3-4节或3-5节），3（6-7节或6-8节），4（8-9节），5（10-11节或10-12节）
        tno: '教师号'
      },
      courses: [
        {
          cno: 2021020001,
          cname: '高等数学A2',
          cterm: '2020-2021-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北206',
          ctime: '星期三:3-5节',
          ctimeslot: 2,
          tno: 201505001
        },
        {
          cno: 2021020002,
          cname: '高等数学A2',
          cterm: '2020-2021-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北304',
          ctime: '星期三:6-8节',
          ctimeslot: 3,
          tno: 201505002
        },
        {
          cno: 2021020003,
          cname: '大学物理1',
          cterm: '2020-2021-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教南207',
          ctime: '星期二:3-5节',
          ctimeslot: 2,
          tno: 201505002
        },
        {
          cno: 2021020004,
          cname: '大学物理1',
          cterm: '2020-2021-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北304',
          ctime: '星期五:6-8节',
          ctimeslot: 3,
          tno: 201505001
        },
        {
          cno: 2021020005,
          cname: '面向对象程序设计',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北118',
          ctime: '星期四:1-2节',
          ctimeslot: 1,
          tno: 201703001
        },
        {
          cno: 2021020006,
          cname: '面向对象程序设计',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教北220A',
          ctime: '星期四:3-4节',
          ctimeslot: 2,
          tno: 200403002
        },
        {
          cno: 2021020007,
          cname: '形势与政策',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '12教北120',
          ctime: '星期二:6-7节',
          ctimeslot: 3,
          tno: 200006002
        },
        {
          cno: 2021020008,
          cname: '形势与政策',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北302',
          ctime: '星期二:6-7节',
          ctimeslot: 3,
          tno: 200006001
        },
        {
          cno: 2021020009,
          cname: '大学英语精读',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北120',
          ctime: '星期五:3-4节',
          ctimeslot: 2,
          tno: 200202002
        },
        {
          cno: 2021020010,
          cname: '大学英语精读',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '12教北302',
          ctime: '星期四:6-8节',
          ctimeslot: 3,
          tno: 200202002
        },
        {
          cno: 2021020011,
          cname: '离散数学',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北120',
          ctime: '星期三:10-11节',
          ctimeslot: 5,
          tno: 201703001
        },
        {
          cno: 2021020012,
          cname: '离散数学',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '7教北302',
          ctime: '星期三:10-11节',
          ctimeslot: 5,
          tno: 201203003
        },
        {
          cno: 2021020013,
          cname: '高等数学A2',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北320',
          ctime: '星期四:10-11节',
          ctimeslot: 5,
          tno: 201505002
        },
        {
          cno: 2021020014,
          cname: '高等数学A2',
          cterm: '2020-2021-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北302',
          ctime: '星期四:10-11节',
          ctimeslot: 5,
          tno: 201505001
        },
        {
          cno: 2022010001,
          cname: '大学物理2',
          cterm: '2021-2022-1',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北206',
          ctime: '星期一:3-5节',
          ctimeslot: 2,
          tno: 201505001
        },
        {
          cno: 2022010002,
          cname: '大学物理2',
          cterm: '2021-2022-1',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北304',
          ctime: '星期一:6-8节',
          ctimeslot: 3,
          tno: 201505002
        },
        {
          cno: 2022010003,
          cname: '数据结构',
          cterm: '2021-2022-1',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教南207',
          ctime: '星期二:6-8节',
          ctimeslot: 3,
          tno: 201703001
        },
        {
          cno: 2022010004,
          cname: '数据结构',
          cterm: '2021-2022-1',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北304',
          ctime: '星期五:6-8节',
          ctimeslot: 3,
          tno: 200403002
        },
        {
          cno: 2022010005,
          cname: '数字电路设计',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北118',
          ctime: '星期三:1-2节',
          ctimeslot: 1,
          tno: 200504001
        },
        {
          cno: 2022010006,
          cname: '数字电路设计',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教北220A',
          ctime: '星期三:3-4节',
          ctimeslot: 2,
          tno: 201504002
        },
        {
          cno: 2022010007,
          cname: '形势与政策',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '12教北120',
          ctime: '星期三:6-7节',
          ctimeslot: 3,
          tno: 200006001
        },
        {
          cno: 2022010008,
          cname: '形势与政策',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北302',
          ctime: '星期三:6-7节',
          ctimeslot: 3,
          tno: 200006002
        },
        {
          cno: 2022010009,
          cname: '数据结构课程实践',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北120',
          ctime: '星期五:3-5节',
          ctimeslot: 2,
          tno: 200403002
        },
        {
          cno: 2022010010,
          cname: '数据结构课程实践',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '12教北302',
          ctime: '星期五:1-2节',
          ctimeslot: 3,
          tno: 201703001
        },
        {
          cno: 2022010011,
          cname: '创新实践1',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北120',
          ctime: '星期四:3-4节',
          ctimeslot: 2,
          tno: 201503004
        },
        {
          cno: 2022010012,
          cname: '创新实践1',
          cterm: '2021-2022-1',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '7教北302',
          ctime: '星期四:6-7节',
          ctimeslot: 3,
          tno: 201203003
        },
        {
          cno: 2022020001,
          cname: '概率论与数理统计',
          cterm: '2021-2022-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北206',
          ctime: '星期一:6-8节',
          ctimeslot: 3,
          tno: 201505002
        },
        {
          cno: 2022020002,
          cname: '概率论与数理统计',
          cterm: '2021-2022-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北304',
          ctime: '星期一:3-5节',
          ctimeslot: 2,
          tno: 201505001
        },
        {
          cno: 2022020003,
          cname: '电路与电子学',
          cterm: '2021-2022-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教南207',
          ctime: '星期二:6-8节',
          ctimeslot: 3,
          tno: 200504001
        },
        {
          cno: 2022020004,
          cname: '电路与电子学',
          cterm: '2021-2022-2',
          chours: 51,
          ccredit: 3,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北304',
          ctime: '星期五:6-8节',
          ctimeslot: 3,
          tno: 201504002
        },
        {
          cno: 2022020005,
          cname: '深度学习',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '12教北116',
          ctime: '星期四:1-2节',
          ctimeslot: 1,
          tno: 201703001
        },
        {
          cno: 2022020006,
          cname: '深度学习',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教北306',
          ctime: '星期三:1-2节',
          ctimeslot: 1,
          tno: 201203003
        },
        {
          cno: 2022020007,
          cname: '编译原理',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '6教北118',
          ctime: '星期三:3-4节',
          ctimeslot: 2,
          tno: 201703001
        },
        {
          cno: 2022020008,
          cname: '编译原理',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 1,
          cendweek: 16,
          cclassroom: '7教北220A',
          ctime: '星期三:3-4节',
          ctimeslot: 2,
          tno: 201203003
        },
        {
          cno: 2022020009,
          cname: '形势与政策',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '12教北120',
          ctime: '星期三:8-9节',
          ctimeslot: 4,
          tno: 200006001
        },
        {
          cno: 2022020010,
          cname: '形势与政策',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北302',
          ctime: '星期三:8-9节',
          ctimeslot: 4,
          tno: 200006002
        },
        {
          cno: 2022020011,
          cname: '数据库系统原理',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北120',
          ctime: '星期五:3-5节',
          ctimeslot: 2,
          tno: 201203003
        },
        {
          cno: 2022020012,
          cname: '数据库系统原理',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '12教北302',
          ctime: '星期五:3-5节',
          ctimeslot: 2,
          tno: 201703001
        },
        {
          cno: 2022020013,
          cname: '人工智能导论',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '6教北120',
          ctime: '星期五:10-11节',
          ctimeslot: 5,
          tno: 201503004
        },
        {
          cno: 2022020014,
          cname: '人工智能导论',
          cterm: '2021-2022-2',
          chours: 34,
          ccredit: 2,
          cstartweek: 6,
          cendweek: 16,
          cclassroom: '7教北302',
          ctime: '星期五:10-11节',
          ctimeslot: 5,
          tno: 201203003
        }
      ],
      keyword: ''
    }
  },
  computed: {
    // 展示数据
    showcourses () {
      if (!this.keyword) return this.courses
      return this.courses.filter((c) => {
        return (
          c.cname.indexOf(this.keyword) !== -1 ||
          (c.cno + '').indexOf(this.keyword) !== -1
        )
      })
    }
  }
}
</script>

<style>
</style>
