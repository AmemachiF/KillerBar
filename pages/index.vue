<template>
  <b-container fluid>
    <b-row>
      <b-col xl="6" lg="12">
        <ProfileCard v-resize="chartResize" :keys="bossKeys" :info="boss" :image="require('~/assets/Amemachi_Hanken.png')" />
        <NewsCard :news="news" />
      </b-col>
      <b-col xl="6" lg="12">
        <NoticeCard :avatar="getProperty('avatar', boss, undefined)" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import * as JSONBig from 'json-bigint'
import { News, NewsPicture } from '~/components/NewsCard.vue'
import { DataCodeError } from '~/plugins/Errors'

export default Vue.extend({
  data () {
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
      news
    }
  },
  mounted () {
    Promise.all([
      this.fetchBoss(),
      this.fetchNews()
    ]).catch((error) => {
      this.$sentry.captureException(error)
    })
  },
  methods: {
    async fetchBoss () {
      try {
        const res = await this.$axios.get('https://api.amemachif.com:2333/boss')
        if (res.data.code === 20000) {
          this.boss = res.data.data
        } else {
          throw new DataCodeError('fetchBoss', res.data)
        }
      } catch (error) {
        this.boss = {}
        this.$sentry.captureException(error)
      }
    },
    async fetchNews () {
      try {
        const res = await this.$axios.get('https://api.amemachif.com:2333/news', { transformResponse: [data => JSONBig.parse(data)] })
        if (res.data.code === 20000) {
          this.news = []
          res.data.data.forEach((n: any) => {
            let pic: NewsPicture[]|undefined
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
              id: n.id.toString(),
              content: n.content,
              emojiInfo: n.emoji_info,
              pictures: pic,
              updateTime: moment(n.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            })
          })
        } else {
          throw new DataCodeError('fetchNews', res.data)
        }
      } catch (error) {
        this.$sentry.captureException(error)
      }
    },
    getProperty (key: string, value: any, defaults: any): any {
      return key in value ? value[key] : defaults
    },
    chartResize () {
      try {
        // NOTICE: 这里除了最后一行，每行最后需要加分号，否则会报错找不到chartResize
        (this.$refs.chartCard as any)?.chartResize(); // <--
        (this.$refs.chartCardCaptain as any)?.chartResize(); // <--
        (this.$refs.chartFollowerDay as any)?.chartResize() // <--
      } catch (error) {
        this.$sentry.captureException(error)
      }
    }
  }
})
</script>

<style>
.carousel-inner {
  width: 100%;
  height: 100%;
}

.carousel-control-next, .carousel-control-prev{
  width: 5%;
}
</style>
