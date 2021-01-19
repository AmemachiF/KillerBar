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
        id: 'chartTotal',
        seriesName: '关注总量/每十分钟'
      },
      {
        id: 'chartIncrease',
        seriesName: '关注增量/每十分钟'
      },
      {
        id: 'chartCaptainTotal',
        seriesName: '大航海总量/每天'
      },
      {
        id: 'chartCaptainIncrease',
        seriesName: '大航海增量/每天'
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
  },
  mounted () {
    this.fetchFollower()
    this.fetchCaptain()
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
            const chartIncreaseData: string[] = []
            const chartTotalData: string[] = []
            const updateTime: string[] = []
            for (let key = 1; key < followerLength; key += 1) {
              const preFollower = follower[key - 1]
              chartIncreaseData.push((follower[key].number - preFollower.number).toString())
              chartTotalData.push(follower[key].number)
              const time = moment(follower[key].update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
              updateTime.push(time)
            }
            chartIncrease.chartData = chartIncreaseData
            chartTotal.chartData = chartTotalData
            chartIncrease.xAxisData = updateTime
            chartTotal.xAxisData = updateTime
            this.updateChart()
          }
        })
        .catch((_) => {
        })
    },
    fetchCaptain () {
      this.$axios.get('https://api.amemachif.com:2333/captain')
        .then((res) => {
          if (res.data.code === 20000) {
            const captain = res.data.data
            // 数据处理
            const captainLength = captain.length - 1
            const chartCaptainIncrease = this.charts.find(p => p.id === 'chartCaptainIncrease')!
            const chartCaptainTotal = this.charts.find(p => p.id === 'chartCaptainTotal')!
            const chartIncreaseData: string[] = []
            const chartTotalData: string[] = []
            const updateTime: string[] = []
            for (let key = 1; key < captainLength; key += 1) {
              const preFollower = captain[key - 1]
              chartIncreaseData.push((captain[key].number - preFollower.number).toString())
              chartTotalData.push(captain[key].number)
              const time = moment(captain[key].update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
              updateTime.push(time)
            }
            chartCaptainIncrease.chartData = chartIncreaseData
            chartCaptainTotal.chartData = chartTotalData
            chartCaptainIncrease.xAxisData = updateTime
            chartCaptainTotal.xAxisData = updateTime
            this.updateChart()
          }
        })
        .catch((_) => {
        })
    },
    updateChart () {
      this.charts.forEach((chart) => {
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
