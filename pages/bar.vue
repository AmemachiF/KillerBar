<template>
  <b-container fluid>
    <VoiceCard :voices="audio" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'
import { VoiceGroup, Voice } from '~/components/VoiceCard.vue'

export default Vue.extend({
  data () {
    const audio: VoiceGroup[] = []

    return {
      audio
    }
  },
  mounted () {
    Promise.all([
      this.fetchAudios()
    ]).catch((error) => {
      this.$sentry.captureException(error)
    })
  },
  methods: {
    async fetchAudios () {
      try {
        const audioBase = 'http://qiniu.amemachif.ioit.pub/audio/'
        const query = new AV.Query('Audio')
        const res = await query.limit(1000).descending('click_pv').find()
        res.forEach((a) => {
          const g = this.audio.find(p => p.name === a.get('group'))
          const v: Voice = {
            filename: a.get('name') + '.aac',
            src: new URL(a.get('name') + '.aac', audioBase).toString(),
            text: a.get('text'),
            clickPV: a.get('click_pv'),
            obj: a.toFullJSON()
          }
          if (g) {
            g.voices.push(v)
          } else {
            this.audio.push({
              name: a.get('group'),
              voices: [v]
            })
          }
        })
      } catch (error) {
        this.$sentry.captureException(error)
      }
    }
  }
})
</script>
