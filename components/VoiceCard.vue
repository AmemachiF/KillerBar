<template>
  <div>
    <b-card v-for="group in voices" :key="group.content" :header="group.group">
      <b-row>
        <b-col>
          <b-button v-for="v in group.content" :key="v.src" @click="playAudio(v)" style="margin: 0 10px 10px 0">
            {{ v.text }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

let audio: any

export declare type Voice = {
  src: string,
  text: string
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
  mounted () {
    audio = new Audio()
  },
  methods: {
    playAudio (v: Voice) {
      audio.src = 'https://api.amemachif.com:2333/static/' + v.src
      audio.play()
    }
  }
})
</script>
