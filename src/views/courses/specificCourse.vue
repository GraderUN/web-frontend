<template>
    <div>
      <el-card v-for="(student,index) in courseStudents" :key="index">
        <div>
          <span style="font-weight:300; font-size:20px; ">{{ student.nombre + " " + student.apellido }} </span>
          <deleteStudent style="float: right; margin-bottom:20px" :student="student" :course="name" @deleted="stundentDeleted"/>
        </div>
      </el-card>
      <addStudent :id="this.id" :update="this.updateAddStudents" style="margin-top:30px;"/>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import AddStudent from './addStudent'
import DeleteStudent from './deleteStudent'

export default {
  name: 'Course',
  components: {AddStudent, DeleteStudent},
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      courseStudents: [],
      updateAddStudents: true
    }
  },
  methods: {
    reload(){
      this.$apollo.queries.courseStudents.refetch()
    },
    stundentDeleted(){
      this.$apollo.queries.courseStudents.refetch()
      this.updateAddStudents = !this.updateAddStudents
    }
  },

  apollo: {
    courseStudents: {
      query: gql`query courseStudents($id: String!){
        courseStudents(id: $id){
          id
          nombre
          apellido
        }
      }`,
      variables () {
        return {
          id: this.id,
        }
      },
      skip: false
    }
  }
}
</script>

<style lang="scss" scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
  }
</style>
