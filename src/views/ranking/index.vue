<template>
  <div class="app-container">
    <el-button
      type="primary"
      round
      size="medium"
      icon="el-icon-refresh"
      @click="updateList"
    >
      Update
    </el-button>
    <el-table border :data="allPuntajes">
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="puntaje" label="Score" width="100px" sortable />
    </el-table>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    allPuntajes: gql`
      query {
        allPuntajes {
          name
          email
          puntaje
        }
      }
    `,
  },
  methods: {
    updateList() {
      this.$apollo.queries.allPuntajes
        .refetch()
        .then(() => {
          this.$message({
            message: "Ranking list updated!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("Error updating Ranking");
        });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

