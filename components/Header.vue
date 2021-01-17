<template>
  <nly-wrapper-header>
    <nly-navbar variant="light">
      <!-- Navbar left -->
      <nly-navbar-nav>
        <nly-nav-item
          v-nly-sidebar-collapse.sidebar-collapse
          data-widget="pushmenu"
          href="#"
        >
          <fa icon="bars" />
        </nly-nav-item>
        <nly-nav-text>
          <nly-breadcrumb :items="breadcrumbItems" class="my-0" />
        </nly-nav-text>
      </nly-navbar-nav>
    </nly-navbar>
  </nly-wrapper-header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    breadcrumbItems () {
      return this.$store.state.breadcrumbItems
    }
  }
})
</script>

<style scope>
ol.breadcrumb {
  background-color: transparent;
}
</style>
