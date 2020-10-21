<template>
  <div class="app-container">
    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">Añadir un usuario</div>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="Nombres" style="width: 800px">
        <el-input v-model="form.name" placeholder="Ingrese Nombres" />
      </el-form-item>

      <el-form-item label="Apellidos" style="width: 800px">
        <el-input v-model="form.surname" placeholder="Ingrese Apellidos" />
      </el-form-item>

      <el-form-item label="Tipo de Identificación">
        <el-select v-model="form.Tid" placeholder="Ingrese documento" style="width: 600px">
          <el-option label="Tarjeta de Identidad" value="TarjetaIdentidad" />
          <el-option label="Cedula de Ciudadanía" value="CedulaCiudadania" />
          <el-option label="Pasaporte" value="Pasaporte" />
        </el-select>
      </el-form-item>

      <el-form-item label="Número Identificación" style="width: 800px">
        <el-input v-model="form.id" placeholder="Ingrese Identificación" />
      </el-form-item>

      <el-form-item label="Rol">
        <el-select v-model="form.rol" placeholder="Seleccione el rol" style="width: 600px">
          <el-option label="Estudiante" value="Estudiante" />
          <el-option label="Profesor" value="Profesor" />
          <el-option label="Administrador" value="Administrador" />
        </el-select>
      </el-form-item>

      <el-form-item label="Fecha de Nacimiento">
        <el-date-picker v-model="form.dateN" type="date" placeholder="Seleccione la fecha de nacimiento" style="width: 600px" />
      </el-form-item>

      <el-form-item label="Sexo">
        <el-select v-model="form.sexo" placeholder="Seleccione el rol" style="width: 600px">
          <el-option label="Masculino" value="Masculino" />
          <el-option label="Femenino" value="Femenino" />
          <el-option label="Prefiere no respoder" value="NoSex" />
        </el-select>
      </el-form-item>

      <el-form-item label="Telefono" style="width: 800px">
        <el-input v-model="form.phone" placeholder="Ingrese telefono" />
      </el-form-item>

      <el-form-item label="Email" style="width: 800px">
        <el-input v-model="form.email" placeholder="Ingrese correo" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Crear usuario</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'AddProfile',
  data() {
    return {
      allProfiles: [],
      form: {
        name: null,
        surname: null,
        Tid: null,
        id: null,
        rol: null,
        dateN: null,
        sexo: null,
        phone: null,
        email: null
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.$apollo.mutate({
        mutation: gql`
          mutation ($assignement: AssignementInput!) {
            createAssignement(assignement: $assignement)
        }`,
        variables: {
          assignement: this.form
        }
      }).then((data) => {
        this.$parent.reload()
        this.$apollo.queries.allProfiles.refetch()
      }).catch((error) => {
        console.error(error)
      })
      this.form.name = null
      this.form.surname = null
      this.form.Tid = null
      this.form.id = null
      this.form.rol = null
      this.form.dateN = null
      this.form.sexo = null
      this.form.phone = null
      this.form.email = null
    },
    onCancel() {
      this.$message({
        message: 'cancelado!',
        type: 'warning'
      })
    }
  },
  apollo: {
    allProfiles: {
      query: gql`
        query{
          allProfiles{
            name
            surname
            Tid
            id
            rol
            dateN
            sexo
            phone
            email
          }
        }`
    }
  }
}
</script>

<style scoped>
</style>

