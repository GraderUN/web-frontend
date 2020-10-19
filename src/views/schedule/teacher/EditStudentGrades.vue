<template>
  <div class="dashboard-container">
    <el-table
      :data="tableNotas"
      style="width: 100%"
    >
      <el-table-column label="ID Nota" width="100" align="center" prop="idNota" />
      <el-table-column label="ID estudiante" width="200" align="center" prop="idEstudiante" />
      <el-table-column label="Tipo Nota" width="400" align="center" prop="tipoNota" />
      <el-table-column label="Valor" width="80" align="center" prop="valor" />
      <el-table-column label="Porcentaje" width="100" align="center" prop="porcentaje" />
      <el-table-column label="Periodo" width="100" align="center" prop="periodo" />
      <el-table-column label="Comentarios" align="center" prop="comentarios" />
      <el-table-column label="Ver materia" align="center">
        <el-button type="text" size="small" @click="handleClick">Editar nota</el-button>
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
      tableNotas: [{
        idNota: '132456',
        idEstudiante: '132456',
        tipoNota: 'Parcial I',
        valor: '50',
        porcentaje: '35%',
        periodo: '1',
        comentarios: 'Periodo 1'
      }, {
        idNota: '132457',
        idEstudiante: '132456',
        tipoNota: 'Parcial II',
        valor: '50',
        porcentaje: '35%',
        periodo: '2',
        comentarios: 'Periodo 1'
      }, {
        idNota: '132458',
        idEstudiante: '132456',
        tipoNota: 'Parcial III',
        valor: '50',
        porcentaje: '35%',
        periodo: '3',
        comentarios: 'Periodo 1'
      }, {
        idNota: '132459',
        idEstudiante: '132456',
        tipoNota: 'Parcial IV',
        valor: '50',
        porcentaje: '35%',
        periodo: '4',
        comentarios: 'Periodo 1'
      }],
      contenido: 'Contenido de la materiaaaaaaaa'
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
