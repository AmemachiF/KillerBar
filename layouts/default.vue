<template>
  <nly-wrapper>
    <Header />
    <MainSidebar />
    <nly-content-wrapper>
      <nly-content-header />
      <nly-content>
        <Nuxt />
      </nly-content>
    </nly-content-wrapper>
    <Footer />
    <nly-overlay v-nly-sidebar-collapse.overlay sidebar />
  </nly-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head: {
    bodyAttrs: {
      // class: 'sidebar-mini layout-fixed'
    }
  }
})
</script>

<style scope>
  .wrapper {
    opacity: 0.85;
  }
</style>
