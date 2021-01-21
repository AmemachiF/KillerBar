<template>
  <nly-wrapper-footer>
    <div class="d-none d-sm-inline">
      @{{ date() }}
      <span id="busuanzi_container_site_pv">
        本酒吧累积接单
        <span id="busuanzi_value_site_pv" />次
      </span>
      |
      <span id="busuanzi_container_site_uv">
        共有
        <span id="busuanzi_value_site_uv" />个顾客下单
      </span>
    </div>
    <div class="float-right d-none d-sm-inline">
      <span>Version</span>
      <strong v-if="versionUrl !== ''">
        <b-link :href="versionUrl" target="_blank" rel="noopener">{{ version }}</b-link>
      </strong>
      <strong v-else>{{ version }}</strong>
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
        ? new URL(process.env.appRevision, 'https://github.com/AmemachiF/Killer_Bar/tree/')
        : (process.env.appVersionUrl && process.env.appVersionUrl !== '') ? process.env.appVersionUrl : ''
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
