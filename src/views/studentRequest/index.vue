<template>
  <div class="parentDiv">

    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">SOLICITUD DE ESTUDIANTES</div>

    <addRequest class="aux2" />
    <deleteRequest class="aux2" />
  </div>
</template>

<script>
// import gql from 'graphql-tag'
// import GetRequest from './getStudentRequest'
import AddRequest from './addStudentRequest'
import DeleteRequest from './deleteStudentRequest'
// import Form from '../form/index'
export default {
  name: 'Request',
  components: { AddRequest, DeleteRequest },
  methods: {
    reload() {
      this.$apollo.queries.allRequest.refetch()
    }
  }
}
</script>

<style lang="scss" scoped>
.parentDiv{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
}
.aux2{
  margin-top: 10px;
}
</style>
