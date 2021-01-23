<template>
  <div class="voiceCard">
    <b-card v-for="a in voices" :key="a.name" :header="a.name">
      <b-button v-for="v in a.voices" :key="v.filename" class="text-nowrap m-1 position-relative" :class="showProgress(v) ? 'button-trans' : ''" @click="playAudio(v)">
        <div v-if="showProgress(v)" class="voice-progress">
          <b-progress max="100" height="100%">
            <b-progress-bar :value="playingPlayed" variant="primary" />
            <b-progress-bar :value="playingLoaded - playingPlayed" variant="secondary" />
          </b-progress>
        </div>
        <div>
          <span>{{ v.text }}</span>
          <b-badge variant="light" pill class="badge-corner">
            {{ getClick(v.filename, 'clickPV') }}
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
  text: string
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
    return {
      playingName: '',
      playingLoaded: 0,
      playingPlayed: 0,
      voiceClicks
    }
  },
  watch: {
    voices () {
      this.fetchClick()
    }
  },
  mounted () {
    this.fetchClick()
  },
  methods: {
    playAudio (v: Voice) {
      this.playingLoaded = 0
      this.playingPlayed = 0
      this.playingName = v.filename
      const audio = this.$refs.audio as any
      audio.src = v.src
      audio.load()
      this.incClick(v)
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
      this.playingName = ''
      this.playingLoaded = 0
      this.playingPlayed = 0
    },
    showProgress (v: any) {
      return this.playingName === v.filename
    },
    incClick (v: Voice) {
      const query = new AV.Query('Audio')
      query.equalTo('filename', v.filename)
      query.first().then((audio) => {
        if (audio) {
          if (audio instanceof AV.Object) {
            audio.increment('click_pv')
          } else {
            return
          }
        } else {
          audio = new AV.Object('Audio')
          audio.set('filename', v.filename)
          audio.set('click_pv', 1)
        }
        audio.save(null, {
          fetchWhenSave: true
        }).then((a) => {
          const click = this.voiceClicks.find(p => p.name === v.filename)
          const name = a.get('filename')
          const clickPV = a.get('click_pv')
          if (click) {
            click.clickPV = clickPV
          } else {
            this.voiceClicks.push({
              name,
              clickPV
            })
          }
        })
      })
    },
    fetchClick () {
      const query = new AV.Query('Audio')
      // console.log(this.voices)
      query.find().then((audios) => {
        audios.forEach((a) => {
          const name = a.get('filename')
          const clickPV = a.get('click_pv')
          const click = this.voiceClicks.find(p => p.name === name)
          if (click) {
            click.clickPV = clickPV
          } else {
            this.voiceClicks.push({
              name,
              clickPV
            })
          }
        })
      })
    },
    getClick (name: string, key: keyof VoiceClick) {
      const click = this.voiceClicks.find(p => p.name === name)
      if (click) {
        return key in click ? click[key] : 0
      } else {
        return 0
      }
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
