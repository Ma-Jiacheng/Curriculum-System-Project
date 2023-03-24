import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Student from '../components/Student'
import Teacher from '../components/Teacher'
import Instructor from '../components/Instructor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Login
  },
  {
    path: '/student',
    component: Student
  },
  {
    path: '/teacher',
    component: Teacher
  },
  {
    path: '/instructor',
    component: Instructor
  }
  ]
})
