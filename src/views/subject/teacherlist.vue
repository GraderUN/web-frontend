<template>
  <div class="app-container">
    <el-select
      v-model="form.id_teacher"
      placeholder="Select Teacher"
      @change="changeTeacher"
    >
      <el-option
        v-for="teach in allProfesores"
        :key="teach.id"
        :label="teach.nombre + ' ' + teach.apellido"
        :value="teach.id"
      />
    </el-select>

    <el-table border :data="getTeacherSubjects">
      <el-table-column prop="id_teacher" label="Teacher">
        <template slot-scope="scope">
          {{ fullname }} (id: {{ scope.row.id_teacher }})
        </template>
      </el-table-column>
      <el-table-column prop="id_subject" label="Subject" sortable>
        <template slot-scope="scope">
          {{
            getSubjects.find((data) => data.id === scope.row.id_subject).name
          }}
          (id: {{ scope.row.id_subject }})
        </template>
      </el-table-column>
      <el-table-column align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      fullname: null,
      form: {
        id_teacher: null,
        id_subject: null
      }
    }
  },
  apollo: {
    allProfesores: gql`
      query{
        allProfesores{
          id
          nombre
          apellido
        }
      }
    `,
    getSubjects: gql`
      query{
        getSubjects{
          id
          name
          grade
        }
      }
    `,
    getTeacherSubjects: gql`
      query($id: Int!){
        getTeacherSubjects(id: $id){
          id_teacher
          id_subject
        }
      }
    `
  },
  methods: {
    changeTeacher() {
      const teach = this.allProfesores.find((data) => data.id === this.form.id_teacher)
      this.fullname = teach.nombre + ' ' + teach.apellido
      this.updateList().then(() => {
        this.$message({
          message: 'Subject list updated!',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('Error updating Subjects')
      })
    },
    async updateList() {
      await this.$apollo.queries.getTeacherSubjects.refetch({
        id: this.form.id_teacher
      })
    },
    handleDelete(row) {
      this.form.id_subject = row.id_subject
      console.log(this.form)
      this.deleteTeacher().then(() => {
        this.$message({
          message: 'Deleted Teacher-Subject!',
          type: 'success'
        })
        this.updateList()
      }).catch(() => {
        this.$message.error('Error deleting Teacher-Subject')
      })
    },
    async deleteTeacher() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($data: TeacherInput!){
            deleteTeacher(data: $data){
              rows
              response
            }
          }
        `,
        variables: {
          data: this.form
        }
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

