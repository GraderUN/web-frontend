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
      this.$confirm('¿Está seguro que desea quitar al estudiante '+ this.student.name +' del curso '+ this.course +'?', 'Advertencia', {
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
      //TERMINAR
      // this.$apollo.mutate({ 
      //   mutation: gql`
      //     mutation ($id: String!) {
      //       deleteCourse(id: $id){
      //         id_students
      //         grade
      //         letter
      //       }
      //   }`, 
      //   variables: {
      //     id:this.id
      //   }
      // })
      this.$parent.reload()
    }
  }
}
</script>