<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="User ID">
        <el-input-number
          v-model="uid"
          controls-position="right"
          placeholder="Type User ID"
          clearable
          :min="1"
        />
      </el-form-item>
      <el-form-item label="User type">
        <el-select v-model="select" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Fetch Details</el-button>
      </el-form-item>
    </el-form>

    <el-card v-if="details" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ options.find((opt) => opt.value == select).label }}</span>
      </div>
      <div v-for="(value, name) in details" :key="value" class="text item">
        {{ name }}: {{ value }}
      </div>
    </el-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      uid: null,
      select: null,
      details: null,
      options: [{
        label: 'Administrative',
        value: 'admin'
      }, {
        label: 'Teacher',
        value: 'teach'
      }, {
        label: 'Student',
        value: 'student'
      }]
    }
  },
  apollo: {
    administrativoById: gql`
      query($id: Int!){
        administrativoById(id: $id){
          id
          nombre
          apellido
          edad
          telefono
          email
        }
      }
    `,
    profesorById: gql`
      query($id: Int!){
        profesorById(id: $id){
          id
          nombre
          apellido
          edad
          telefono
          email
        }
      }
    `,
    estudianteById: gql`
      query($id: Int!){
        estudianteById(id: $id){
          id
          nombre
          apellido
          edad
          sexo
          nombreTutor
          apellidoTutor
          telefonoTutor
          emailTutor
        }
      }
    `
  },
  methods: {
    onSubmit() {
      // console.log(this.form.name, this.form.grade)
      if (this.select) this.$message('Fetching...')
      switch (this.select) {
        case 'admin':
          this.fetchAdmin()
            .then(this.fetchThen)
            .catch(this.fetchCatch)
          break
        case 'teach':
          this.fetchTeach()
            .then(this.fetchThen)
            .catch(this.fetchCatch)
          break
        case 'student':
          this.fetchStudent()
            .then(this.fetchThen)
            .catch(this.fetchCatch)
          break
        default:
          this.$message({
            message: 'Select a user category',
            type: 'warning'
          })
          break
      }
    },
    fetchThen() {
      this.$message({
        message: 'Got details!',
        type: 'success'
      })
    },
    fetchCatch() {
      this.$message.error('Error fetching details')
    },
    async fetchAdmin() {
      await this.$apollo.queries.administrativoById.refetch({ id: this.uid })
      this.details = this.administrativoById
    },
    async fetchTeach() {
      await this.$apollo.queries.profesorById.refetch({ id: this.uid })
      this.details = this.profesorById
    },
    async fetchStudent() {
      await this.$apollo.queries.estudianteById.refetch({ id: this.uid })
      this.details = this.estudianteById
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>

