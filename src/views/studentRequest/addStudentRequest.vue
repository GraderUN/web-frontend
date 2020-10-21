<template>
  <div class="app-container">
    <div style="font-size:20px; font-weight:bold; margin-bottom:20px">Agregar solicitud de estudiante</div>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="ID Estudiante">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="Tipo de solicitud">
        <el-select v-model="form.estudiante" placeholder="Seleccion el tipo de solicitud" style="width: 600px">
          <el-option v-for="(student,index) in mockPossibleStudents" :key="index" :label="student.name" :value="student.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="Fecha">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Escoge la fecha" style="width: 100%;" />
        </el-col>
      </el-form-item>

      <el-form-item label="Información Adicional">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Enviar solicitud</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'TipoSolicitud',
  data() {
    return {
      mockPossibleStudents: [
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
      studentsWithoutCourse() {
        var res = []
        for (var i = 0; i < this.mockPossibleStudents.length; i++) {
          res.push({
            value: this.mockPossibleStudents[i].id,
            text: this.mockPossibleStudents[i].name
          })
        }
        return res
      },
      validateState(name) {
      },
      onSubmit(evt) {
        console.log('Se agregó el solicitud: ' + this.form.tipo)
        evt.preventDefault()
        /* this.$apollo.mutate({
        data: gql`
          mutation ($course: CourseInput!) {
            createCourse(course: $course){
              id
              grade
              letter
            }
        }`,
        variables: {
            course: courses
        },
        update: (cache, { data: { insert_todos } }) => {
          console.log(insert_todos);
        }
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.error(error)
      })*/
        this.close()
        this.$parent.reload()
      },
      close() {
        this.form.student = ''
        this.modalShow = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addCourse{
  margin-top: 20px;
  border: 0px;
  background-color:rgb(122, 207, 139);
  font-weight: bold;
}
</style>
