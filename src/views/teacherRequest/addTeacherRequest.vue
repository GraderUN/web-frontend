<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>

<template>
  <div id="app" class="container">
    <h4>
      Todas las Tareas
    </h4>

    <!--      <ul>
          <li v-for="task of tasks" v-bind:key="task">
              {{ task.title }}
          </li>
      </ul>

      <h4 v-if="pendingTasks.leght">
          Tareas Pendientes
      </h4>

      <ul v-if="pendingTasks.leght">
          <li v-for="task of pendingTasks" v-bind:key="task">
              {{ task.title }}
          </li>
      </ul>
-->
    <input v-model="new_task" type="text" class="form-control">
    <button class="btn btn-primary" @v-on:click="createTask">Crear Tarea</button>
  </div>
</template>

<script>

var vm = new Vue({
  el: '#app',
  data: {
    new_task: '',
    tasks: [
      {
        title: 'Aprender js',
        pending: false
      },
      {
        title: 'prueba 1',
        pending: false
      },
      {
        title: 'Una más',
        pending: false
      }
    ]
  },
  computed: {
    pendingTasks: function() {
      return this.tasks.filter(function(item) {
        return item.pending
      })
    }
  },
  methods: {
    createTask: function () {
      this.tasks.push({
        title: this.new_task,
        pending: true
      })
      this.new_task = '';
    }
  }
})

// vm.name = 'Cristian';
</script>

<style scoped>

</style>

<!--
<template>
  <div class="app-container">
    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">Añadir un curso</div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Grado">
        <el-input-number v-model="form.grade" :min="0" :max="11"></el-input-number>
      </el-form-item>

      <el-form-item label="Letra">
        <el-input v-model="form.letter" placeholder="Ingrese la letra del curso" maxlength="1" show-word-limit/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Crear Curso</el-button>
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
        grade: 0,
        letter: '',
      }
    }
  },
  methods: {
    async onSubmit() {
      this.form.letter = this.form.letter.toUpperCase()
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation ($course: CourseInput!) {
            createCourse(course: $course){
              id
              grade
              letter
            }
        }`,
        variables: {
            course: this.form
        }
      })
      this.form.grade = 0
      this.form.letter = ''
      this.$parent.reload()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style> -->
