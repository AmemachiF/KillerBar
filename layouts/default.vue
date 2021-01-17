<template>
  <nly-wrapper>
    <Header />
    <MainSidebar />
    <nly-content-wrapper>
      <nly-content-header>
        <b-container fluid class="text-center">
          <fa icon="wrench" class="wrench" />
          施工中
          <fa icon="tools" />
        </b-container>
      </nly-content-header>
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

.wrench {
  animation: wrench 1s infinite;
}

@keyframes wrench {
  0% {
    transform:rotate(0deg);
  }

  50% {
    transform:rotate(90deg) translateY(-4px) translateX(-6px);
  }

  100% {
    transform:rotate(0deg);
  }
}
</style>
