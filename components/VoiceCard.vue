<template>
  <div class="voiceCard">
    <b-card v-for="a in voices" :key="a.name" :header="a.name">
      <b-button v-for="v in a.voices" :key="v.filename" class="text-nowrap m-1 position-relative" :class="showProgress(v) ? 'button-trans' : ''" @click="playAudio(v)">
        <div v-if="showProgress(v)" class="voice-progress">
          <b-progress max="100" height="100%">
            <b-progress-bar :value="playingPlayed" variant="primary" striped animated />
            <b-progress-bar :value="playingLoaded - playingPlayed" variant="secondary" striped animated />
          </b-progress>
        </div>
        <div>
          <span>{{ v.text }}</span>
          <b-badge variant="light" pill class="badge-corner">
            {{ v.clickPV }}
          </b-badge>
        </div>
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
import AV from 'leancloud-storage'

export declare type Voice = {
  filename: string,
  src: string,
  text: string,
  clickPV: number,
  obj: any
}

export declare type VoiceGroup = {
  name: string,
  voices: Voice[]
}

declare type VoiceClick = {
  name: string,
  clickPV?: number
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
    const voiceClicks: VoiceClick[] = []
    const timeCounter: any = undefined
    return {
      playingName: '',
      playingLoaded: 0,
      playingPlayed: 0,
      voiceClicks,
      timeCounter
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    playAudio (v: Voice) {
      try {
        clearInterval(this.timeCounter)
        this.timeCounter = undefined
        this.playingLoaded = 0
        this.playingPlayed = 0
        this.playingName = v.filename
        const audio = this.$refs.audio as any
        audio.src = v.src
        audio.load()
        this.timeCounter = setInterval(() => {
          this.progressSet(this.$refs.audio)
        }, 100)
        this.incClick(v)
      } catch (error) {
        this.$sentry.captureException(error)
      }
    },
    progress (event: any) {
      try {
        const audio = event.target
        this.progressSet(audio)
      } catch (error) {
        this.$sentry.captureException(error)
      }
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
      this.playingLoaded = 100
      this.playingPlayed = 100
      this.playingName = ''
      this.playingLoaded = 0
      this.playingPlayed = 0
      clearInterval(this.timeCounter)
      this.timeCounter = undefined
    },
    showProgress (v: any) {
      return this.playingName === v.filename
    },
    incClick (v: Voice) {
      const obj = AV.parseJSON(v.obj)
      obj.increment('click_pv')
      obj.save(null, {
        fetchWhenSave: true
      }).then((a: any) => {
        v.clickPV = a.get('click_pv')
      }).catch((error) => {
        this.$sentry.captureException(error)
      })
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

.badge-corner {
  position: absolute;
  right: -0.5em;
  top: -0.5em;
  background-color: #4d5b6d !important;
  color: white !important;
}
</style>
