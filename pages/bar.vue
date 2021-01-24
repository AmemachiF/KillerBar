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
    this.fetchAudios()
  },
  methods: {
    fetchAudios () {
      const audioBase = 'http://qiniu.amemachif.ioit.pub/audio/'
      const query = new AV.Query('Audio')
      query.find().then((res) => {
        res.forEach((a) => {
          const g = this.audio.find(p => p.name === a.get('group'))
          const v: Voice = {
            filename: a.get('filename'),
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
      })
      // this.$axios.get('https://api.amemachif.com:2333/audio')
      //   .then((res) => {
      //     if (res.data.code === 20000) {
      //       const data = res.data.data
      //       data.forEach((g: any) => {
      //         const vg: VoiceGroup = {
      //           name: g.group,
      //           voices: []
      //         }
      //         g.content.forEach((a: any) => {
      //           vg.voices.push({
      //             filename: a.src,
      //             text: a.text,
      //             src: new URL(a.filename, audioBase).toString()
      //           })
      //         })
      //         this.audio.push(vg)
      //       })
      //     }
      //   })
      //   .catch((_) => {
      //     // TODO: Catch
      //   })
    }
  }
})
</script>
