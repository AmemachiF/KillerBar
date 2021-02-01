<template>
  <b-container fluid>
    <b-row>
      <b-col xl="6" lg="12">
        <b-card header="关于项目">
          <b-card-text>
            一些批话。
          </b-card-text>
        </b-card>
        <b-card header="接下来要做的事">
          <b-card-text>
            一些批话。
          </b-card-text>
        </b-card>
      </b-col>
      <b-col xl="6" lg="12">
        <b-card header="雨组成员">
          <b-card-text>
            <b-col v-for="b in brothers" :key="b.id">
              <BrotherCard :brother="b" />
            </b-col>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Brother } from '~/components/BrotherCard.vue'
import { DataCodeError } from '~/plugins/Errors'

export default Vue.extend({
  data () {
    const brothers: Brother[] = []
    return {
      brothers
    }
  },
  mounted () {
    Promise.all([
      this.fetchBrother()
    ]).catch((error) => {
      this.$sentry.captureException(error)
    })
  },
  methods: {
    async fetchBrother () {
      try {
        const res = await this.$axios.get('https://api.amemachif.com:2333/brother')
        if (res.data.code === 20000) {
          this.brothers = []
          res.data.data.forEach((b: any) => {
            this.brothers.push({
              id: b.id,
              avatar: b.avatar,
              name: b.name,
              signature: b.signature,
              updateTime: moment(b.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
            })
          })
        } else {
          throw new DataCodeError('fetchBrother', res.data)
        }
      } catch (error) {
        this.$sentry.captureException(error)
      }
    }
  }
})
</script>
