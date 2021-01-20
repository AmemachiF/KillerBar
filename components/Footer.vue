<template>
  <nly-wrapper-footer>
    <div class="d-none d-sm-inline">
      @{{ date() }}
    </div>
    <div class="float-right d-none d-sm-inline">
      Version <strong v-if="versionUrl !== ''"><b-link :href="versionUrl">{{ version }}</b-link></strong><strong v-else>{{ version }}</strong>
    </div>
  </nly-wrapper-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      dateFrom: 2020,
      version: process.env.appVersion ?? 'SNAPSHOT',
      versionUrl: (process.env.appRevision && process.env.appRevision !== '')
        ? new URL(process.env.appRevision, 'https://github.com/AmemachiF/Killer_Bar/tree/') : ''
    }
  },
  methods: {
    date () {
      const now = new Date().getFullYear()
      if (this.dateFrom === now) {
        return now
      } else {
        return this.dateFrom + '-' + now
      }
    }
  }
})
</script>
