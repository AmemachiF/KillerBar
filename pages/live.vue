<template>
  <b-container>
    <b-card>
      <template #header>
        <div class="d-inline">
          直播间弹幕
        </div>
        <div class="float-right d-inline">
          <b-link :href="`https://live.bilibili.com/${livenumber}`" target="_blank" rel="noopener">
            <fa icon="external-link-alt" />
            打开直播间
          </b-link>
        </div>
      </template>
      <BiliChat class="bilichat" :livenumber="livenumber" />
    </b-card>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'

export default Vue.extend({
  data () {
    return {
      livenumber: 4611671
    }
  },
  mounted () {
    this.getLiveInfo()
  },
  methods: {
    getLiveInfo () {
      AV.Cloud.run('Bilibili_LiveInfo_GetInfo', {
        uid: 118754720
      }).then((res) => {
        console.log(res)
      })
    }
  }
})
</script>

<style scoped>
.bilichat {
  height: 50vh;
}
</style>
