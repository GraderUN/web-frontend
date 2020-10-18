<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> hmmmm hola {{ allCourses }}</div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const GET_MOVIES = gql`
  query{
  allCourses{
    id
    grade
  }
}
`

export default {
  name: 'Graph',
  data() {
    return {
      allCourses: []
    }
  },
  apollo: {
    allCourses: {
      query: GET_MOVIES
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
