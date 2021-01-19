<template>
  <nly-wrapper layout="fixed" navbar-fixed footer-fixed>
    <Header :route-names="routeNames" />
    <MainSidebar />
    <nly-content-wrapper>
      <nly-content-header>
        <b-container fluid class="text-center">
          <fa icon="wrench" class="wrench position-relative" />
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

Vue.directive('resize', {
  bind (el, binding) {
    let width: string | undefined = ''
    let height: string | undefined = ''
    function get () {
      const style = document.defaultView?.getComputedStyle(el)
      if (width !== style?.width || height !== style?.height) {
        binding.value({ width, height })
      }
      width = style?.width
      height = style?.height
    }

    (el as any).__vueReize__ = setInterval(get, 10)
  },
  unbind (el) {
    clearInterval((el as any).__vueReize__)
  }
})

export default Vue.extend({
  data () {
    return {
      routeNames: {
        index: {
          text: '档案',
          to: '/'
        },
        observation: {
          text: '观测站',
          to: '/observation'
        },
        bar: {
          text: '吧台',
          to: 'bar'
        },
        brother: {
          text: '成员',
          to: 'brother'
        }
      }
    }
  }
})
</script>

<style lang="css" scope>
body {
  /* TODO: image url */
  background-image: url('http://amemachif.com/static/img/bg.2c9052ee.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: 65% 0%;
}

.wrapper {
  opacity: 0.85;
}

.wrench {
  animation: wrench 1s infinite;
  top: 0.3em;
}

@keyframes wrench {
  0% {
    transform:rotate(0deg);
  }

  50% {
    transform:rotate(90deg) translateY(0.2em) translateX(-0.6em);
  }

  100% {
    transform:rotate(0deg);
  }
}
</style>
