<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Teacher">
        <el-select v-model="form.id_teacher" placeholder="Select Teacher">
          <el-option
            v-for="teach in allProfesores"
            :key="teach.id"
            :label="teach.nombre + ' ' + teach.apellido"
            :value="teach.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Subject grade">
        <el-input-number
          v-model="grade"
          :min="-1"
          :max="11"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="Subject">
        <el-select v-model="form.id_subject" placeholder="Select Subject">
          <el-option
            v-for="subject in getSubjects.filter(
              (data) => !grade || data.grade == grade
            )"
            :key="subject.id"
            :label="subject.name"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Add Subject</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      fullname: null,
      grade: null,
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
    `
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      this.createTeacher().then(() => {
        this.$message({
          message: 'Teacher-Subject saved',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('Error adding Teacher')
      })
    },
    async createTeacher() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($data: TeacherInput!){
            postTeacher(data: $data){
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

