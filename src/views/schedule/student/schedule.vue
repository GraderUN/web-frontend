<template>
  <div class="dashboard-container">
    <el-button @click="assignements">Pulsar</el-button>
    <el-table
      :data="assignementsbyStudent"
      style="width: 100%"
    >
      <el-table-column prop="id" align="center" label="ID Materia" width="100" />
      <el-table-column prop="materia" label="Nombre Materia" width="400" align="center" />
      <el-table-column prop="profesor" label="Profesor" width="400" align="center" />
      <el-table-column prop="horario" align="center" label="Horario" />
      <el-table-column label="Ver materia" width="110" align="center">
        <el-button type="text" size="small" @click="handleClick">Ver materia</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Graph',
  data() {
    return {
      id: '11',
      allCourses: [],
      assignementsbyStudent: []
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
    assignements() {
      console.log(this.assignementsbyStudent)
    }
  },
  apollo: {
    assignementsbyStudent: {
      query: gql`query assignementsbyStudent($id: String!){
        assignementsbyStudent(id: $id){
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
