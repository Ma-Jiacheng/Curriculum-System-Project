<template>
  <div id="background">
    <img src="@/assets/logo.png" class="image" id="logo" />
    <div id="word">课表查询系统</div>
    <div id="login">
      <el-card class="box-card">
        <div id="form">
          <div id="title">用 户 登 录</div>
          <el-tabs v-model="user.type" stretch>
            <el-tab-pane
              label="学生登录"
              name="student"
              id="first"
            ></el-tab-pane>
            <el-tab-pane
              label="教师登录"
              name="teacher"
              id="second"
            ></el-tab-pane>
          </el-tabs>
          <el-input
            prefix-icon="el-icon-user"
            v-model="user.id"
            placeholder=" 学号/工号"
          ></el-input>
          <el-input
            prefix-icon="el-icon-key"
            placeholder=" 密 码"
            v-model="user.password"
            show-password
          ></el-input>
          <el-button id="login-button" type="primary" plain @click="Register"
            >登 录</el-button
          >
          <el-checkbox v-model="remember" id="remember"
            >记住账号和密码</el-checkbox
          >
        </div>
      </el-card>
    </div>
    <div id="clock">
      <div id="time">{{ time }}</div>
      <div id="date">{{ date }}</div>
    </div>
    <div id="copyright">Copyright © 2022 hdu. All Rights Reserved</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      time: '',
      date: '',
      remember: false,
      user: {
        type: 'student',
        id: '',
        password: ''
      }
    }
  },
  watch: {
    'user.type': {
      handler (oldval, newval) {
        if (oldval === localStorage.getItem('usertype')) {
          this.user.id = localStorage.getItem('userid')
          this.user.password = localStorage.getItem('userpassword')
        } else {
          this.user.id = ''
          this.user.password = ''
        }
      }
    }
  },
  mounted () {
    // 上次登录记住的数据
    if (localStorage.getItem('usertype')) {
      this.user.type = localStorage.getItem('usertype')
      this.user.id = localStorage.getItem('userid')
      this.user.password = localStorage.getItem('userpassword')
    }
    this.$nextTick(() => {
      setInterval(this.updata_clock, 1000)
    })
  },
  methods: {
    // 登录
    Register () {
      // 本地存储保存登录信息
      if (this.remember) {
        localStorage.setItem('usertype', this.user.type)
        localStorage.setItem('userid', this.user.id)
        localStorage.setItem('userpassword', this.user.password)
      }
      var path = 'http://localhost:3000/api/user/register'
      axios
        .post(path, {
          user: this.user
        })
        .then((res) => {
          console.log(res)
          // 登录成功
          if (res.data.success) {
            // 保存登录信息
            let data = res.data.data
            sessionStorage.setItem('user', data)
            data = JSON.parse(data)
            if (this.user.type === 'student') {
              this.$router.replace({ path: '/student' })
            } else {
              if (data.instructor === 0) {
                this.$router.push({ path: '/teacher' })
              } else if (data.instructor === 1) {
                this.$router.push({ path: '/instructor' })
              }
            }
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
          } else if (res.data.state !== 1) {
            this.$message({
              message: '账号或密码错误,请重新输入',
              type: 'error'
            })
          }
        })
    }
  },
  updata_clock: function () {
    var d = new Date()
    var year = d.getFullYear()
    if (year < 10) {
      year = '0' + year
    }
    var mon = d.getMonth()
    if (mon < 10) {
      mon = '0' + mon
    }
    var day = d.getDay()
    if (day < 10) {
      day = '0' + day
    }
    var hour = d.getHours()
    if (hour < 10) {
      hour = '0' + hour
    }
    var min = d.getMinutes()
    if (min < 10) {
      min = '0' + min
    }
    this.time = hour + ':' + min
    this.date = year + '/' + mon + '/' + day
  }
}
</script>

<style scoped>
#remember {
  position: relative;
  top: 5px;
  left: 30%;
}
::v-deep .el-tabs__nav-scroll{
  width: 50%!important;
  margin: 0 auto!important;
}

#word{
    position: absolute;
    top: 220px;
    left: 400px;
    font-size: 40px;
    color: rgb(9, 52, 136);
}
#logo{
    position: absolute;
    top: 60px;
    left: 140px;
    width: 600px;
    height: 144px;
}
#background {
  background-image: url("../assets/background.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  background-repeat: no-repeat;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
.box-card {
    width: 480px;
  }
#login{
    position: absolute;
    top: 18%;
    left: 65%;
}
.el-card {
    width: 400px;
    height: 450px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
}
#form{
    padding-top: 20px;
    line-height: 60px;
    padding-left: 15px;
    padding-right: 15px;
}
#copyright{
    color: aliceblue;
    position: absolute;
    top: 95%;
    left: 38%;
}
#login-button{
    width: 330px;
    font-size: large;
    font-weight: 400;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
#title{
  position: relative;
  bottom: 5px;
    text-align: center;
    font-size: xx-large;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
