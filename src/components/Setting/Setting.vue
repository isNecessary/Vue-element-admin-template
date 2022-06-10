<template>
  <div class="side-setting">
    <setting-item>
      <el-button type="primary" icon="el-icon-folder-checked" @click="saveSetting">保存配置</el-button>
      <el-button type="dashed" icon="el-icon-refresh" style="float: right" @click="resetSetting">重置配置</el-button>
    </setting-item>
    <setting-item title="主题色">
      <color-checkbox-group
        :default-values="[palettes.indexOf(theme.color)]"
        :multiple="false"
        @change="(values, colors) => setTheme({...theme, color: colors[0]})"
      >
        <color-checkbox v-for="(color, index) in palettes" :key="index" :color="color" :value="index" />
      </color-checkbox-group>
    </setting-item>
    <el-divider />
    <setting-item title="导航设置">
      <img-checkbox-group
        :default-values="[layout]"
        @change="values => setLayout(values[0])"
      >
        <img-checkbox title="侧边导航" img="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" value="side" />
        <img-checkbox title="顶部导航" img="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" value="head" />
        <img-checkbox title="混合导航" img="https://gw.alipayobjects.com/zos/antfincdn/x8Ob%26B8cy8/LCkqqYNmvBEbokSDscrm.svg" value="mix" />
      </img-checkbox-group>
    </setting-item>
  </div>
</template>
<script>
import { changeThemeColor } from '@/utils/themeUtil'
import { mapState, mapMutations } from 'vuex'
import { ColorCheckbox, ImgCheckbox } from '@/components/checkbox'
import SettingItem from './SettingItem.vue'
const ColorCheckboxGroup = ColorCheckbox.Group
const ImgCheckboxGroup = ImgCheckbox.Group
export default {
  components: {
    SettingItem,
    ImgCheckbox,
    ImgCheckboxGroup,
    ColorCheckbox,
    ColorCheckboxGroup
  },
  computed: {
    ...mapState('setting', ['theme', 'palettes', 'layout'])
  },
  watch: {
    'theme.color'(val) {
      this.changeColor(val)
    }
  },
  methods: {
    ...mapMutations('setting', ['setTheme', 'setLayout']),
    saveSetting() {
      localStorage.setItem('admin.setting', JSON.stringify({ color: this.theme.color, layout: this.layout }))
      this.$message.success('保存成功')
    },
    resetSetting() {},
    getCSSString(url, variable) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },
    changeColor(newColor) {
      changeThemeColor(newColor)
        .then(t => this.$message.success('主题色切换成功~'))
    }
  }
}
</script>
<style lang="scss">
  .side-setting{
    min-height: 100%;
    background-color: $base-bg-color;
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;
    .flex{
      display: flex;
    }
    .select-item{
      width: 80px;
    }
  }
</style>
