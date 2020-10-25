<template>
  <div class="parentDiv" >

    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">Cursos disponibles</div>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(course,index) in allCourses" :key="index" :title="course.grade + course.letter" :name="index">
        <course :id="course.id" :index="index" :name="course.grade + course.letter"/>
        <deleteCourse :id="course.id" :course="course.grade + course.letter" @deleted="reload"/>
      </el-collapse-item>
    </el-collapse>

    <addCourse style="margin-top: 10px;"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Course from './specificCourse'
import AddCourse from './addCourseForm'
import DeleteCourse from './deleteCourse'

export default {
  name: 'Courses',
  components: { Course, AddCourse, DeleteCourse },
  data() {
    return {
      allCourses: [],
      triggers: [false],
      activeName: '1'
    }
  },
  apollo: {
    allCourses: {
      query: gql`
        query{
          allCourses{
            id
            grade
            letter
          }
        }`
    }
  },
  methods: {
    reload(){
      this.$apollo.queries.allCourses.refetch()
    }
  }

}
</script>

<style lang="scss" scoped>
.parentDiv{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
}
</style>
