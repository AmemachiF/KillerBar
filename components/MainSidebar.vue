<template>
  <nly-sidebar-container variant="darkLightblue" elevation>
    <nly-sidebar-brand to="/">
      <b-img
        src="https://via.placeholder.com/150"
        class="brand-image img-circle elevation-3"
      />
      <nly-sidebar-brandtext weight>
        Killer Bar
      </nly-sidebar-brandtext>
    </nly-sidebar-brand>
    <nly-sidebar>
      <nly-sidebar-nav class="mt-2" legacy flat child-indent>
        <nly-sidebar-nav-item icon="nav-icon fas fa-tachometer-alt" to="/">
          档案
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon fas fa-eye" to="/observation">
          观测站
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon fas fa-th" to="/bar">
          吧台
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon fas fa-user" to="/brother">
          成员
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon fas fa-external-link-alt" target="_blank" rel="noopener" href="https://mzh.moegirl.org.cn/zh-hans/%E9%9B%A8%E8%A1%97F">
          萌娘百科
        </nly-sidebar-nav-item>
        <nly-sidebar-nav-item icon="nav-icon fas fa-external-link-alt" target="_blank" rel="noopener" href="https://space.bilibili.com/118754720/">
          哔哩哔哩
        </nly-sidebar-nav-item>
      </nly-sidebar-nav>
    </nly-sidebar>
  </nly-sidebar-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scope>
aside.main-sidebar {
  background-color: #304156;
}

.main-sidebar .nav-sidebar .nav-item a {
  padding: 1rem;
}
</style>
