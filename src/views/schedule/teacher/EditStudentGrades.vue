<template>
  <div class="dashboard-container">
    <el-form ref="createNota" :model="student" label-width="120px">
      <el-form-item label="Estudiante">
        <el-select v-model="value" placeholder="Select">
          <el-option v-for="item in courseById.id_students" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="changeEstudent">Ver Notas</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="getsubjects"
      style="width: 100%"
    >
      <el-table-column label="ID Nota" prop="notasId" width="100" align="center" />
      <el-table-column label="ID estudiante" prop="notasIdEstudiante" width="200" align="center" />
      <el-table-column label="Tipo Nota" prop="tipoNotasNombre" width="200" align="center" />
      <el-table-column label="Valor" prop="notasValor" width="150" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.notasValor" :precision="1" :step="0.1" :min="0" :max="5" size="mini" />
        </template>
      </el-table-column>
      <el-table-column label="Porcentaje" prop="notasPorcentaje" width="150" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.notasPorcentaje" :min="1" :max="100" size="mini" />
        </template>
      </el-table-column>
      <el-table-column label="Periodo" prop="notasPeriodo" width="150" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.notasPeriodo" :min="1" :max="4" size="mini" />
        </template>
      </el-table-column>
      <el-table-column label="Comentarios" prop="notasComentarios" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.notasComentarios" placeholder="Ingrese comentarios" type="textarea" />
        </template>
      </el-table-column>
      <el-table-column label="Operaciones">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">
            Editar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <h2>Agregar notas: </h2>
      <h3>Tipo de nota: </h3>
      <el-form ref="createNota" :model="createNota" label-width="120px">
        <el-form-item label="Tipo de nota">
          <el-select v-model="createNota.notaTipoNotasId" placeholder="Select">
            <el-option v-for="item in getTipoNotas" :key="item.tipoNotasId" :label="item.tipoNotasNombre" :value="item.tipoNotasId" />
          </el-select>
        </el-form-item>
        <h3>Valor de la nota: </h3>
        <el-form-item label="nota">
          <el-input-number v-model="createNota.notaValor" :precision="1" :step="0.1" :min="0" :max="5" />
        </el-form-item>
        <el-form-item label="Porcentaje">
          <el-input-number v-model="createNota.notaPorcentaje" :min="1" :max="100" />
        </el-form-item>
        <el-form-item label="Periodo">
          <el-input-number v-model="createNota.notaPeriodo" :min="1" :max="4" />
        </el-form-item>
        <el-form-item label="Comentario">
          <el-input v-model="createNota.notaComentario" placeholder="Ingrese comentarios" type="textarea" />
        </el-form-item>
        <el-form-item label="Periodo">
          <el-button type="success" @click="createNotas">+Agregar Notas</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'StudentGrades',
  data() {
    return {
      curso: '',
      form: {
        estudianteId: 0,
        claseId: ''
      },
      student: {},
      subjectId: 0,
      courseById: [],
      getsubjects: [],
      getTipoNotas: [],
      createNota: {
        notaIdEstudiante: '',
        notaTipoNotasId: '',
        notaValor: 0,
        notaPorcentaje: 0,
        notaPeriodo: 0,
        notaComentario: ''
      },
      notasUpdateInput: {
        notaValor: null,
        notaPorcentaje: null,
        notaPeriodo: null,
        notaComentario: null
      },
      notasCreateInput: {
        notaIdEstudiante: '4103999',
        notaTipoNotasId: '3',
        notaValor: 2.8,
        notaPorcentaje: 25,
        notaPeriodo: 4,
        notaComentario: 'nueva nota por recuperación'
      },
      materiaId: null,
      contenido: 'Aqui va el contenido de la materia',
      value: ''
    }
  },
  mounted() {
    this.assignCourseClase()
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
          id: this.curso
        }
      },
      skip: false
    },
    getTipoNotas: {
      query: gql`query getTipoNotas{
        getTipoNotas{
          tipoNotasId
          tipoNotasNombre
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
    assignCourseClase() {
      console.log('store:')
      console.log(this.$store.state.idCurso)
      this.curso = this.$store.state.idCurso
      this.form.claseId = this.$store.state.idClase
    },
    changeEstudent() {
      this.form.estudianteId = Number(this.value)
      this.showNotas()
    },
    handleEdit(index, row) {
      this.notasUpdateInput.notaValor = row.notasValor
      this.notasUpdateInput.notaPorcentaje = row.notasPorcentaje
      this.notasUpdateInput.notaPeriodo = row.notasPeriodo
      this.notasUpdateInput.notaComentario = row.notasComentarios
      this.materiaId = row.notasId
      this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!, $notasUpdateInput: notasUpdateInput!) {
            updateNota(id: $id, notasUpdateInput: $notasUpdateInput)
        }`,
        variables: {
          id: this.materiaId,
          notasUpdateInput: this.notasUpdateInput
        }
      }).then((data) => {
        this.notasUpdateInput.notaValor = null
        this.notasUpdateInput.notaPorcentaje = null
        this.notasUpdateInput.notaPeriodo = null
        this.notasUpdateInput.notaComentario = null
      }).catch((error) => {
        console.error(error)
      })
    },
    async createNotas() {
      this.createNota.notaIdEstudiante = this.form.estudianteId.toString()
      this.createNota.notaTipoNotasId = this.createNota.notaTipoNotasId.toString()
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($notasGestionInput: notasGestionInput!) {
            createNota(notasGestionInput: $notasGestionInput)
        }`,
        variables: {
          notasGestionInput: this.createNota
        }
      })
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
        this.getsubjects = this.getsubjects.data.NotasEstudianteClase
      }).catch((error) => {
        console.error(error)
      })
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
