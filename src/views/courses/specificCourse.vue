<template>
    <b-card-body>
        <b-card-text> {{id}} {{ courseById }}</b-card-text>
    </b-card-body>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Course',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    test: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      courseById: null,
      executed: false
    }
  },
  methods: {
    triggerMyQuery() {
      this.$apollo.queries.courseById.skip = false
      this.$apollo.queries.courseById.refetch()
    }
  },
  watch: {
    test: {
      deep: true,
      handler: function(newVal, oldVal) {
        if (newVal[this.index] && !this.executed) {
          this.executed = true
          this.triggerMyQuery()
        }
      }
    }
  },
  apollo: {
    courseById: {
      query: gql`query CourseById($id: String!){
        courseById(id: $id){
          id_students
        }
      }`,
      variables () {
        return {
          id: this.id,
        }
      },
      skip: true
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
