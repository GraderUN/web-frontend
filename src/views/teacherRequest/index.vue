<template>
  <div class="parentDiv">

    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">Cursos disponibles</div>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(request,index) in allRequest" :key="index" :title="request.grade + request.letter" :name="index">
        <request :id="request.id" :index="index" :name="request.grade + request.letter" />
        <deleteRequest :id="request.id" :request="request.grade + request.letter" @deleted="reload" />
      </el-collapse-item>
    </el-collapse>

    <addRequest class="aux2" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import GetRequest from './getTeacherRequest'
import AddRequest from './addTeacherRequest'
import Form from '../form/index'
export default {
  name: 'Request',
  components: { GetRequest, AddRequest, Form },
  data() {
    return {
      allRequest: [],
      mockRequest: [{
        grade: 1,
        letter: 'A'
      }, {
        grade: 1,
        letter: 'B'
      }, {
        grade: 1,
        letter: 'C'
      }, {
        grade: 1,
        letter: 'D'
      }],
      triggers: [false],
      activeName: '1'
    }
  },
  apollo: {
    allRequest: {
      query: gql`
        query{
          allRequest{
            id
            grade
            letter
          }
        }`
    }
  },
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
