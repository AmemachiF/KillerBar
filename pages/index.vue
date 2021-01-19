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
import moment from 'moment'
import { Chart } from '~/components/ChartCard.vue'

export default Vue.extend({
  data () {
    const charts: Chart[] = [
      {
        id: 'chartIncrease',
        seriesName: '关注增量/每十分钟'
      },
      {
        id: 'chartTotal',
        seriesName: '关注总量/每十分钟'
      }
    ]
    const initUpdateTime:Array<string> = []
    const initChartIncreaseData:Array<string> = []
    const initChartTotalData:Array<string> = []
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
      charts,
      chartIncreaseData: initChartIncreaseData,
      chartTotalData: initChartTotalData,
      updateTime: initUpdateTime
    }
  },
  created () {
    this.fetchBoss()
    this.fetchFollower()
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
    fetchFollower () {
      this.$axios.get('https://api.amemachif.com:2333/follower')
        .then((res) => {
          if (res.data.code === 20000) {
            const follower = res.data.data
            // 数据处理
            const followerLength = follower.length - 1
            const chartIncrease = this.charts.find(p => p.id === 'chartIncrease')!
            const chartTotal = this.charts.find(p => p.id === 'chartTotal')!
            for (let key = 1; key < followerLength; key += 1) {
              const preFollower = follower[key - 1]
              this.chartIncreaseData.push((follower[key].number - preFollower.number).toString())
              this.chartTotalData.push(follower[key].number)
              const time = moment(follower[key].update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
              this.updateTime.push(time)
            }
            chartIncrease.chartData = this.chartIncreaseData
            chartTotal.chartData = this.chartTotalData
            this.charts.forEach((chart) => {
              chart.xAxisData = this.updateTime
              chart.obj?.setOption({
                xAxis: {
                  data: chart.xAxisData
                },
                series: [{
                  // 根据名字对应到相应的系列
                  name: chart.seriesName,
                  data: chart.chartData
                }]
              })
            })
          }
        })
        .catch((_) => {

        })
    },
    getProperty (key: string, value: any, defaults: any): any {
      return key in value ? value[key] : defaults
    },
    chartResize () {
      (this.$refs.chartCard as any)?.chartResize()
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
