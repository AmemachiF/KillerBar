<template>
  <nly-sidebar-container variant="darkLightblue" elevation side-mini>
    <nly-sidebar-brand to="/">
      <!-- TODO: Image src -->
      <b-img-lazy
        src="~/assets/icon.png"
        class="brand-image img-circle"
      />
      <nly-sidebar-brandtext weight>
        <b>鲨手酒吧</b>
      </nly-sidebar-brandtext>
    </nly-sidebar-brand>
    <nly-sidebar>
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
        <nly-sidebar-nav-item icon="nav-icon" to="/brother">
          <template #icon>
            <fa icon="user" />
          </template>
          成员
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
export default Vue.extend({})
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
