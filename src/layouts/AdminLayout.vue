<template>
  <el-container :class="['admin-layout']">
    <Drawer
      v-if="!hideSetting"
      v-model="showSetting"
      placement="right"
    >
      <div slot="handler" class="setting">
        <i :class="showSetting ? 'el-icon-close' : 'el-icon-s-tools'" />
      </div>
      <Setting />
    </Drawer>
    <side-menu v-if="layout === 'side' || layout === 'mix'" :class="[theme.mode]" :theme="theme.mode" :collapsed="collapsed" :menu-data="sideMenuData" @menuSelect="onMenuSelect" />
    <el-container class="admin-layout-main">
      <admin-header :class="[{'fixed-tabs': fixedTabs, 'fixed-header': fixedHeader}]" :menu-data="headMenuData" :style="headerStyle" :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <el-main class="admin-layout-content" :style="`height: ${minHeight}px;`">
        <div class="page-header">
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <el-scrollbar style="height: calc(100% - 60px);background-color: #fff;">
          <slot />
        </el-scrollbar>
      </el-main>
      <el-footer style="height: 0" />
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import AdminHeader from './header/AdminHeader'
import Setting from '../components/Setting/Setting'
import Drawer from '@/components/Tool/Drawer.vue'
import SideMenu from '@/components/Menu/SideMenu'
export default ({
  components: { SideMenu, AdminHeader, Drawer, Setting, Breadcrumb },
  data() {
    return {
      minHeight: window.innerHeight - 60,
      collapsed: false,
      showSetting: false
    }
  },
  computed: {
    ...mapState('setting', ['layout', 'theme', 'fixedTabs', 'hideSetting', 'fixedHeader', 'fixedSideBar']),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuData() {
      const { layout, subMenu, menuData } = this
      return layout === 'mix' ? subMenu : menuData
    },
    headMenuData() {
      const { layout, menuData, firstMenu } = this
      return layout === 'mix' ? firstMenu : menuData
    },
    headerStyle() {
      const width = (this.fixedHeader && this.layout !== 'head' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      const position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; position: ${position};`
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    }
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 24)
    this.setActivated(this.$route)
    // this.sideMenuData
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24)
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst']),
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const { firstMenu } = this
        for (const menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    onMenuSelect() {
      this.toggleCollapse()
    }
  }
})
</script>
<style lang="scss">
  @import '@/styles/element-variables.scss';
  .setting{
    color: #fff;
    background-color: $--color-primary;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
  }
</style>
<style lang="scss" scoped>
  .admin-layout{
    height: 100%;
    .side-menu{
      &.fixed-side{
        position: fixed;
        height: 100vh;
        left: 0;
        top: 0;
      }
    }
    .virtual-side{
      transition: all 0.2s;
    }
    .virtual-header{
      transition: all 0.2s;
      opacity: 0;
      &.fixed-tabs.multi-page:not(.fixed-header){
        height: 0;
      }
    }
    .admin-layout-main{
      .admin-header{
        top: 0;
        right: 0;
        overflow: hidden;
        transition: all 0.2s;
        &.fixed-tabs.multi-page:not(.fixed-header){
          height: 0;
        }
      }
    }
    .page-header{
      margin: 0 -10px 10px;
      background-color: #ffffff;
      // max-width: 1400px;
      padding: 0 10px;
      height: 50px;
    }
    .admin-layout-content{
      padding: 0 10px;
      background-color: #f0f2f5;
      // overflow-y: scroll;
      /*overflow-x: hidden;*/
      /*min-height: calc(100vh - 64px - 122px);*/
      .breadcrumb-container{
        background-color: #fff;
      }
    }
  }
</style>

