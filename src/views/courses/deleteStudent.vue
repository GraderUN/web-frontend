<template>
  <div class="aux">
    <el-button type="danger" @click="warningMessage">Borrar Estudiante</el-button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'deleteCourse',
  props:{
    student: {
      type: Object,
      default: {},
      required: true
    },
    course: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    warningMessage(){
      this.$confirm('¿Está seguro que desea quitar al estudiante '+ this.student.nombre + " " + this.student.apellido +' del curso '+ this.course +'?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteStudent()
        this.$message({
          type: 'success',
          message: 'Eliminación existosa'
        });
      })
    },
    
    deleteStudent() {
      this.$apollo.mutate({ 
        mutation: gql`
          mutation ($id: String!) {
            deleteStudent(id: $id){
              id
            }
        }`, 
        variables: {
          id:this.student.id.toString()
        }
      }).then((data) => {
        this.$emit('deleted')
      }).catch((error) => {
        console.error(error)
      })
      //new Promise(() => setTimeout(500)).then(this.$emit('deleted'))
    }
  }
}
</script>