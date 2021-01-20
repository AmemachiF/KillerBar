<template>
  <div>
    <b-card v-for="a in voices" :key="a.name" :header="a.name">
      <b-button v-for="v in a.voices" :key="v.text" class="text-nowrap m-1" @click="playAudio(v)">
        <b-progress v-if="playingSrc === v.src" class="" height="1px" max="100">
          <b-progress-bar :value="playingPlayed" variant="primary" />
          <b-progress-bar :value="playingLoaded - playingPlayed" variant="secondary" />
        </b-progress>
        {{ v.text }}
      </b-button>
    </b-card>
    <audio
      ref="audio"
      preload="auto"
      @progress="progress"
      @canplaythrough="play"
      @timeupdate="timeupdate"
      @ended="ended"
      @loadeddata="progress"
      @loadedmetadata="progress"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export declare type Voice = {
  src: string,
  text: string
}

export declare type VoiceGroup = {
  name: string,
  voices: Voice[]
}

export default Vue.extend({
  props: {
    voices: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      playingSrc: '',
      playingLoaded: 0,
      playingPlayed: 0
    }
  },
  mounted () {
  },
  methods: {
    playAudio (v: Voice) {
      this.playingLoaded = 0
      this.playingPlayed = 0
      this.playingSrc = v.src
      const audio = this.$refs.audio as any
      console.log(audio)
      audio.src = v.src
      audio.load()
      // audio.play()
    },
    progress (event: any) {
      const audio = event.target
      this.progressSet(audio)
    },
    play (event: any) {
      event.target.play()
    },
    timeupdate (event: any) {
      const audio = event.target
      this.progressSet(audio)
    },
    progressSet (audio: any) {
      const buffered = audio.buffered.length > 0 ? audio.buffered.end(0) : 0
      this.playingLoaded = 100 * buffered / audio.duration
      this.playingPlayed = 100 * audio.currentTime / audio.duration
    },
    ended () {
      this.playingSrc = ''
      this.playingLoaded = 0
      this.playingPlayed = 0
    }
  }
})
</script>
