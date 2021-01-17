<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-card v-resize="chartResize" header="档案">
          <b-card-text>
            <b-row>
              <b-col cols="5" class="m-0">
                <!-- TODO: Image src -->
                <b-img-lazy src="http://amemachif.com/static/img/Amemachi_Hanken.683544ef.png" fluid />
              </b-col>
              <b-col id="bossInfo" class="m-0">
                <b-row v-for="bk in bossKeys" :key="bk.id">
                  <b-col class="text-right boss-key" cols="4">
                    {{ bk.title }}
                  </b-col>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <b-col v-html="getProperty(bk.key, boss, 'Loading...')" />
                </b-row>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="公告">
          <b-card-text>
            <b-avatar v-if="'avatar' in boss" :src="boss.avatar" size="5rem" class="float-left mr-3" />
            雨街F天下第一可爱！ 施工中，前端技术栈是Nuxt.js + BootstrapVue + NlyAdminlteVue
          </b-card-text>
        </b-card>
        <b-card>
          <b-aspect id="chartAspect">
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import * as echarts from 'echarts'

let chartIncrease: echarts.ECharts
let chartTotal: echarts.ECharts

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
      slide: 0
    }
  },
  created () {
    this.fetchBoss()
  },
  mounted () {
    chartIncrease = this.echartsInit(chartIncrease, 'chartIncrease')
    chartTotal = this.echartsInit(chartTotal, 'chartTotal')
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
    echartsInit (chart: echarts.ECharts, id: string) {
      chart = echarts.init(document.getElementById(id)!)
      chart.setOption({
        title: {
          text: 'ECharts 入门示例' + id
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
      chart.resize({ width: 'auto', height: 'auto' })
      return chart
    },
    chartResize () {
      chartIncrease.resize({ width: 'auto', height: 'auto' })
      chartTotal.resize({ width: 'auto', height: 'auto' })
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

      const opt = { width, height }
      // console.log({ slide: this.slide, opt })
      chartIncrease.resize(opt)
      chartTotal.resize(opt)
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

<style scoped>
#bossInfo {
  font-size: 0.9rem;
  padding: 0;
}

#bossInfo .row {
  margin: 0.7rem auto;
}

#bossInfo .boss-key {
  font-weight: bold;
}

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
