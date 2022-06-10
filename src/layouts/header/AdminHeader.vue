<template>
  <el-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <router-link v-if="layout === 'head'" to="/project/base/info" :class="['logo', theme, headerTheme]">
        <SvgIcon class="logo-pic" icon-class="net" />
        <h1>{{ systemName }}</h1>
      </router-link>
      <svg-icon v-if="layout !== 'head'" id="hamburger-container" :icon-class="collapsed ? 'menu_unfold' : 'menu_fold'" class="hamburger-container" @click="toggleCollapse" />
      <div v-if="layout !== 'side'" class="admin-header-menu" :style="`width: ${menuWidth};`">
        <i-menu class="head-menu" :theme="headerTheme" :options="menuData" mode="horizontal" />
      </div>
      <div :class="['admin-header-right', headerTheme]">
        <header-avatar class="header-item" />
      </div>
    </div>
  </el-header>
</template>
<script>
import { mapState } from 'vuex'
import iMenu from '@/components/Menu/menu'
import SvgIcon from '@/components/SvgIcon'
import HeaderAvatar from './HeaderAvatar'
export default {
  components: { iMenu, SvgIcon, HeaderAvatar },
  props: {
    menuData: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'layout', 'pageWidth', 'systemName']),
    menuWidth() {
      const { layout } = this
      const headWidth = layout === 'head' ? '100% - 188px' : '100%'
      const extraWidth = '400px'
      return `calc(${headWidth} - ${extraWidth})`
    },
    headerTheme() {
      if (this.layout === 'side' && this.theme.mode === 'dark') {
        return 'light'
      }
      return this.theme.mode
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "index";
</style>
