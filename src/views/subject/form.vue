<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Subject name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="Subject grade">
        <el-input-number
          v-model="form.grade"
          :min="-1"
          :max="11"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
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
  // apollo: {},
  methods: {
    onSubmit() {
      // console.log(this.form.name, this.form.grade)
      this.$message('submit!')
      this.createSubject().then(() => {
        this.$message({
          message: 'Subject saved',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('Error submitting Subject')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    async createSubject() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($data: SubjectInput!){
            postSubject(data: $data){
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

