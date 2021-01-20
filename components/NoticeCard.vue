<template>
  <b-card header="公告">
    <b-card-text>
      <b-avatar v-if="avatar" :src="avatar" size="5rem" class="float-left mr-3" />
      雨街F天下第一可爱！
      <br/>
      <fa icon="wrench" class="wrench position-relative" />施工中，前端技术栈是Nuxt.js + BootstrapVue + NlyAdminlteVue
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    avatar: {
      type: String,
      default: undefined
    }
  }
})
</script>
