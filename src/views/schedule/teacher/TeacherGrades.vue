<template>
  <div class="dashboard-container">
    <el-button @click="click">sfdfsa</el-button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Schedule',
  data() {
    return {
      id: '5f8e5d11090c20a6b6feef3d',
      allCourses: [],
      subjectId: 0,
      courseById: [],
      tableData: [{
        id: '50',
        materia: 'Matematicas',
        profesor: 'Carlos',
        horario: 'Lunes y miercoles de 6pm a 9pm'
      }, {
        id: '51',
        materia: 'Matematicas',
        profesor: 'Carlos',
        horario: 'Lunes y miercoles de 6pm a 9pm'
      }, {
        id: '52',
        materia: 'Matematicas',
        profesor: 'Carlos',
        horario: 'Lunes y miercoles de 6pm a 9pm'
      }, {
        id: '53',
        materia: 'Matematicas',
        profesor: 'Carlos',
        horario: 'Lunes y miercoles de 6pm a 9pm'
      }]
    }
  },
  apollo: {
    courseById: {
      query: gql`query courseById($id: String!){
        courseById(id: $id){
          id_students
        }
      }`,
      variables() {
        return {
          id: this.id
        }
      },
      skip: false
    }
  },
  methods: {
    click() {
      console.log(JSON.parse(JSON.stringify(this.courseById.id_students)))
      this.$router.push('/schedule/EditStudentGrades')
    },
    handleClick(table) {
      this.subjectId = table.id
      this.$store.commit('change', this.subjectId)
      this.$router.push('/schedule/teacher')
    }
  }

}
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
</style>
