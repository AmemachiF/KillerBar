<template>
  <b-card class="game-aspect">
    <template #header>
      <span>
        {{ !newVersion ? '原版' : '重制版（开发中）' }}
      </span>
      <span class="d-inline float-right">
        <button @click="newVersion = !newVersion">
          切换{{ newVersion ? '原版' : '重制版（开发中）' }}
        </button>
      </span>
    </template>
    <b-card-text>
      <b-aspect aspect="4:7">
        <iframe id="game" frameborder="0" :src="`./synthetic_game${newVersion ? '' : '_old'}/index.html`" />
      </b-aspect>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      newVersion: false
    }
  }
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
  width: calc((100vh - 200px) / 7 * 4);
  max-width: 100%;
}
</style>
