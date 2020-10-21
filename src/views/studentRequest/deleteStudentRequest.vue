<template>
  <div class="app-container">
    <div style="font-size:20px; font-weight:bold; margin-bottom:20px">Eliminar solicitud de estudiante</div>
    <el-table :data="request">
      <el-table-column prop="name" label="Name" type="selection"/> 
      <el-table-column prop="id" label="ID Estudiante"> {{ request.id }} </el-table-column>
      <el-table-column prop="tipo" label="Tipo Solicitud"> {{ request.tipo }} </el-table-column>
      <el-table-column prop="fecha" label="Fecha" sortable > {{ request.fecha }} </el-table-column>
      <el-table-column prop="informacion" label="Información Adicional" sortable > {{ request.informacion }} </el-table-column>
      <el-table-column> <button v-on:click="removeElement(item)">remove</button> </el-table-column>
    </el-table>

    <el-button type="danger" @click="removeRequest">Borrar Solicitud</el-button>

  </div>
</template>

<script>

export default {
  name: 'request',
  data() {
    return {
    request: [
      { id: 'Foo',
        tipo: 'prueba',
        fecha: '21/10/2020',
        informacion: 'Nota mala'
      },
      { id: 'Foo',
        tipo: 'prueba',
        fecha: '21/10/2020',
        informacion: 'Nota mala'
      },
      { id: 'Foo',
        tipo: 'prueba',
        fecha: '21/10/2020',
        informacion: 'Nota mala'
      },
      { id: 'Foo',
        tipo: 'prueba',
        fecha: '21/10/2020',
        informacion: 'Nota mala'
      },
      { id: 'Foo',
        tipo: 'prueba',
        fecha: '21/10/2020',
        informacion: 'Nota mala'
      },
    ]
    }
  },
  methods: {
    removeElement : function (item) {
      this.items.$remove(item)
    }
  }
}
</script>

<!-- 
import gql from 'graphql-tag'
export default {
  name: 'deleteRequest',
  props: {
    request: {
      type: Object,
      default: {},
      required: true
    }
  },
  methods: {
    /* warningMessage() {
      this.$confirm('¿Está seguro que desea quitar al estudiante ' + this.student.name + ' del curso ' + this.course + '?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteStudent()
        this.$message({
          type: 'success',
          message: 'Eliminación existosa'
        })
      })
    },
    deleteStudent() {
      // TERMINAR
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
    }, */
    removeRequest: function(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>
