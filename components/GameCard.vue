<template>
  <b-card>
    <b-card-text>
      <iframe id="game" :style="gameSize" frameborder="0" src="./synthetic_game/index.html" />
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

  data () {
    return {
      gameSize: {
        width: '',
        height: ''
      }
    }
  },
  created () {
    this.changeGameSize()
  },
  methods: {
    changeGameSize () {
      this.gameSize.height = (global.innerHeight - 135) + 'px'
      this.gameSize.width = (global.innerHeight - 135) / 700 * 400 + 'px'
    }
  }
})
</script>
<style>
.card-body{
  padding: 0;
}
</style>
