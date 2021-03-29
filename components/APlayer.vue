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
      lrcType: 3,
      preload: 'none',
      audio: []
    })
    Promise.all([this.fetchMusic()]).catch((error) => {
      this.$sentry.captureException(error)
    })
  },
  methods: {
    async fetchMusic () {
      const query = new AV.Query('Music')
      const music = await query.find()
      this.player.list.clear()
      const baseUrl = 'https://qiniu.amemachif.ioit.pub'
      music.sort((a, b) => a.get('order') - b.get('order')).forEach((m) => {
        const url = m.get('url')
        const cover = m.get('cover')
        const lrc = m.get('lrc')
        this.player.list.add({
          name: m.get('name'),
          artist: m.get('artist'),
          url: this.getRealUrl(url, baseUrl),
          cover: this.getRealUrl(cover, baseUrl),
          lrc: this.getRealUrl(lrc, baseUrl) ?? '',
          theme: m.get('theme'),
          type: m.get('type')
        })
      })
    },
    getRealUrl (url: string, baseUrl: string): string {
      if (url) {
        return url.startsWith('http://') || url.startsWith('https://') ? url : new URL(url, baseUrl).toString()
      } else {
        return url
      }
    },
    async getLrc (url: string): Promise<string> {
      if (url) {
        return await this.$axios.$get(url)
      } else {
        return ''
      }
    }
  }
})
</script>

<style scoped>
#player {
  z-index: 9999;
}
</style>
