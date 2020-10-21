<template>
  <div class="app-container">
    <div style="font-size:25px; font-weight:bold; margin-bottom:20px; margin-top:10px; margin-left:10px;">Salones disponibles</div>
    <el-table
      v-loading="listLoading"
      :data="mockClassrooms"
      element-loading-text="Loading"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="Descripción">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column label="Capacidad">
        <template slot-scope="scope">
          {{ scope.row.capacidad }}
        </template>
      </el-table-column>

      <el-table-column
      label="">
        <template slot-scope="scope">
          <deleteClassroom :index="scope.$index" :row="scope.row" @deleted="reload"/>
        </template>
      </el-table-column>      
    </el-table>
    <addClassroom style="margin-top: 10px;"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AddClassroom from './addClassroom'
import DeleteClassroom from './deleteClassroom'

export default {
  name: 'Classrooms',
  components: { AddClassroom, DeleteClassroom },
  data() {
    return {
      allClassrooms: [],
      mockClassrooms: [
        {
          id:"id 1",
          capacidad: 20,
          description: "Descripcion 1"
        },
        {
          id:"id 2",
          capacidad: 30,
          description: "Descripcion 2"
        },
        {
          id:"id 3",
          capacidad: 40,
          description: "Descripcion 3"
        }
      ],
      listLoading: false
    }
  },
  apollo: {
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
  },
  methods: {
    reload(){
      this.$apollo.queries.allClassrooms.refetch()
    }
  }

}
</script>

<style lang="scss" scoped>

.parentDiv{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
}

.aux2{
  margin-top: 10px;
}

</style>