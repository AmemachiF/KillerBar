<template>
  <b-card>
    <b-aspect id="chartAspect" aspect="2:1">
      <b-carousel
        v-model="slide"
        class="w-100 h-100"
        controls
        img-height="100%"
        img-width="100%"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide class="w-100 h-100">
          <template #img>
            <b-container id="chartIncrease" fluid class="chart w-100 h-100" />
          </template>
        </b-carousel-slide>
        <b-carousel-slide class="w-100 h-100">
          <template #img>
            <b-container id="chartTotal" fluid class="chart w-100 h-100" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </b-aspect>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import * as echarts from 'echarts'

export type Chart = {
  id: string,
  obj?: echarts.ECharts,
  title?: string,
  chartData?: any,
  xAxisData?: any,
  seriesName?: string
}

export default Vue.extend({
  props: {
    charts: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      slide: 0
    }
  },
  mounted () {
    (this.charts as Chart[]).forEach((chart) => {
      this.echartsInit(chart)
    })
  },
  methods: {
    getProperty (key: string, value: any, defaults: any): any {
      return key in value ? value[key] : defaults
    },
    echartsInit (chart: Chart) {
      const ec = echarts.init(document.getElementById(chart.id)!)
      ec.setOption({
        title: {
          text: chart.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [chart.seriesName]
        },
        grid: {
          left: '7%',
          right: '7%',
          top: 40,
          bottom: 20
        },
        xAxis: {
          data: []
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [{
          name: chart.seriesName,
          type: 'bar',
          data: [],
          itemStyle: {
            normal: {
              opacity: 0.4,
              barBorderRadius: 5,
              shadowBlur: 3
            }
          }
        }]
      })
      window.onload?.bind(() => {
        ec.resize({ width: 'auto', height: 'auto' })
      })
      chart.obj = ec
    },
    chartResize () {
      (this.charts as Chart[]).forEach((chart) => {
        chart.obj?.resize({ width: 'auto', height: 'auto' })
      })
      const curr = document.getElementsByClassName('chart')[this.slide]

      if (curr === undefined) {
        return
      }

      const clientHeight = curr!.clientHeight
      const clientWidth = curr!.clientWidth
      const paddingTop = Number(this.getStyle(curr!, 'paddingTop').replace(/\s+|px/gi, ''))
      const paddingBottom = Number(this.getStyle(curr!, 'paddingBottom').replace(/\s+|px/gi, ''))
      const height = clientHeight - paddingTop - paddingBottom
      const paddingLeft = Number(this.getStyle(curr!, 'paddingLeft').replace(/\s+|px/gi, ''))
      const paddingRight = Number(this.getStyle(curr!, 'paddingRight').replace(/\s+|px/gi, ''))
      const width = clientWidth - paddingLeft - paddingRight

      const opt = { width, height };
      // console.log({ slide: this.slide, opt })
      (this.charts as Chart[]).forEach((chart) => {
        chart.obj?.resize(opt)
      })
    },
    getStyle (dom: any, attr: any) {
      return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom)[attr]
    },
    onSlideEnd () {
      this.chartResize()
    }
  }
})
</script>

<style>
#chartAspect .carousel-control-prev-icon, .carousel-control-next-icon {
  background-color: black;
  opacity: 0.5;
  border-radius: 50%;
  background-position: center;
  background-size: 1em 1em;
  padding: 1em;
}
</style>
