<template>
  <b-card no-body class="brotherCard overflow-hidden" :img-src="brother.avatar" img-left>
    <!-- <b-row no-gutters> -->
    <!-- <b-col md="6">
        <b-card-img-lazy :src="brother.avatar" class="rounded-0" fluid-grow />
      </b-col>
      <b-col md="6"> -->
    <b-card-body :title="brother.name">
      <b-card-text>{{ brother.signature }}</b-card-text>
    </b-card-body>
    <!-- </b-col> -->
    <!-- </b-row> -->
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'

export declare type Brother = {
  id: number,
  avatar: string,
  name: string,
  signature: string,
  updateTime: string
}

export default Vue.extend({
  props: {
    brother: {
      type: Object,
      default () {
        return {}
      }
    }
  }
})
</script>

<style>
.brotherCard img {
  max-width: 100%;
  max-height: 100%;
  width: 10em;
  height: 10em;
}

.brotherCard .card-title {
  margin-bottom: 1rem;
}

.brotherCard {
  height: 10em;
}
</style>
