<template>
  <b-card header="这你不点一下？">
    <b-row>
      <b-col>
        <b-button-group>
          <b-button v-for="v in voices" :key="v.src" @click="playAudio(v)">
            {{ v.text }}
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-card>
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
      audio.src = v.src
      audio.play()
    }
  }
})
</script>
