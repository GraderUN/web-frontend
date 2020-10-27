<template>
  <div>
    <el-button size="medium" type="danger" @click="warningMessage">Borrar Salón</el-button>
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
      })
    },

    deleteClassroom() {
      this.$apollo.mutate({ 
        mutation: gql`
          mutation ($id: String!) {
            deleteClassroom(id: $id)
        }`, 
        variables: {
          id:this.row.id
        }
      }).then((data) => {
        this.$emit('deleted')
        this.$message({
          type: 'success',
          message: 'Eliminación existosa'
        })
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
