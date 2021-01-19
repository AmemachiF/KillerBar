<template>
  <b-container fluid>
    <b-row>
      <!-- <b-card-group v-for="b in brothers" :key="b.id" deck> -->
      <b-col v-for="b in brothers" :key="b.id" cols="4">
        <BrotherCard :brother="b" />
      </b-col>
    <!-- </b-card-group> -->
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Brother } from '~/components/BrotherCard.vue'

export default Vue.extend({
  data () {
    const brothers: Brother[] = []
    return {
      brothers
    }
  },
  mounted () {
    this.fetchBrother()
  },
  methods: {
    fetchBrother () {
      this.$axios.get('https://api.amemachif.com:2333/brother')
        .then((res) => {
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
          }
        })
    }
  }
})
</script>
