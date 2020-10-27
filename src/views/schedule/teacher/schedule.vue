<template>
  <div class="dashboard-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column align="center" label="ID Materia" width="100" prop="id" />
      <el-table-column label="Nombre Materia" width="400" align="center" prop="name" />
      <el-table-column label="Profesor" width="400" align="center" prop="teacher" />
      <el-table-column align="center" label="Horario" prop="schedule" />
      <el-table-column label="Ver materia" width="110" align="center">
        <el-button type="text" size="small" @click="handleClick">Ver Estudiantes</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const GET_SUBJECT = gql`
  query{
  studentSubject{
    id
    name
    teacher
    schedule
    }
}
`

export default {
  name: 'Graph',
  data() {
    return {
      allCourses: [],
      tableData: [{
        id: '132456',
        name: 'Matematicas',
        teacher: 'Carlos',
        schedule: 'Lunes y miercoles de 6pm a 9pm'
      }, {
        id: '132456',
        name: 'Matematicas',
        teacher: 'Carlos',
        schedule: 'Lunes y miercoles de 6pm a 9pm'
      }, {
        id: '132456',
        name: 'Matematicas',
        teacher: 'Carlos',
        schedule: 'Lunes y miercoles de 6pm a 9pm'
      }, {
        id: '132456',
        name: 'Matematicas',
        teacher: 'Carlos',
        schedule: 'Lunes y miercoles de 6pm a 9pm'
      }]
    }
  },
  apollo: {
    allCourses: {
      query: GET_SUBJECT
    }
  },
  methods: {
    handleClick() {
      console.log('click')
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
