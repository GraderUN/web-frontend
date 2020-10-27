<template>
  <div class="app-container">
    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">Añadir una clase</div>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Curso">
        <el-select v-model="form.curso" placeholder="Seleccione el curso" style="width: 600px">
          <el-option v-for="(course,index) in allCourses" :key="index" :label="course.grade+course.letter" :value="course.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Materia">
        <el-select v-model="form.materia" placeholder="Seleccione la materia" style="width: 600px">
          <el-option v-for="(subject,index) in getSubjects" :key="index" :label="subject.name" :value="subject.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Profesor">
        <el-select v-model="form.profesor" placeholder="Seleccione el profesor" style="width: 600px">
          <el-option v-for="(teacher,index) in allProfesores" :key="index" :label="teacher.nombre+' '+teacher.apellido" :value="teacher.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Salón">
        <el-select v-model="form.salon" placeholder="Seleccione el salón" style="width: 600px">
          <el-option v-for="(classroom,index) in allClassrooms" :key="index" :label="classroom.description" :value="classroom.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Horario" style="width: 800px">
        <el-input v-model="form.horario" placeholder="Ingrese el horario"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Añadir clase</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'addClassroom',
  data() {
    return {
      allCourses: [],
      getSubjects: [],
      allProfesores: [],
      allClassrooms: [],
      form: {
        curso: null,
        salon: null,
        horario: null,
        profesor: null,
        materia: null
      }
    }
  },
  methods: {
    onSubmit() {
      this.form.profesor = this.form.profesor.toString()
      this.form.materia = this.form.materia.toString()
      
      this.$apollo.mutate({
        mutation: gql`
          mutation ($assignement: AssignementInput!) {
            createAssignement(assignement: $assignement)
        }`, 
        variables: {
            assignement: this.form
        }
      }).then((data) => {
        this.$parent.reload()
        this.$apollo.queries.allCourses.refetch()
        this.$apollo.queries.getSubjects.refetch()
        this.$apollo.queries.allProfesores.refetch()
        this.$apollo.queries.allClassrooms.refetch()
        this.form.curso = null
        this.form.salon = null
        this.form.horario = null
        this.form.profesor = null
        this.form.materia = null
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  apollo: {
    allCourses: {
      query: gql`
        query{
          allCourses{
            id
            grade
            letter
          }
        }`
    },
    getSubjects: {
      query: gql`
        query{
          getSubjects{
            id
            name
          }
        }`
    },
    allProfesores: {
      query: gql`
        query{
          allProfesores{
            id
            nombre
            apellido
          }
        }`
    },
    allClassrooms: {
      query: gql`
        query{
          allClassrooms{
            id
            capacidad
            description
          }
        }`
    }
  }
}
</script>

<style scoped>

</style>

