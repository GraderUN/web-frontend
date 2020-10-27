<template>
  <div class="dashboard-container">
    <h2>Id curso: {{ $store.state.idMateria }}</h2>
    <el-table
      :data="getsubjects"
      style="width: 100%"
    >
      <el-table-column label="ID Nota" prop="notasId" width="100" align="center" />
      <el-table-column label="ID estudiante" prop="notasIdEstudiante" width="200" align="center" />
      <el-table-column label="Tipo Nota" prop="tipoNotasNombre" width="400" align="center" />
      <el-table-column label="Valor" prop="notasValor" width="80" align="center" />
      <el-table-column label="Porcentaje" prop="notasPorcentaje" width="100" align="center" />
      <el-table-column label="Periodo" prop="notasPeriodo" width="100" align="center" />
      <el-table-column label="Comentarios" prop="notasComentarios" align="center" />
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'StudentGrades',
  data() {
    return {
      form: {
        estudianteId: 11,
        claseId: ''
      },
      getsubjects: [],
      materiaId: 0,
      contenido: 'Aqui va el contenido de la materia'
    }
  },
  mounted() {
    this.assignClase()
    this.showNotas()
  },
  methods: {
    assignClase() {
      this.form.claseId = this.$store.state.idClase
    },
    handleClick() {
      this.showNotas()
    },
    async showNotas() {
      await this.$apollo.query({
        query: gql`
        query ($datosEstudianteClase: datosEstudianteClase!) {
            NotasEstudianteClase(datosEstudianteClase: $datosEstudianteClase){
                notasId
                notasIdEstudiante
                notastipoNotasId
                notasValor
                notasPorcentaje
                notasPeriodo
                notasComentarios
                tipoNotasId
                tipoNotasNombre
                tipoNotasIdClase
            }
        }`,
        variables: {
          datosEstudianteClase: this.form
        }
      }).then(resolve => {
        this.getsubjects = resolve
        console.log(this.getsubjects)
        this.getsubjects = this.getsubjects.data.NotasEstudianteClase
      }).catch((error) => {
        console.error(error)
      })
    }
  }
  /*  apollo: {
    getSubjects: {
      query: gql`
      query($datosEstudianteClase: datosEstudianteClase!){
        NotasEstudianteClase( datosEstudianteClase: $datosEstudianteClase){
          notasId,
          notasIdEstudiante,
          notastipoNotasId,
          notasValor,
          notasPorcentaje,
          notasPeriodo,
          notasComentarios,
          tipoNotasId,
          tipoNotasNombre,
          tipoNotasIdClase
        }
      }`
    },
    variables: {
      datosEstudianteClase: this.form
    }
  }*/

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
