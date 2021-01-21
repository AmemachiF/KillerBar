<template>
  <b-container fluid>
    <b-row>
      <b-col xl="6" lg="12">
        <ProfileCard v-resize="chartResize" :keys="bossKeys" :info="boss" :image="require('~/assets/Amemachi_Hanken.png')" />
        <NewsCard :news="news" />
      </b-col>
      <b-col xl="6" lg="12">
        <NoticeCard :avatar="getProperty('avatar', boss, undefined)" />
        <ChartCard id="chartCard" ref="chartCard" :charts="charts" />
        <ChartCard id="chartCardCaptain" ref="chartCardCaptain" :charts="chartsCaptain" />
        <ChartCard id="chartFollowerDay" ref="chartFollowerDay" :charts="chartsFollowerDay" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Chart } from '~/components/ChartCard.vue'
import { News, NewsPicture } from '~/components/NewsCard.vue'

export default Vue.extend({
  data () {
    const chartsOptions = {
      grid: {
        left: '10%',
        right: '0',
        top: 40,
        bottom: 20
      }
    }
    const charts: Chart[] = [
      {
        id: 'chartTotal',
        seriesName: '关注总量/每十分钟',
        options: chartsOptions
      },
      {
        id: 'chartIncrease',
        seriesName: '关注增量/每十分钟',
        options: chartsOptions
      }
    ]
    const chartsCaptain: Chart[] = [
      {
        id: 'chartCaptainTotal',
        seriesName: '大航海总量/每天',
        options: chartsOptions
      },
      {
        id: 'chartCaptainIncrease',
        seriesName: '大航海增量/每天',
        options: chartsOptions
      }
    ]
    const chartsFollowerDay: Chart[] = [
      {
        id: 'chartFollowerDayTotal',
        seriesName: '关注总量/每天',
        options: chartsOptions
      },
      {
        id: 'chartFollowerDayIncrease',
        seriesName: '关注增量/每天',
        options: chartsOptions
      }
    ]
    const news: News[] = []
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
      chartsCaptain,
      chartsFollowerDay,
      news
    }
  },
  mounted () {
    this.fetchBoss()
    this.fetchNews()
    this.fetchFollower()
    this.fetchFollowerDay()
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
            const charts = this.charts
            const follower = res.data.data
            // 数据处理
            const followerLength = follower.length - 1
            const chartIncrease = charts.find(p => p.id === 'chartIncrease')!
            const chartTotal = charts.find(p => p.id === 'chartTotal')!
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
            this.updateChart(charts)
          }
        })
        .catch((_) => {
        })
    },
    fetchCaptain () {
      this.$axios.get('https://api.amemachif.com:2333/captain')
        .then((res) => {
          if (res.data.code === 20000) {
            const charts = this.chartsCaptain
            const captain = res.data.data
            // 数据处理
            const captainLength = captain.length - 1
            const chartCaptainIncrease = charts.find(p => p.id === 'chartCaptainIncrease')!
            const chartCaptainTotal = charts.find(p => p.id === 'chartCaptainTotal')!
            const chartIncreaseData: string[] = []
            const chartTotalData: string[] = []
            const updateTime: string[] = []
            for (let key = 1; key < captainLength; key += 1) {
              const preFollower = captain[key - 1]
              chartIncreaseData.push((captain[key].number - preFollower.number).toString())
              chartTotalData.push(captain[key].number)
              const time = moment(captain[key].update_time * 1000).format('YYYY-MM-DD')
              updateTime.push(time)
            }
            chartCaptainIncrease.chartData = chartIncreaseData
            chartCaptainTotal.chartData = chartTotalData
            chartCaptainIncrease.xAxisData = updateTime
            chartCaptainTotal.xAxisData = updateTime
            this.updateChart(charts)
          }
        })
        .catch((_) => {
        })
    },
    fetchFollowerDay () {
      this.$axios.get('https://api.amemachif.com:2333/follower_day')
        .then((res) => {
          if (res.data.code === 20000) {
            const charts = this.chartsFollowerDay
            const follower = res.data.data
            // 数据处理
            const followerDayLength = follower.length - 1
            const chartFollowerDayIncrease = charts.find(p => p.id === 'chartFollowerDayIncrease')!
            const chartFollowerDayTotal = charts.find(p => p.id === 'chartFollowerDayTotal')!
            const chartIncreaseData: string[] = []
            const chartTotalData: string[] = []
            const updateTime: string[] = []
            for (let key = 1; key < followerDayLength; key += 1) {
              const preFollowerDay = follower[key - 1]
              chartIncreaseData.push((follower[key].number - preFollowerDay.number).toString())
              chartTotalData.push(follower[key].number)
              const time = moment(follower[key].update_time * 1000).format('YYYY-MM-DD')
              updateTime.push(time)
            }
            chartFollowerDayIncrease.chartData = chartIncreaseData
            chartFollowerDayTotal.chartData = chartTotalData
            chartFollowerDayIncrease.xAxisData = updateTime
            chartFollowerDayTotal.xAxisData = updateTime
            this.updateChart(charts)
          }
        })
        .catch((_) => {
        })
    },
    fetchNews () {
      this.$axios.get('https://api.amemachif.com:2333/news')
        .then((res) => {
          if (res.data.code === 20000) {
            this.news = []
            res.data.data.forEach((n: any) => {
              let pic: NewsPicture[] | undefined
              if (n.pictures) {
                pic = []
                n.pictures.forEach((p: any) => {
                  pic?.push({
                    imgSrc: p.img_src,
                    imgWidth: p.img_width,
                    imgHeight: p.img_height,
                    imgSize: p.img_size,
                    imgTag: p.img_tag
                  })
                })
              }
              this.news.push({
                id: n.id,
                content: n.content,
                emojiInfo: n.emoji_info,
                pictures: pic,
                updateTime: moment(n.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
              })
            })
          }
        })
        .catch((_) => {
        })
    },
    updateChart (charts: Chart[]) {
      charts.forEach((chart) => {
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
      // NOTICE: 这里除了最后一行，每行最后需要加分号，否则会报错找不到chartResize
      (this.$refs.chartCard as any)?.chartResize(); // <--
      (this.$refs.chartCardCaptain as any)?.chartResize(); // <--
      (this.$refs.chartFollowerDay as any)?.chartResize() // <--
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
