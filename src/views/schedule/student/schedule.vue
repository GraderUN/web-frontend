<template>
  <div class="dashboard-container">
    <el-table
      ref="scheduleTable"
      :data="assignementsbyStudent"
      style="width: 100%"
    >
      <el-table-column prop="id" align="center" label="Id clase" width="100" />
      <el-table-column prop="curso" align="center" label="Id curso" width="100" />
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
      claseId: '',
      cursoId: '',
      subjectId: 0,
      assignementsbyStudent: []
    }
  },
  apollo: {
    assignementsbyStudent: {
      query: gql`query assignementsbyStudent($id: String!){
        assignementsbyStudent(id: $id){
          id
          curso
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
      this.claseId = table.id
      this.$store.commit('changeIdClase', this.claseId)
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
