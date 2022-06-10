<template>
  <router-view />
</template>

<script>
// import PageToggleTransition from '../components/Transition/PageToggleTransition'
import { mapState } from 'vuex'

export default {
  name: 'BlankView',
  // components: { PageToggleTransition },
  computed: {
    ...mapState('setting', ['animate'])
  }
}
</script>

<style scoped>

</style>
