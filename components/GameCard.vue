<template>
  <b-card>
    <b-card-text>
      <iframe id="game" :style="gameSize" frameborder="0" src="./game_src/index.html"/>
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
      this.gameSize.width = global.innerWidth - 35 + 'px'
      this.gameSize.height = (global.innerWidth - 35) / 400 * 700 + 'px'
    }
  }
})
</script>
<style>
.card-body{
  padding: 0;
}
</style>
