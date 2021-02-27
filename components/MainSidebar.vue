<template>
  <nly-sidebar-container variant="darkLightblue" elevation side-mini>
    <nly-sidebar-brand to="/">
      <b-img-lazy
        src="~/assets/icon.png"
        class="brand-image img-circle"
      />
      <nly-sidebar-brandtext weight>
        <b>鲨手酒吧</b>
      </nly-sidebar-brandtext>
    </nly-sidebar-brand>
    <nly-sidebar>
      <nly-sidebar-userpanel
        v-if="isLoggedIn"
        class="mt-3 pb-3 mb-3 d-flex"
      >
        <nly-sidebar-userpanel-img
          v-if="!!getUserAvatar()"
          :src="getUserAvatar()"
        />
        <b-avatar v-else class="pl-1" />
        <nly-sidebar-userpanel-info
          href="javascript:void(0);"
          title="点击注销登录"
          @click.prevent="logout"
        >
          {{ getUserDisplayName() }}
        </nly-sidebar-userpanel-info>
      </nly-sidebar-userpanel>
      <nly-sidebar-userpanel
        v-else
        class="mt-3 pb-3 mb-3 d-flex"
      >
        <b-avatar class="pl-1" />
        <nly-sidebar-userpanel-info
          to="login"
        >
          登录
        </nly-sidebar-userpanel-info>
      </nly-sidebar-userpanel>
      <nly-sidebar-nav class="mt-2" legacy flat child-indent>
        <nly-sidebar-nav-item icon="nav-icon" to="/">
          <template #icon>
            <fa icon="tachometer-alt" />
          </template>
          档案
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" to="/observation">
          <template #icon>
            <fa icon="eye" />
          </template>
          观测站
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" to="/bar">
          <template #icon>
            <fa icon="th" />
          </template>
          吧台
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" to="/game">
          <template #icon>
            <fa icon="gamepad" />
          </template>
          合成大钢板
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" to="/treasury">
          <template #icon>
            <fa icon="gift" />
          </template>
          藏宝阁
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" to="/about">
          <template #icon>
            <fa icon="user" />
          </template>
          关于我们
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" target="_blank" rel="noopener" href="https://mzh.moegirl.org.cn/zh-hans/%E9%9B%A8%E8%A1%97F">
          <template #icon>
            <fa icon="external-link-alt" />
          </template>
          萌娘百科
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon" target="_blank" rel="noopener" href="https://space.bilibili.com/118754720/">
          <template #icon>
            <fa icon="external-link-alt" />
          </template>
          哔哩哔哩
        </nly-sidebar-nav-item>
      </nly-sidebar-nav>
    </nly-sidebar>
    <b-img-lazy id="bottom-image" src="~/assets/stareye.png" class="position-absolute w-100" />
  </nly-sidebar-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'

export default Vue.extend({
  data () {
    return {
      isLoggedIn: !!AV.User.current()
    }
  },
  computed: {
  },
  mounted () {
    setInterval(this.checkIsLoggedIn, 500)
  },
  methods: {
    checkIsLoggedIn () {
      this.isLoggedIn = !!AV.User.current()
    },
    getUserDisplayName () {
      return AV.User.current()?.get('nickname')
    },
    getUserAvatar () {
      return AV.User.current()?.get('avatar')
    },
    logout () {
      AV.User.logOut()
    }
  }
})
</script>

<style lang="stylus" scoped>
#bottom-image {
  left: 0;
  bottom: 0;
}

.main-sidebar * {
  background-color: #304156 !important;
  font-size: 0.98em !important;
}

.main-sidebar .nav-sidebar .nav-item a {
  padding: 1rem;
}

.main-sidebar p{
  padding-left: 10px;
  font-size: 14px;
}
.layout-navbar-fixed .wrapper .main-sidebar:hover .brand-link ,
.layout-navbar-fixed .wrapper.sidebar-collapse .main-sidebar:hover .brand-link ,
.layout-xl-navbar-fixed .wrapper.sidebar-collapse .main-sidebar:hover .brand-link ,
.layout-xl-navbar-fixed .wrapper .brand-link ,
.layout-navbar-fixed .wrapper .brand-link ,
.layout-sm-navbar-fixed .wrapper.sidebar-collapse .main-sidebar:hover .brand-link ,
.layout-sm-navbar-fixed .wrapper .brand-link ,
.layout-md-navbar-fixed .wrapper.sidebar-collapse .main-sidebar:hover .brand-link ,
.layout-md-navbar-fixed .wrapper .brand-link ,
.layout-lg-navbar-fixed .wrapper.sidebar-collapse .main-sidebar:hover .brand-link ,
.layout-lg-navbar-fixed .wrapper .brand-link ,
.layout-xl-navbar-fixed .wrapper.sidebar-collapse .main-sidebar:hover .brand-link ,
.layout-xl-navbar-fixed .wrapper .brand-link ,
.main-sidebar, .main-sidebar::before ,
.layout-fixed .brand-link ,
.sidebar-mini.sidebar-collapse .main-sidebar:hover, .sidebar-mini.sidebar-collapse .main-sidebar.sidebar-focused ,
.sidebar-mini.sidebar-collapse .main-sidebar:hover .brand-link, .sidebar-mini.sidebar-collapse .main-sidebar.sidebar-focused .brand-link ,
.sidebar-mini.sidebar-collapse.layout-fixed .main-sidebar:hover .brand-link ,
.sidebar-mini-md.sidebar-collapse .main-sidebar:hover, .sidebar-mini-md.sidebar-collapse .main-sidebar.sidebar-focused ,
.sidebar-mini-md.sidebar-collapse .main-sidebar:hover .brand-link, .sidebar-mini-md.sidebar-collapse .main-sidebar.sidebar-focused .brand-link ,
.sidebar-mini-md.sidebar-collapse.layout-fixed .main-sidebar:hover .brand-link ,
.control-sidebar, .control-sidebar::before {
  width: 200px;
}

</style>
