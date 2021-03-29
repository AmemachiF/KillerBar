<template>
  <div id="player" ref="player" />
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'

export default Vue.extend({
  data () {
    const player: any = undefined
    return {
      player
    }
  },
  mounted () {
    const APlayer = require('aplayer')
    this.player = new APlayer({
      container: this.$refs.player,
      fixed: true,
      audio: []
    })
    Promise.all([this.fetchMusic()])
  },
  methods: {
    async fetchMusic () {
      const query = new AV.Query('Music')
      const music = await query.find()
      this.player.list.clear()
      const baseUrl = 'https://qiniu.amemachif.ioit.pub'
      music.forEach((m) => {
        this.player.list.add({
          name: m.get('name'),
          artist: m.get('artist'),
          url: new URL(m.get('url'), baseUrl).toString(),
          cover: new URL(m.get('cover'), baseUrl).toString(),
          lrc: m.get('lrc'),
          theme: m.get('theme'),
          type: m.get('type')
        })
      })
    }
  }
})
</script>

<style scoped>
#player {
  z-index: 9999;
}
</style>
