<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <ProfileCard v-resize="chartResize" :keys="bossKeys" :info="boss" image="http://amemachif.com/static/img/Amemachi_Hanken.683544ef.png" />
      </b-col>
      <b-col>
        <NoticeCard :avatar="getProperty('avatar', boss, undefined)" />
        <ChartCard ref="chartCard" :charts="charts" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    const charts = [
      {
        id: 'chartIncrease'
      },
      {
        id: 'chartTotal'
      }
    ]
    return {
      bossKeys: [
        { key: 'name', title: '姓名' },
        { key: 'nickname', title: '昵称' },
        { key: 'signature', title: '签名' },
        { key: 'age', title: '年龄' },
        { key: 'birthday', title: '生日' },
        { key: 'constellation', title: '星座' },
        { key: 'hair', title: '发色' },
        { key: 'pupil', title: '瞳色' },
        { key: 'association', title: '所属社团' }
      ],
      boss: {},
      slide: 0,
      charts
    }
  },
  created () {
    this.fetchBoss()
  },
  methods: {
    fetchBoss () {
      this.$axios.get('https://api.amemachif.com:2333/boss')
        .then((res) => {
          if (res.data.code === 20000) {
            this.boss = res.data.data
          } else {
            this.boss = {}
          }
        })
        .catch((_) => {
          this.boss = {}
        })
    },
    getProperty (key: string, value: any, defaults: any): any {
      return key in value ? value[key] : defaults
    },
    chartResize () {
      (this.$refs.chartCard as any).chartResize()
    }
  }
})
</script>

<style lang="css" scoped>
#chartIncrease {
  width: 100%;
  height: 100%;
}
</style>

<style>
.carousel-inner {
  width: 100%;
  height: 100%;
}
</style>
