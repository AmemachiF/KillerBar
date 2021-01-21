<template>
  <b-container fluid>
    <VoiceCard :voices="audio" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { VoiceGroup } from '~/components/VoiceCard.vue'

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
      this.$axios.get('https://api.amemachif.com:2333/audio')
        .then((res) => {
          if (res.data.code === 20000) {
            const audioBase = 'https://api.amemachif.com:2333/static/'
            const data = res.data.data
            data.forEach((g: any) => {
              const vg: VoiceGroup = {
                name: g.group,
                voices: []
              }
              g.content.forEach((a: any) => {
                vg.voices.push({
                  filename: a.src,
                  text: a.text,
                  src: new URL(a.src, audioBase).toString()
                })
              })
              this.audio.push(vg)
            })
          }
        })
        .catch((_) => {
          // TODO: Catch
        })
    }
  }
})
</script>
