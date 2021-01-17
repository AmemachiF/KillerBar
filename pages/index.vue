<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-card header="档案">
          <b-card-text>
            <b-row>
              <b-col cols="5" class="m-0">
                <b-img-lazy src="https://via.placeholder.com/479x1144" fluid />
              </b-col>
              <b-col id="bossInfo" class="m-0">
                <b-row v-for="bk in bossKeys" :key="bk.id">
                  <b-col class="text-right boss-key" cols="4">
                    {{ bk.title }}
                  </b-col>
                  <b-col v-html="getProperty(bk.key, boss, 'Unknown')" />
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
      boss: {}
    }
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
