<template>
  <div class="aux">
    <el-button type="danger" @click="warningMessage">Borrar Curso</el-button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'deleteCourse',
  props:{
    id: {
      type: String,
      default: '',
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
      this.$confirm('¿Está seguro que desea borrar el curso '+ this.course +'?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteCourse()
        this.$message({
          type: 'success',
          message: 'Eliminación existosa'
        });
      })
    },

    deleteCourse() {
      this.$apollo.mutate({ 
        mutation: gql`
          mutation ($id: String!) {
            deleteCourse(id: $id){
              id_students
              grade
              letter
            }
        }`, 
        variables: {
          id:this.id
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
