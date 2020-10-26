<template>
  <div class="app-container">
    <el-button
      type="primary"
      round
      size="medium"
      icon="el-icon-refresh"
      @click="updateList"
    >
      Update
    </el-button>
    <el-table
      height="500"
      border
      :data="
        getSubjects.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
    >
      <el-table-column prop="id" label="ID" width="50px" />
      <el-table-column prop="name" label="Name" sortable />
      <el-table-column prop="grade" label="Grade" sortable />
      <el-table-column align="right">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            plain
            @click="handleEdit(scope.row)"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="showDialog">
      <span slot="title">Editing subject (id: {{ id }})</span>
      <el-form :model="form">
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleDelete">Delete</el-button>
        <el-button type="warning" @click="handleUpdate">Update</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      search: '',
      showDialog: false,
      id: 0,
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
  },
  methods: {
    updateList() {
      this.$apollo.queries.getSubjects.refetch().then(() => {
        this.$message({
          message: 'Subject list updated!',
          type: 'success'
        })
      }
      ).catch(() => {
        this.$message.error('Error updating Subjects')
      })
    },
    handleEdit(r) {
      this.showDialog = true
      this.id = r.id
      this.form.name = r.name
      this.form.grade = r.grade
    },
    handleDelete() {
      this.deleteSubject().then(() => {
        this.showDialog = false
        this.$message({
          message: `Subject successfully deleted (id: ${this.id})`,
          type: 'success'
        })
        this.updateList()
      }).catch(() => {
        this.$message.error('Error deleting subject')
      })
    },
    handleUpdate() {
      this.updateSubject().then(() => {
        this.showDialog = false
        this.$message({
          message: `Subject successfully updated (id: ${this.id})`,
          type: 'success'
        })
        this.updateList()
      }).catch(() => {
        this.$message.error('Error updating subject')
      })
    },
    async deleteSubject() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($id: Int!){
            deleteSubject(id: $id){
              rows
              response
            }
          }
        `,
        variables: {
          id: this.id
        }
      })
    },
    async updateSubject() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($id: Int!, $data: SubjectInput!){
            putSubject(id: $id, data: $data){
              rows
              response
            }
          }
        `,
        variables: {
          data: this.form,
          id: this.id
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

