<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <b-avatar :src="getAvatar()" size="4em" />
        <b-img-lazy v-if="getPendant()" :src="getPendant()" class="pendant" />
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            {{ getUName() }}
            <span class="modal-name">
              {{ getMedalName() }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <span :class="`live-${getRoomStatus()}`">{{ getRoomStatusText() }}</span>
            <span class="text-info">
              {{ getTitle() }}
            </span>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="auto">
        <b-img-lazy :src="getCover()" height="100%" class="cover" />
        <div>
          <span class="live-status text-nowrap" :class="`live-${getRoomStatus()}`">
            <fa icon="circle" class="dot" />
            {{ getRoomStatusText() }}
          </span>
        </div>
        <b-link :href="getUrl()" target="_blank" rel="noopener">
          <div class="cover-overlay">
            <fa icon="play-circle" class="cover-play-circle" />
          </div>
        </b-link>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    liveInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    roomInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    roomInfoOld: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    getAvatar () {
      return this.liveInfo?.info?.face
    },
    getUName () {
      return this.liveInfo?.info?.uname
    },
    getRoomStatus () {
      // eslint-disable-next-line camelcase
      return this.roomInfo?.live_status
    },
    getRoomStatusText () {
      // eslint-disable-next-line camelcase
      switch (this.roomInfo?.live_status) {
        case 0:
          return '未开播'
        case 1:
          return '直播中'
        case 2:
          return '轮播中'
        default:
          return '未知'
      }
    },
    getMedalName () {
      // eslint-disable-next-line camelcase
      return this.liveInfo?.medal_name
    },
    getPendant () {
      return this.liveInfo?.pendant
    },
    getCover () {
      return this.roomInfoOld?.cover
    },
    getUrl () {
      return this.roomInfoOld?.url
    },
    getTitle () {
      return this.roomInfoOld?.title
    }
  }
})
</script>

<style scoped>
.cover {
  border-radius: 0.5em;
}

.cover-overlay:hover {
  opacity: 0.5;
}

.cover-overlay {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 7.5px;
  background-color: grey;
  width: calc(100% - 15px);
  height: 100%;
  border-radius: 0.5rem;
  transition: opacity 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
}

.cover-play-circle {
  color: white !important;
  opacity: 1 !important;
}

.live-status {
  display: inline-block;
  border: 0.1em grey solid;
  font-size: 0.5em;
  padding: 0 0.5rem;
  border-radius: 1em;
  position: absolute;
  right: 1.5em;
  top: 0.5em;
  background-color: white;
}

.live-0 {
  color: grey;
  border-color: grey;
}

.live-1 {
  color: red;
  border-color: red;
}

.live-2 {
  color: orange;
  border-color: orange;
}

.modal-name {
  display: inline-block;
  font-size: 0.6em;
  padding: 0 0.3rem;
  border-radius: 0.3em;
  color: white;
  background-color: #5d7b9e;
}

.pendant {
  position: absolute;
  width: 5em;
  height: 5em;
  left: 0;
  top: -0.6em;
}

.dot {
  position: relative;
  top: -0.2em;
}
</style>
