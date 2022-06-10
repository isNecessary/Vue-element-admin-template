<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route() {
      this.setHtmlTitle()
    }
  },
  methods: {
    setHtmlTitle() {
      const route = this.$route
      const key = route.path === '/' ? 'home.name' : route.name
      document.title = process.env.VUE_APP_NAME + ' | ' + key
    }
  }
}
</script>
