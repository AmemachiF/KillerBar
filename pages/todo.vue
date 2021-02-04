<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <b-container v-html="todos" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      todos: ''
    }
  },
  mounted () {
    this.$axios.$get('https://raw.githubusercontent.com/AmemachiF/Killer_Bar/master/TODOS.md')
      .then((todos) => {
        this.todos = this.$md.render(todos)
      })
  }
})
</script>
