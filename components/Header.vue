<template>
  <nly-wrapper-header>
    <nly-navbar :variant="$colorMode.value">
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

      <nly-navbar-nav class="ml-auto">
        <nly-nav-dropdown menu-direction="right" dropdown-toggle>
          <template v-slot:linkcontent>
            Themes: {{ getColorModeDisplay($colorMode.value) }}
          </template>
          <template v-slot:menucontent>
            <nly-dropdown-item v-for="m in colorModes" :key="m.mode" :active="getColorMode() === m.mode" @click.prevent="setColorMode(m.mode)">
              {{ m.display }}
            </nly-dropdown-item>
          </template>
        </nly-nav-dropdown>
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
    const colorModes = [
      {
        mode: 'system',
        display: 'System'
      },
      {
        mode: 'light',
        display: 'Light'
      },
      {
        mode: 'dark',
        display: 'Dark'
      },
      {
        mode: 'sepia',
        display: 'Sepia'
      }
    ]
    return {
      colorModes,
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
          text: '鲨手酒吧',
          to: '/'
        }
      ]
      items.push(curr)
      this.items = items
    },
    setColorMode (mode: string) {
      this.$colorMode.preference = mode
    },
    getColorModeDisplay (mode: string) {
      return this.colorModes.find(p => p.mode === mode)?.display
    },
    getColorMode () {
      return this.$colorMode.preference
    }
  }
})
</script>

<style lang="css" scope>
ol.breadcrumb {
  background-color: transparent;
}

@media (min-width: 768px) {
  body:not(.sidebar-mini-md) .content-wrapper,
  body:not(.sidebar-mini-md) .main-footer,
  body:not(.sidebar-mini-md) .main-header,
  .sidebar-mini-md .content-wrapper,
  .sidebar-mini-md .main-footer,
  .sidebar-mini-md .main-header {
    margin-left: 200px !important;
  }
}
@media (max-width: 991.98px){
  body:not(.sidebar-mini-md) .content-wrapper,
  body:not(.sidebar-mini-md) .content-wrapper:before,
  body:not(.sidebar-mini-md) .main-footer,
  body:not(.sidebar-mini-md) .main-footer:before,
  body:not(.sidebar-mini-md) .main-header,
  body:not(.sidebar-mini-md) .main-header:before {
    margin-left: 0 !important;
  }
}
</style>
