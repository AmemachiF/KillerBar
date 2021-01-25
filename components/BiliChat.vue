<template>
  <b-container>
    <iframe :src="`https://comen.3shain.com/comment?p=bilibili&id=${roomid}`" frameborder="0" seamless width="100%" height="100%" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    roomid: {
      type: Number,
      default: 0
    }
  }
})
</script>
