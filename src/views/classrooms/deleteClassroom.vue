<template>
  <div>
    <el-button size="medium" type="danger" @click="warningMessage">Borrar Curso</el-button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'deleteClassroom',
  props:{
    index: {
      type: Number,
      default: null,
      required: true
    },
    row: {
      type: Object,
      default: null,
      required: true
    }
  },
  methods: {
    warningMessage(){
      this.$confirm('¿Está seguro que desea borrar el salón '+ this.index +'?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteClassroom()
        this.$message({
          type: 'success',
          message: 'Eliminación existosa'
        });
      })
    },

    async deleteClassroom() {
      console.log(this.row.id)
      /*await this.$apollo.mutate({ 
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
      })*/
      new Promise(() => setTimeout(500)).then(this.$emit('deleted'))
    }
  }
}
</script>
