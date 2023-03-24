// sql语句
// sqlMap.js——SQL 语句映射文件，供 API 调用
var sqlMap = {
  select: {
    AllStudents: 'select sno,sname,ssex,sdepartment,smajor,inyear from student',
    AllCourses: 'select cno,cname,cterm,chours,ccredit,cstartweek,cendweek,cclassroom,ctime,ctimeslot,tno from course',
    AllTeachers: 'select tno,tname,tdepartment,ttitle from teacher',
    CourseStudents: 'select student.sno,sname,ssex,sdepartment,smajor,inyear from student,selection where selection.sno=student.sno and selection.cno=?',
    StudentCourses: 'select course.cno,cname,cterm,chours,ccredit,cstartweek,cendweek,cclassroom,ctime,ctimeslot,tno from selection,course where course.cno=selection.cno and selection.sno=?',
    TeacherCourses: 'select cno,cname,cterm,chours,ccredit,cstartweek,cendweek,cclassroom,ctime,ctimeslot,tno from course where tno=?',
    InstructorStudents: 'select student.sno,sname,ssex,sdepartment,smajor,inyear from student where tno=?',
    StudentTermBusyTime: 'select day,ctimeslot from busystudent where sno=? and cterm=?'
  },
  register: {
    Teacher: 'select tno,tname,tdepartment,ttitle,instructor from teacher where teacher.tno=? and teacher.tpassword=?',
    Student: 'select sno,sname,ssex,sdepartment,smajor,inyear from student where student.sno=? and student.spassword=?'
  }
}
module.exports = sqlMap
