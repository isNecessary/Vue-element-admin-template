<template>
  <el-aside :class="['side-menu', 'shadow']" :width="collapsed ? '80px' : '256px'" style="transition: 0.25s linear">
    <el-scrollbar style="height: 100%">
      <div>
        <div :class="['logo', theme]">
          <router-link to="/project/base/info">
            <!-- <img src="@/assets/img/logo.png"> -->
            <SvgIcon class="logo-pic" icon-class="net" />
            <h1>{{ systemName }}</h1>
          </router-link>
        </div>
        <i-menu :options="menuData" :collapsed="collapsed" mode="vertical" class="menu" @select="onSelect" />
      </div>
    </el-scrollbar>

  </el-aside>
</template>
<script>
import { mapState } from 'vuex'
import iMenu from '@/components/Menu/menu'
import SvgIcon from '@/components/SvgIcon'
export default {
  components: { iMenu, SvgIcon },
  props: {
    menuData: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    }
  },
  computed: {
    ...mapState('setting', ['systemName'])
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "index";
</style>

