<template>
  <b-container class="my-2" style="padding: .5rem 1.5rem !important;" fluid>
    <b-row>
      <b-col cols="auto">
        <b-avatar :src="avatar" :size="sub ? '2em' : '3em'" />
      </b-col>
      <b-col class="pl-2">
        <b-row class="pb-1">
          <b-col>
            <span class="font-weight-bold">{{ nickname }}</span>&nbsp;
            <br/>
            <span class="text-secondary" style="font-size: 14px">{{ getDateString(item.time) }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            {{ item.content }}
          </b-col>
        </b-row>
        <b-row class="sub">
          <b-col>
            <slot />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

export class CommentItemInfo {
  id: string = ''
  user: any = undefined
  parent: any = undefined
  content: string = ''
  time: number = 0
  subs: CommentItemInfo[] = []
  obj: any = undefined
}

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: new CommentItemInfo(),
      required: true
    },
    sub: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nickname: '',
      avatar: ''
    }
  },
  mounted () {
    if (this.item.user) {
      this.nickname = this.item.user.get('nickname')
      this.avatar = this.item.user.get('avatar')
    }
  },
  methods: {
    getDateString (time: number) {
      if (time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return 'Invalid time'
      }
    }
  }
})
</script>
