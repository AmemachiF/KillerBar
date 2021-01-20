<template>
  <div class="voiceCard">
    <b-card v-for="a in voices" :key="a.name" :header="a.name">
      <b-button v-for="v in a.voices" :key="v.text" class="text-nowrap m-1 position-relative" :class="showProgress(v) ? 'button-trans' : ''" @click="playAudio(v)">
        <div v-if="showProgress(v)" class="voice-progress">
          <b-progress max="100" height="100%">
            <b-progress-bar :value="playingPlayed" variant="primary" />
            <b-progress-bar :value="playingLoaded - playingPlayed" variant="secondary" />
          </b-progress>
        </div>
        <div>{{ v.text }}</div>
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
  computed: {
  },
  mounted () {
  },
  methods: {
    playAudio (v: Voice) {
      this.playingLoaded = 0
      this.playingPlayed = 0
      this.playingSrc = v.src
      const audio = this.$refs.audio as any
      audio.src = v.src
      audio.load()
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
    },
    showProgress (v: any) {
      return this.playingSrc === v.src
    }
  }
})
</script>

<style scoped>
.voice-progress {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}

.voiceCard .button-trans {
  opacity: 0.9;
  color: black;
}
</style>
