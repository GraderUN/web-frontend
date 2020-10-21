<template>
  <div class="parentDiv">

    <div style="font-size:25px; font-weight:bold; margin-bottom:20px">PERFILES</div>

    <createProfile class="aux2" />
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import CreateProfile from './createProfile'
export default {
  name: 'Request',
  components: { CreateProfile },
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
