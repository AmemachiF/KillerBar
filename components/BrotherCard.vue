<template>
  <b-card no-body class="brotherCard overflow-hidden" :img-src="brother.avatar" img-left>
    <b-card-body :title="brother.name">
      <b-card-text>{{ brother.signature }}</b-card-text>
    </b-card-body>
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
  width: 4rem;
  height: 4rem;
}

.brotherCard .card-title
,.brotherCard .card-text {
  padding: 5px;
  font-size: 14px;
}

.brotherCard .card-body {
  padding: 5px;
}

.brotherCard {
  height: 4rem;
  box-shadow:0 0 0;
}
</style>
