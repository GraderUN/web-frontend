<template>
    <b-card-body>
        <b-card-text>
          <b-list-group-item  v-for="(student,index) in mockCourseStudents" :key="index">
            <b class="student">{{ student.name +" "+ typeof student}} </b>
            <deleteStudent class="aux" :student="student" :course="name"/>
          </b-list-group-item>
        </b-card-text>
        <addStudent />
    </b-card-body>
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
      courseStudents: null,
      mockCourseStudents: [
      {
        name:'Pepito Perez 1'
      },
      {
        name:'Pepito Perez 2'
      },
      {
        name:'Pepito Perez 3'
      },
      {
        name:'Pepito Perez 4'
      }]
    }
  },
  methods: {
    reload(){
      this.$apollo.queries.allCourses.refetch()
    }
  },}
  /*
  apollo: {
    courseStudents: {
      query: gql`query courseStudents($id: String!){
        courseStudents(id: $id){
          nombre
        }
      }`,
      variables () {
        return {
          id: this.id,
        }
      },
      skip: false
    },
    
  }
}*/
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.parentDiv{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
}

.card{
  border: 2px solid rgb(235, 235, 235);
  padding: 20px;
  border-radius: 10px;
}

.aux{
  position: absolute;
  top: 7.5%;
  left: 90%;
  width: 15%;
}
</style>
