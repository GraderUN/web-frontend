<template>
  <div class="app-container">
    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">Añadir un salón</div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Capacidad">
        <el-input-number v-model="form.capacidad"></el-input-number>
      </el-form-item>
      

      <el-form-item label="Descripción">
        <el-input v-model="form.description" placeholder="Ingrese la descripción del salón"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">Crear Salón</el-button>
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
      form: {
        capacidad: 0,
        description: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.$apollo.mutate({
        mutation: gql`
          mutation ($classroom: ClassroomInput!) {
            createClassroom(classroom: $classroom)
        }`, 
        variables: {
            classroom: this.form
        }
      }).then((data) => {
        this.form.capacidad = 0
        this.form.description = ''
        this.$parent.reload()
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

