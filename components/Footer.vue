<template>
  <nly-wrapper-footer>
    <div class="d-none d-sm-inline">
      @{{ date() }}
    </div>
    <div class="float-right d-none d-sm-inline" />
  </nly-wrapper-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      dateFrom: 2020
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
