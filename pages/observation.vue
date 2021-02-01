<template>
  <b-container fluid>
    <b-row>
      <b-col xl="6" lg="12">
        <b-card header="直播数据解析">
          <b-card-text>
            直播数据解析。
          </b-card-text>
        </b-card>
      </b-col>
      <b-col xl="6" lg="12">
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

export default Vue.extend({
  data () {
    const chartsOptions = {
      type: 'value',
      scale: true,
      yAxis: {
        axisLabel: {
          formatter: '{value}w'
        }
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
        seriesName: '关注增量/每十分钟'
      }
    ]
    const chartsCaptain: Chart[] = [
      {
        id: 'chartCaptainTotal',
        seriesName: '大航海总量/每天'
      },
      {
        id: 'chartCaptainIncrease',
        seriesName: '大航海增量/每天'
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
        seriesName: '关注增量/每天'
      }
    ]
    return {
      slide: 0,
      charts,
      chartsCaptain,
      chartsFollowerDay
    }
  },
  mounted () {
    this.fetchFollower()
    this.fetchFollowerDay()
    this.fetchCaptain()
  },
  methods: {
    fetchFollower () {
      this.$axios.get('https://api.amemachif.com:2333/follower')
        .then((res) => {
          if (res.data.code === 20000) {
            const charts = this.dataFormat(this.charts, res.data.data, 'chartIncrease', 'chartTotal', 10000, 'MM-DD HH:mm:ss')
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
            const charts = this.dataFormat(this.chartsCaptain, res.data.data, 'chartCaptainIncrease', 'chartCaptainTotal', 1, 'YYYY-MM-DD')
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
            const charts = this.dataFormat(this.chartsFollowerDay, res.data.data, 'chartFollowerDayIncrease', 'chartFollowerDayTotal', 10000, 'YYYY-MM-DD')
            this.updateChart(charts)
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
    chartResize () {
      // NOTICE: 这里除了最后一行，每行最后需要加分号，否则会报错找不到chartResize
      (this.$refs.chartCard as any)?.chartResize(); // <--
      (this.$refs.chartCardCaptain as any)?.chartResize(); // <--
      (this.$refs.chartFollowerDay as any)?.chartResize() // <--
    },
    dataFormat (charts, follower, increaseId, totalId, yAxisUnit, timeFormat) {
      // 数据处理
      const followerLength = follower.length - 1
      const chartIncrease = charts.find(p => p.id === increaseId)!
      const chartTotal = charts.find(p => p.id === totalId)!
      const chartIncreaseData: string[] = []
      const chartTotalData: string[] = []
      const updateTime: string[] = []
      for (let key = 1; key < followerLength; key += 1) {
        const preFollower = follower[key - 1]
        chartIncreaseData.push((follower[key].number - preFollower.number).toString())
        chartTotalData.push((follower[key].number / yAxisUnit).toString())
        const time = moment(follower[key].update_time * 1000).format(timeFormat)
        updateTime.push(time)
      }
      chartIncrease.chartData = chartIncreaseData
      chartTotal.chartData = chartTotalData
      chartIncrease.xAxisData = updateTime
      chartTotal.xAxisData = updateTime
      return charts
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

.carousel-control-next, .carousel-control-prev{
  width: 5%;
}
</style>
