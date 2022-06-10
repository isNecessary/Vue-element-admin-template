<template>
  <admin-layout>
    <div :class="['tabs-view-content', layout, pageWidth]">
      <!-- <page-toggle-transition> -->
      <router-view />
      <!-- </page-toggle-transition> -->
    </div>
  </admin-layout>
</template>
<script>
import AdminLayout from '../AdminLayout.vue'
// import PageToggleTransition from '@/components/Transition/PageToggleTransition'
import { mapState } from 'vuex'
export default {
  components: {
    AdminLayout
    // PageToggleTransition
  },
  computed: {
    ...mapState(['layout', 'pageWidth'])
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
  .tabs-view-content{
    position: relative;
    background-color: #fff;
    height: 100%;
    padding: 20px;
  }
</style>
