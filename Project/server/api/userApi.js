// api路由
// userApi.js —— 测试用 API 示例

var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap.js')
// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()

// 增加用户接口

// 登录
router.post('/register', (req, res) => {
  var user = req.body.user
  var sqlsentense
  // 传入登录信息，包括type,.id,password
  if (user.type === 'student') {
    sqlsentense = $sql.register.Student
  } else if (user.type === 'teacher') {
    sqlsentense = $sql.register.Teacher
  }
  conn.query(sqlsentense, [user.id, user.password], function (err, row) {
    if (err) {
      console.log(err)
    }
    if (row.length === 1) {
      let data = JSON.stringify(row[0])
      res.send({
        success: true,
        data: data
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})

// 所有学生列表
router.get('/allstudents', (req, res) => {
  conn.query($sql.select.AllStudents, function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})

// 所有老师列表
router.get('/allteachers', (req, res) => {
  conn.query($sql.select.AllTeachers, function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})

// 所有课程列表
router.get('/allcourses', (req, res) => {
  conn.query($sql.select.AllCourses, function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})

// 选择某一课程学生
router.post('/coursestudents', (req, res) => {
  // 传入课程号
  var cno = req.body.cno
  conn.query($sql.select.CourseStudents, [cno], function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})
// 选择某个辅导员管理学生
router.post('/instructorstudents', (req, res) => {
  // 传入辅导员工号
  var tno = req.body.tno
  conn.query($sql.select.InstructorStudents, [tno], function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})

// 某一学生所有课程
router.post('/studentcourses', (req, res) => {
  var sno = req.body.sno
  conn.query($sql.select.StudentCourses, [sno], function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})
// 某一教师所有课程
router.post('/teachercourses', (req, res) => {
  var tno = req.body.tno
  conn.query($sql.select.TeacherCourses, [tno], function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})

// 查询某个学生某个学期有课时间段
router.post('/studenttermbusytime', (req, res) => {
  var sno = req.body.sno
  var cterm = req.body.cterm
  conn.query($sql.select.StudentTermBusyTime, [sno, cterm], function (err, row) {
    if (err) {
      console.log(err)
    }
    let data = JSON.stringify(row)
    res.end(data)
  })
})

module.exports = router
