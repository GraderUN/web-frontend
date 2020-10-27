<template>
  <div>
    <div style="font-size:20px; font-weight:bold; margin-bottom:20px">Añadir un estudiante</div>
    <el-form ref="form" :model="form" label-width="200px">

      <el-form-item label="Estudiante a añadir">
        <el-select v-model="form.id" placeholder="Seleccione el estudiante que desea añadir al curso" style="width: 600px">
          <el-option v-for="(student,index) in studentsWithoutCourse" :key="index" :label="student.nombre+' '+student.apellido" :value="student.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Añadir estudiante</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

/*
SE DEBE HACER DOS COSAS:
1. Ver que estudiantes existen en general
2. Quitar los estudiantes que ya tienen un curso asignado
(Todo esto se puede realizar en el api gateway) 
}*/

export default {
  name: 'AddStudent',
  props:{
    id: {
      type: String,
      default: '',
      required: true
    },
    update: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      studentsWithoutCourse: [],
      selectedStudent: null,
      form:{
        id: null,
        id_course: null
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.form.id = this.form.id.toString()
      this.form.id_course = this.id
      this.$apollo.mutate({
        mutation: gql`
          mutation ($student: StudentInput!) {
            createStudent(student: $student){
              id
              id_course
            }
        }`, 
        variables: {
          student: this.form
        }
      }).then((data) => {
        this.$parent.reload()
        this.$apollo.queries.studentsWithoutCourse.refetch()
        this.form.id = null
        this.form.id_course = null
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  apollo: {
    studentsWithoutCourse: {
      query: gql`query{
        studentsWithoutCourse{
          id
          nombre
          apellido
        }
      }`,
      skip: false
    }
  },
  watch: {
    update: function(){
      this.$apollo.queries.studentsWithoutCourse.refetch()
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
