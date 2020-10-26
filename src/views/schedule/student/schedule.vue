<template>
  <div class="dashboard-container">
    <el-table
      ref="scheduleTable"
      :data="assignementsbyStudent"
      style="width: 100%"
    >
      <el-table-column prop="id" align="center" label="Id curso" width="100" />
      <el-table-column prop="materia" label="Nombre Materia" width="400" align="center" />
      <el-table-column prop="profesor" label="Profesor" width="400" align="center" />
      <el-table-column prop="horario" align="center" label="Horario" />
      <el-table-column label="Ver materia" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(assignementsbyStudent[scope.$index])">props</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Schedule',
  data() {
    return {
      id: '11',
      allCourses: [],
      subjectId: 0,
      assignementsbyStudent: [],
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
    assignementsbyStudent: {
      query: gql`query assignementsbyStudent($id: String!){
        assignementsbyStudent(id: $id){
          id
          materia
          salon
          profesor
          horario
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
    handleClick(table) {
      this.subjectId = table.id
      this.$store.commit('change', this.subjectId)
      this.$router.push('/schedule/student')
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
