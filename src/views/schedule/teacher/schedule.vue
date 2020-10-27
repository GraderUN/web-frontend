<template>
  <div class="dashboard-container">
    <el-table
      ref="scheduleTable"
      :data="AssignementsByProfessor"
      style="width: 100%"
    >
      <el-table-column prop="id" align="center" label="Id clase" width="100" />
      <el-table-column prop="materia" label="Nombre Materia" width="400" align="center" />
      <el-table-column prop="salon" label="Profesor" width="400" align="center" />
      <el-table-column prop="horario" align="center" label="Horario" />
      <el-table-column label="Ver materia" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(AssignementsByProfessor[scope.$index])">
            Ver notas curso
          </el-button>
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
      professor: '17',
      allCourses: [],
      claseId: '',
      cursoId: '',
      AssignementsByProfessor: []
    }
  },
  apollo: {
    AssignementsByProfessor: {
      query: gql`query AssignementsByProfessor($professor: String!){
        AssignementsByProfessor(professor: $professor){
          id,
          curso,
          materia,
          salon,
          horario
        }
      }`,
      variables() {
        return {
          professor: this.professor
        }
      },
      skip: false
    }
  },
  methods: {
    handleClick(table) {
      this.claseId = table.id
      this.cursoId = table.curso
      this.$store.commit('changeIdCurso', this.cursoId)
      this.$store.commit('changeIdClase', this.claseId)
      this.$router.push('/schedule/EditStudentGrades')
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
