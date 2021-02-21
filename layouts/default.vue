<template>
  <nly-wrapper layout="fixed" navbar-fixed footer-fixed>
    <Header :route-names="routeNames" :breadcrumb-items="breadcrumbItems" />
    <MainSidebar />
    <nly-content-wrapper>
      <nly-content style="padding-top: 15px">
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
    const breadcrumbItems: any[] = []
    return {
      title: process.env.websiteName,
      breadcrumbItems,
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
          to: '/bar'
        },
        brother: {
          text: '成员',
          to: '/brother'
        },
        game: {
          text: '合成大钢板',
          to: '/game'
        },
        treasury: {
          text: '藏宝阁',
          to: '/treasury'
        },
        about: {
          text: '关于我们',
          to: '/about'
        }
      }
    }
  },
  watch: {
    $route () {
      this.routeChange()
    }
  },
  mounted () {
    this.routeChange()
  },
  methods: {
    routeChange () {
      const currName = this.$route.name!
      const curr = this.routeNames[currName]
      const items = [
        {
          text: process.env.websiteName,
          to: '/'
        }
      ]
      items.push(curr)
      this.title = items.reverse().map(p => p.text).join(' - ')
      this.breadcrumbItems = items
    }
  },
  head () {
    const items = [process.env.websiteName]
    if (this.$route.name) {
      items.push(this.$data.routeNames[this.$route.name].text)
    }
    return {
      title: items.reverse().join(' - ')
    }
  }
})
</script>

<style lang="css" scope>
html {
  cursor: url('~assets/stareye.png');
}

body {
  background-image: url('~assets/bg.jpg');
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

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: #f6f6f6;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #747474;
}
::-webkit-scrollbar-corner {
  background: #f6f6f6;
}
</style>

<style lang="stylus">
.light-mode {
  body {
    background-color: #fff;
    color: rgba(0,0,0,0.8);
  }
}
.dark-mode {
  body {
    background-color: #091a28;
    color: #ebf4f1;
  }
}
.sepia-mode {
  body, .content-wrapper {
    background-color: #f1e7d0;
    color: #433422;
  }
  //  .card {
  //    background-color: #f1e7d0;
  //  }
}
</style>
