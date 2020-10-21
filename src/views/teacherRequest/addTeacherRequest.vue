<template>
  <div class="app-container">
    <div style="font-size:20px; font-weight:bold; margin-bottom:20px">Agregar solicitud de profesor</div>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="ID Profesor" style="width: 800px">
        <el-input v-model="form.idProfesor" />
      </el-form-item>

      <el-form-item label="Tipo de solicitud">
        <el-select v-model="form.tipo" placeholder="Seleccion el tipo de solicitud" style="width: 600px">
          <el-option v-for="(TipoSolicitud,index) in mockPossibleTipoSolictud" :key="index" :label="TipoSolicitud.name" :value="TipoSolicitud.name" />
        </el-select>
      </el-form-item>

      <el-form-item label="Fecha">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Escoge la fecha" style="width: 600px" />
        </el-col>
      </el-form-item>

      <el-form-item label="Información Adicional" style="width: 800px">
        <el-input v-model="form.descripcion" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Enviar solicitud</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import gql from 'graphql-tag'

export default {
  name: 'TipoSolicitud',
  data() {
    return {
      mockPossibleTipoSolictud: [
        {
          id: '1',
          name: 'Aplazar año'
        },
        {
          id: '2',
          name: 'Certificado Notas'
        },
        {
          id: '3',
          name: 'Diploma Virtual'
        },
        {
          id: '4',
          name: 'Reunión Padres'
        },
        {
          id: '5',
          name: 'Mala Calificación'
        }],
      modalShow: false,
      show: true,
      tipoSeleccionado: null,
      form: {
        tipo: null
      }
    }
  },
  methods: {
    computed: {
      validateState(name) {
      }
    },
    onSubmit(evt) {
      console.log('Se agregó el solicitud: ' + this.form.tipo)
      evt.preventDefault()
      this.close()
      this.$parent.reload()
    },
    close() {
      this.form.student = ''
      this.modalShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
