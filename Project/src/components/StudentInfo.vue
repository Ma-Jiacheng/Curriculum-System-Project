<template>
    <el-container>
        <el-header id="header">
            <div id="word">学生信息</div>
        </el-header>
        <el-main id="main">
            <el-descriptions  direction="vertical" :column="4" border>
                <el-descriptions-item label="学号">{{student.sno}}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{student.sname}}</el-descriptions-item>
                <el-descriptions-item label="性别">{{student.ssex}}</el-descriptions-item>
                <el-descriptions-item label="年级">{{student.inyear}}</el-descriptions-item>
                <el-descriptions-item label="学院">{{student.sdepartment}}</el-descriptions-item>
                <el-descriptions-item label="专业">{{student.smajor}}</el-descriptions-item>
            </el-descriptions>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'StudentInfo',
  props: ['student']
}
</script>

<style>
#header{
    background-color: rgb(173, 228, 228);
    font-size: x-large;
    font-weight: 700;
    text-align: center;
}
#main{
    position: relative;
    top: 2%;
}
#word{
    position: relative;
    top: 20%;
}
</style>
