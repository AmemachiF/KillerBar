<template>
  <nly-wrapper-header>
    <nly-navbar variant="white">
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
          <b-breadcrumb :items="items" class="my-0 py-0" />
        </nly-nav-text>
      </nly-navbar-nav>
    </nly-navbar>
  </nly-wrapper-header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    routeNames: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    const items: any[] = []
    return {
      items
    }
  },
  watch: {
    $route () {
      this.breadcrumbItems()
    }
  },
  created () {
    this.breadcrumbItems()
  },
  methods: {
    breadcrumbItems () {
      const currName = this.$route.name!
      const curr = this.routeNames[currName]
      const items = [
        {
          text: 'Killer Bar',
          to: '/'
        }
      ]
      items.push(curr)
      this.items = items
    }
  }
})
</script>

<style lang="css" scope>
ol.breadcrumb {
  background-color: transparent;
}
</style>
