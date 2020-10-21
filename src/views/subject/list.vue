<template>
  <div class="app-container">
    <el-table :data="getSubjects" border>
      <el-table-column prop="id" label="ID" width="50px" />
      <el-table-column prop="name" label="Name" sortable />
      <el-table-column prop="grade" label="Grade" sortable />
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      form: {
        name: '',
        grade: 0
      }
    }
  },
  apollo: {
    getSubjects: gql`
      query{
        getSubjects{
          id
          name
          grade
        }
      }
    `
  }
  // methods: {}
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

