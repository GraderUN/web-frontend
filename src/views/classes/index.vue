<template>
  <div class="app-container">
    <div style="font-size:25px; font-weight:bold; margin-bottom:20px; margin-top:10px; margin-left:10px;">Clases</div>
    <el-table
      v-loading="listLoading"
      :data="allAssignementsInfo"
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

      <el-table-column label="Curso" width="150">
        <template slot-scope="scope">
          {{ scope.row.curso }}
        </template>
      </el-table-column>

      <el-table-column label="Materia" width="200">
        <template slot-scope="scope">
          {{ scope.row.materia }}
        </template>
      </el-table-column>

      <el-table-column label="Profesor" width="200">
        <template slot-scope="scope">
          {{ scope.row.profesor }}
        </template>
      </el-table-column>

      <el-table-column label="Salón" width="200">
        <template slot-scope="scope">
          {{ scope.row.salon }}
        </template>
      </el-table-column>

      <el-table-column label="Horario" align="center" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ " " + scope.row.horario }}</span>
        </template>
      </el-table-column>

      <el-table-column
      label="" align="center">
        <template slot-scope="scope">
          <deleteClass :index="scope.$index" :row="scope.row" @deleted="reload"/>
        </template>
      </el-table-column>

    </el-table>
    <addClass style="margin-top: 10px;"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AddClass from './addClass'
import DeleteClass from './deleteClass'

export default {
  name: 'Classrooms',
  components: { AddClass, DeleteClass },
  data() {
    return {
      allAssignementsInfo: [],
      mockClasses: [
        {
          id:"1",
          curso: "1A",
          salon: "301",
          horario: "Lunes",
          profesor: "Pepito",
          materia: "Matematicas"
        },
        {
          id:"2",
          curso: "1B",
          salon: "301",
          horario: "Martes",
          profesor: "Pepito",
          materia: "Qumica"
        },
        {
          id:"3",
          curso: "1C",
          salon: "301",
          horario: "Miercoles",
          profesor: "Pepito",
          materia: "Sociales"
        }
      ],
      listLoading: false
    }
  },
  apollo: {
    allAssignementsInfo: {
      query: gql`
        query{
          allAssignementsInfo{
            id
            curso
            salon
            horario
            profesor
            materia
          }
        }`
    }
  },
  methods: {
    reload(){
      this.$apollo.queries.allAssignements.refetch()
    }
  }

}
</script>

<style lang="scss" scoped>
</style>