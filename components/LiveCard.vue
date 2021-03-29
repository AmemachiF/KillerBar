<template>
  <b-card header="直播数据解析">
    <b-card-text>
      直播数据解析。
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
const { KeepLiveWS } = require('bilibili-live-ws')

export default Vue.extend({
  mounted () {
    const live = new KeepLiveWS(4611671)
    live.on('open', () => console.log('您已成功接入树形图设计者。'))
    live.on('live', () => {
      live.on('heartbeat', console.log)
      live.on('DANMU_MSG', (data) => {
        console.log(data.info[2][1] + ' ' + data.info[1])
      })
      live.on('SEND_GIFT', (data) => {
        console.log(data.data.uname + ' ' + data.data.giftName + ' ' + data.data.num)
      })
    })
  }
})
</script>
