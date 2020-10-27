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
          <el-button size="mini" plain @click="handleContent(scope.row)">
            View Content
          </el-button>
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

    <!-- EDIT DIALOG -->
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

    <!-- CONTENT DIALOG -->
    <el-dialog :visible.sync="showContent">
      <span slot="title">Content (id: {{ id }}): {{ form.name }}</span>
      <el-input
        v-model="textarea"
        type="textarea"
        autosize
        placeholder="Subject Content"
        maxlength="10000"
        show-word-limit
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="contentUpdate">
          Update Content
        </el-button>
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
      showContent: false,
      textarea: '',
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
    `,
    getContent: gql`
      query($id: Int!){
        getContent(id: $id){
          name
          content
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
    handleContent(r) {
      this.id = r.id
      this.form.name = r.name
      this.$apollo.queries.getContent.refetch({
        id: this.id
      }).then(() => {
        this.textarea = this.getContent.content
        this.showContent = true
      }
      ).catch(() => {
        this.$message.error('Error fetching Content')
      })
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
    contentUpdate() {
      this.updateContent().then(() => {
        this.showContent = false
        this.$message({
          message: `Content successfully updated (id: ${this.id})`,
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('Error updating content')
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
    },
    async updateContent() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($id: Int!, $content: String!){
            putContent(id: $id, content: $content){
              rows
              response
            }
          }
        `,
        variables: {
          id: this.id,
          content: this.textarea
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

