<template>
  <b-container fluid>
    <VoiceCard :voices="audio" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      audio: {}
    }
  },
  mounted () {
    this.fetchAudio()
  },
  methods: {
    fetchAudio () {
      this.$axios.get('https://api.amemachif.com:2333/audio')
        .then((res) => {
          if (res.data.code === 20000) {
            this.audio = res.data.data
          } else {
            this.audio = {}
          }
        })
        .catch((_) => {
          this.audio = {}
        })
    }
  }
})
</script>
