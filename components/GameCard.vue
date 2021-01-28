<template>
  <b-card class="game-aspect">
    <b-card-text>
      <b-aspect aspect="4:7">
        <iframe id="game" frameborder="0" src="./synthetic_game/index.html" />
      </b-aspect>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>
<style scoped>
.game-aspect {
  margin: 0 auto;
}

.game-aspect .card-body {
  padding: 0;
}

.game-aspect, #game {
  height: 100%;
  width: calc((100vh - 150px) / 7 * 4);
  max-width: 100%;
}
</style>
