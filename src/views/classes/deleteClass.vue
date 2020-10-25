<template>
  <div>
    <el-button size="medium" type="danger" @click="warningMessage">Borrar Clase</el-button>
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
      this.$confirm('¿Está seguro que desea borrar la clase '+ this.index +'?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteClass()
        this.$message({
          type: 'success',
          message: 'Eliminación existosa'
        });
      })
    },

    deleteClass() {
      //console.log(this.row.id)

      //deleteAssignement(id: String!): String!
      this.$apollo.mutate({
        mutation: gql`
          mutation ($id: String!) {
            deleteAssignement(id: $id){
            }
        }`, 
        variables: {
          id:this.row.id
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
