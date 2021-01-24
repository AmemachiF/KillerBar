<template>
  <b-card class="newsAspect overflow-hidden py-2">
    <b-carousel
      controls
      img-height="100%"
      img-width="100%"
      class="h-100 pb-2 mt-0"
    >
      <b-carousel-slide v-for="(n, index) in news" :key="n.id" class="w-100 h-100 overflow-hidden">
        <template #img>
          <b-card
            v-b-modal.newsModal
            no-body
            fluid
            class="w-100 h-100"
            :header="'(' + (index + 1) + '/' + news.length + ') ' + n.updateTime"
            @click="modal = n"
          >
            <b-row>
              <b-col :cols="n.pictures ? 8 : 12">
                <b-card-body>
                  <b-card-text class="overflow-hidden">
                    {{ n.content }}
                  </b-card-text>
                </b-card-body>
              </b-col>
              <b-col v-if="n.pictures" cols="4">
                <b-card-img-lazy :src="n.pictures[0].imgSrc" fluid-grow />
              </b-col>
            </b-row>
          </b-card>
        </template>
      </b-carousel-slide>
    </b-carousel>
    <b-modal id="newsModal" :title="modal.updateTime">
      <p>
        {{ modal.content }}
      </p>
      <b-row v-if="modal.pictures">
        <b-col v-for="p in modal.pictures" :key="p.imgSrc" :cols="modal.pictures.length > 1 ? 6 : 12" @click.prevent="pictureModal = p">
          <b-img-lazy v-b-modal.newsPictureModal :src="p.imgSrc" fluid-grow thumbnail />
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-link :href="getLink(modal)" target="_blank" rel="noopener">
          <fa icon="external-link-alt" />
          查看原文
        </b-link>
      </template>
    </b-modal>
    <b-modal id="newsPictureModal" hide-footer size="lg">
      <b-img-lazy :src="pictureModal.imgSrc" fluid-grow />
    </b-modal>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'

export declare type NewsPicture = {
  imgSrc: string,
  imgWidth: number,
  imgHeight: number,
  imgSize: number,
  imgTag?: any,
}

export declare type News = {
  id: string,
  content: string,
  emojiInfo?: any,
  pictures?: NewsPicture[],
  updateTime: string
}

export default Vue.extend({
  props: {
    news: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      modal: {},
      pictureModal: {}
    }
  },
  methods: {
    getLink (news: News) {
      const url = new URL(news.id, 'https://t.bilibili.com/')
      url.searchParams.append('tab', '2')
      return url.toString()
    }
  }
})
</script>

<style scoped>
.newsAspect {
  height: 15rem;
}
</style>

<style>
.newsAspect .carousel-control-prev-icon,
.newsAspect .carousel-control-next-icon {
  background-color: black;
  opacity: 0.5;
  border-radius: 50%;
  background-position: center;
  background-size: 1em 1em;
  padding: 1em;
}

.newsAspect > .card-body{
  padding: 0;
}

.newsAspect .carousel-control-next,
.newsAspect .carousel-control-prev{
  padding-left: 40px;
  padding-right: 40px;
}
</style>
