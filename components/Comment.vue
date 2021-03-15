<template>
  <b-container class="comments">
    <CommentInput :page-id="pageId" @refresh="refresh" />
    <CommentItem v-for="item in comments" :key="item.id" :item="item">
      <CommentItem v-for="sub in item.subs" :key="sub.id" :item="sub" sub />
    </CommentItem>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'
import { CommentItemInfo } from './CommentItem.vue'

export default Vue.extend({
  props: {
    pageId: {
      type: String,
      default: ''
    }
  },
  data () {
    const comments: CommentItemInfo[] = []
    return {
      comments
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      const query = new AV.Query('Comments')
      query.equalTo('parent', null)
      query.include('user')
      query.ascending('time')
      query.find().then((tops) => {
        this.comments = []
        tops.forEach((top) => {
          const c = new CommentItemInfo()
          c.id = top.id ?? ''
          c.user = top.get('user')
          c.parent = top.get('parent')
          c.content = top.get('content')
          c.time = top.get('time')
          c.obj = top
          this.comments.push(c)
          const querySub = new AV.Query('Comments')
          querySub.equalTo('parent', top)
          querySub.include('user')
          querySub.find().then((subs) => {
            subs.forEach((sub) => {
              const s = new CommentItemInfo()
              s.id = sub.id ?? ''
              s.user = sub.get('user')
              s.parent = sub.get('parent')
              s.content = sub.get('content')
              s.time = sub.get('time')
              s.obj = sub
              c.subs.push(s)
            })
          })
        })
      })
    }
  }
})
</script>

<style scoped>
.comments {
  background-color: white;
  padding: 1em;
  margin: 1em auto;
  border-radius: 1rem;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem grey;
}
</style>
