<template>
  <b-card header="档案">
    <b-card-text>
      <b-row>
        <b-col v-if="image" cols="5" class="m-0">
          <!-- TODO: Image src -->
          <b-img-lazy :src="image" fluid />
        </b-col>
        <b-col id="bossInfo" class="m-0">
          <b-row v-for="bk in keys" :key="bk.id">
            <b-col class="text-right boss-key" cols="4">
              {{ bk.title }}
            </b-col>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <b-col v-html="getProperty(bk.key, info, loadingText)" />
          </b-row>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    keys: {
      type: Array,
      default () {
        return []
      }
    },
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    image: {
      type: String,
      default: undefined
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    }
  },
  methods: {
    getProperty (key: string, value: any, defaults: any): any {
      return key in value ? value[key] : defaults
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
</style>
