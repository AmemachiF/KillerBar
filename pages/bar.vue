<template>
  <b-container fluid>
    <VoiceCard :voices="audio" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Voice } from '~/components/VoiceCard.vue'

export default Vue.extend({
  data () {
    const audio: Voice[] = [
      {
        text: '一键mua',
        src: 'http://amemachif.com/static/media/mua.a1eaf3d4.aac'
      },
      {
        text: '一键认爹',
        src: 'http://amemachif.com/static/media/jiaobaba.60c344c1.aac'
      },
      {
        text: '一键吸脑',
        src: 'http://amemachif.com/static/media/xinao.5cfb2538.aac'
      },
      {
        text: '一键牛逼',
        src: 'http://amemachif.com/static/media/niubi.cd4c14f5.aac'
      },
      {
        text: '一键恶心',
        src: 'http://amemachif.com/static/media/exin.1499d557.aac'
      },
      {
        text: '一键很会',
        src: 'http://amemachif.com/static/media/henhui.7e5b63b5.aac'
      }
    ]

    return {
      audio
    }
  }
})
</script>
