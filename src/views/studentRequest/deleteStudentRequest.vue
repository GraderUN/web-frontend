<template>
  <div class="app-container">
    <div style="font-size:20px; font-weight:bold; margin-bottom:20px">Eliminar solicitud de estudiante</div>
    <el-table :data="dataRequest">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="ID Estudiante" />
      <el-table-column prop="tipo" label="Tipo Solicitud" />
      <el-table-column prop="fecha" label="Fecha" sortable />
      <el-table-column prop="informacion" label="Información Adicional" sortable />
    </el-table>

    <el-button type="danger" @click="removeRequest">Borrar Solicitud</el-button>

  </div>
</template>

<script>
import gql from 'graphql-tag'
const GET_SUBJECT = gql`
  query{
  studentRequest{
    id
    tipo
    fecha
    informacion
    }
}
`
export default {
  name: 'Graph',
  data() {
    return {
      allRequest: [],
      dataRequest: [
        {
          id: '1',
          tipo: 'prueba',
          fecha: '21/10/2020',
          informacion: 'Nota mala'
        },
        {
          id: '2',
          tipo: 'prueba',
          fecha: '22/10/2020',
          informacion: 'Nota mala'
        },
        {
          id: '3',
          tipo: 'prueba',
          fecha: '20/10/2020',
          informacion: 'Nota mala'
        },
        {
          id: '4',
          tipo: 'prueba',
          fecha: '21/10/2020',
          informacion: 'Nota mala'
        },
        {
          id: '5',
          tipo: 'prueba',
          fecha: '21/10/2020',
          informacion: 'Nota mala'
        }
      ]
    }
  },
  apollo: {
    allRequest: {
      query: GET_SUBJECT
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
    removeElement: function(item) {
      this.items.$remove(item)
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
