<template>
  <div>
    <div style="font-size:20px; font-weight:bold; margin-bottom:20px">Añadir un estudiante</div>
    <el-form ref="form" :model="form" label-width="200px">

      <el-form-item label="Estudiante a añadir">
        <el-select v-model="form.estudiante" placeholder="Seleccion el estudiante que desea añadir al curso" style="width: 600px">
          <el-option v-for="(student,index) in mockPossibleStudents" :key="index" :label="student.name" :value="student.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Añadir estudiante</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

/*
SE DEBE HACER DOS COSAS:
1. Ver que estudiantes existen en general
2. Quitar los estudiantes que ya tienen un curso asignado
(Todo esto se puede realizar en el api gateway) 
}*/

export default {
  name: 'AddStudent',
  data() {
    return {
      mockPossibleStudents: [
      {
        id:'1',
        name:'Pepito perez 5'
      },
      {
        id:'2',
        name:'Pepito perez 6'
      },
      {
        id:'3',
        name:'Pepito perez 7'
      },
      {
        id:'4',
        name:'Pepito perez 8'
      },
      {
        id:'5',
        name:'Pepito perez 9'
      }],
      modalShow: false,
      show: true,
      selectedStudent: null,
      form:{
          estudiante: null
      }
    }
  },
  methods: {
    validateState(name) {
        
    },

    onSubmit(evt) {
      console.log("Se seleccionó el estudiante: "+ this.form.estudiante)
      evt.preventDefault()
      /*this.$apollo.mutate({
        data: gql`
          mutation ($course: CourseInput!) {
            createCourse(course: $course){
              id
              grade
              letter
            }
        }`, 
        variables: {
            course: courses
        },
        update: (cache, { data: { insert_todos } }) => {
          console.log(insert_todos);
        }
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.error(error)
      })*/
      this.close()
      this.$parent.reload()
    },
    close() {
      this.form.student = ''
      this.modalShow = false
    }
  },
  computed: {
    studentsWithoutCourse(){
        var res = []
        for(var i=0; i<this.mockPossibleStudents.length; i++){
          res.push({
            value: this.mockPossibleStudents[i].id,
            text: this.mockPossibleStudents[i].name
          })
        }
        return res
    }
  }
  
}
</script>

<style lang="scss" scoped>
.addCourse{
  margin-top: 20px;
  border: 0px;
  background-color:rgb(122, 207, 139);
  font-weight: bold;
}
</style>
