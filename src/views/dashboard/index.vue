<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gql from "graphql-tag";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
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
