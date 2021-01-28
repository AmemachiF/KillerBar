<template>
  <b-container>
    <LiveInfoCard :live-info="liveInfo" :room-info="roomInfo" :room-info-old="roomInfoOld" />
    <!-- <video ref="video" /> -->
    <b-card>
      <template #header>
        <div class="d-inline">
          直播间弹幕
        </div>
        <div class="float-right d-inline">
          <b-link :href="`https://live.bilibili.com/${liveInfo.room_id}`" target="_blank" rel="noopener">
            <fa icon="external-link-alt" />
            打开直播间
          </b-link>
        </div>
      </template>
      <BiliChat class="bilichat" :roomid="liveInfo.room_id" />
    </b-card>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'

export default Vue.extend({
  data () {
    const liveInfo: any = {}
    const roomInfo: any = {}
    const roomInfoOld: any = {}
    const playUrl: any = {}
    return {
      liveInfo,
      roomInfo,
      roomInfoOld,
      playUrl
    }
  },
  watch: {
    playUrl () {
    }
  },
  mounted () {
    Promise.resolve()
      .then(() => {
        return this.getLiveInfo()
      }).then(() => {
        return this.getRoomInfo()
      }).then(() => {
        return Promise.all([this.getRoomPlayUrl(), this.getRoomInfoOld()])
      })
  },
  methods: {
    getLiveInfo () {
      return new Promise<void>((resolve, reject) => {
        AV.Cloud.run('getBilibiliLiveInfo', {
          id: 118754720
        }).then((res) => {
          if (res.code === 0) {
            this.liveInfo = res.data
            resolve()
          } else {
          }
        }).catch((reason) => {
          Promise.resolve().then(() => this.getLiveInfo())
        })
      })
    },
    getRoomInfo () {
      return new Promise<void>((resolve, reject) => {
        AV.Cloud.run('getBilibiliRoomInfo', {
          id: this.liveInfo.room_id
        }).then((res) => {
          if (res.code === 0) {
            this.roomInfo = res.data
            resolve()
          }
        }).catch((reason) => {
          Promise.resolve().then(() => this.getRoomInfo())
        })
      })
    },
    getRoomPlayUrl () {
      return new Promise<void>((resolve, reject) => {
        AV.Cloud.run('getBilibiliRoomPlayUrl', {
          id: this.liveInfo.room_id
        }).then((res) => {
          if (res.code === 0) {
            this.playUrl = res.data
            resolve()
          }
        }).catch((reason) => {
          Promise.resolve().then(() => this.getRoomPlayUrl())
        })
      })
    },
    getRoomInfoOld () {
      return new Promise<void>((resolve, reject) => {
        AV.Cloud.run('getBilibiliRoomInfoOld', {
          id: 118754720
        }).then((res) => {
          if (res.code === 0) {
            this.roomInfoOld = res.data
            resolve()
          }
        }).catch((reason) => {
          Promise.resolve().then(() => this.getRoomInfoOld())
        })
      })
    },
    getPlayUrl () {
      if (this.playUrl?.durl && this.playUrl?.durl.length > 0) {
        return `blob:${this.playUrl?.durl[0]?.url}`
      }
    }
  }
})
</script>

<style scoped>
.bilichat {
  height: 50vh;
}
</style>
