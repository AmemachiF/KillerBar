<template>
  <b-container class="py-3">
    <b-form>
      <b-row>
        <b-col>
          <b-textarea v-model="content" no-resize rows="3" :disabled="!canSend" />
        </b-col>
      </b-row>
      <b-row class="mt-3 text-right">
        <b-col>
          <b-button :disabled="!canSend" @click="sendComment">
            发送
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AV from 'leancloud-storage'
import moment from 'moment'

export default Vue.extend({
  props: {
    pageId: {
      type: String,
      default: ''
    },
    parent: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      content: '',
      canSend: true
    }
  },
  mounted () {
    setInterval(() => {
      if (!AV.User.current()) {
        this.canSend = false
      }
    }, 200)
  },
  methods: {
    sendComment () {
      const user = AV.User.current()
      if (user) {
        const comment = new AV.Object('Comments')
        comment.set('pageId', this.pageId)
        comment.set('content', this.content)
        comment.set('user', user)
        comment.set('time', moment.now())
        if (this.parent) {
          comment.set('parent', this.parent)
        }
        comment.save().then((_) => {
          this.content = ''
          this.$emit('refresh')
        })
      }
    }
  }
})
</script>
