<template>
  <div class="parentDiv" >
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1" v-for="(course,index) in allCourses" :key="index">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'key'+index" variant="info" v-on:click="Trigger(index)">{{course.grade + course.letter+" "+index}}</b-button>
            </b-card-header>
            <b-collapse :id="'key'+index" accordion="my-accordion" role="tabpanel">
                <course :id="course.id" :index="index" :test="triggers"/>
            </b-collapse>
        </b-card>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import course from './specificCourse'

const getCourses = gql`
  query{
  allCourses{
    id
    grade
    letter
  }
}
`

export default {
  name: 'Courses',
  components: { course },
  data() {
    return {
      allCourses: [],
      triggers: [false, false, false]
    }
  },
  apollo: {
    allCourses: {
      query: getCourses
    }
  },
  methods: {
    Trigger(index) {
      this.triggers[index] = !this.triggers[index]
      this.triggers.push(false)
      this.triggers.pop()
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

.parentDiv{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
}

.card{
  border: 2px solid rgb(235, 235, 235);
  padding: 20px;
  border-radius: 10px;
}
</style>
