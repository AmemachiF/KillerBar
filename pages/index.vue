<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-card header="档案">
          <b-card-text>
            <b-row>
              <b-col>
                <b-img-lazy src="https://via.placeholder.com/479x1144" fluid />
              </b-col>
              <b-col>
                <b-row v-for="bk in bossKeys" :key="bk.id">
                  <b-col class="text-right">
                    {{ bk.title }}
                  </b-col>
                  <b-col>
                    {{ getProperty(bk.id, boss, '') }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card header="公告">
          <b-card-text>
            Some text.
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      bossKeys: [
        { key: 'id', title: 'Title' }
      ],
      boss: {}
    }
  },
  computed: {

  },
  created () {
    this.fetchBoss()
  },
  methods: {
    fetchBoss () {
      this.$axios.get('https://api.amemachif.com:2333/boss')
        .then((res) => {
          this.boss = res.data.data
          // console.log(this.boss)
        })
        .catch((_) => {
          this.boss = {}
        })
    },
    getProperty (key: string, value: any, defaults: any): any {
      return key in value ? value[key] : defaults
    }
  }
})
</script>

<style scoped>
</style>
