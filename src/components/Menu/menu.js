/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuOptions示例：
 * [
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  },
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  }
 * ]
 *
 **/
import { Submenu, MenuItem } from 'element-ui'
import SvgIcon from '@/components/SvgIcon'
import MenuTransform from './MenuTransform'
import fastEqual from 'fast-deep-equal'
import { mapState } from 'vuex'
// import path from 'path'
// import { isExternal } from '@/utils/validate'

const toRoutesMap = (routes) => {
  const map = {}
  routes.forEach(route => {
    map[route.fullPath] = route
    if (route.children && route.children.length > 0) {
      const childrenMap = toRoutesMap(route.children)
      Object.assign(map, childrenMap)
    }
  })
  return map
}

export default {
  name: 'IMenu',
  props: {
    options: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    i18n: Object,
    openKeys: Array
  },
  data() {
    return {
      selectedKeys: [],
      sOpenKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    ...mapState('setting', ['layout']),
    menuTheme() {
      return this.theme === 'light' ? this.theme : 'dark'
    },
    routesMap() {
      return toRoutesMap(this.options)
    },
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    }
  },
  created() {
    this.updateMenu()
    if (this.options.length > 0 && !this.options[0].fullPath) {
      this.formatOptions(this.options, '')
    }
  },
  watch: {
    options(val) {
      if (val.length > 0 && !val[0].fullPath) {
        this.formatOptions(this.options, '')
      }
    },
    i18n(val) {
      if (val && val.messages) {
        const messages = this.i18n.messages
        Object.keys(messages).forEach(key => {
          this.$i18n.mergeLocaleMessage(key, messages[key])
        })
      }
    },
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.sOpenKeys
        this.sOpenKeys = []
      } else {
        this.sOpenKeys = this.cachedOpenKeys
      }
    },
    '$route': function() {
      this.$nextTick(() => {
        this.updateMenu()
      })
    },
    sOpenKeys(val) {
      this.$emit('openChange', val)
      this.$emit('update:openKeys', val)
    }
  },
  methods: {
    renderIcon: function(h, icon) {
      return !icon || icon === 'none' ? null : (h(SvgIcon, { props: { iconClass: icon }}))
    },
    renderMenuItem: function(h, menu) {
      // let tag = 'router-link'
      // const path = resolvePath(menu.fullPath)
      // let config = { props: { to: { path }}, slot: 'title', attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;' }}
      // if (menu.meta && menu.meta.link) {
      //   tag = 'a'
      //   config = { slot: 'title', attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;', href: menu.meta.link, target: '_blank' }}
      // }
      return h(
        // 这是一个至关重要的key，切换路由无法选中，需要加一个key
        MenuItem, { key: menu.fullPath, props: { index: menu.fullPath }},
        [
          this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', menu.fullPath),
          this.$props.mode === 'vertical' ? h('span', { slot: 'title' }, [menu.name]) : menu.name
        ]
      )
    },
    renderSubMenu: function(h, menu) {
      const this_ = this
      const subItem = [h('template', { slot: 'title', attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;' }},
        [
          this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', menu.fullPath),
          this.$props.mode === 'vertical' ? h('span', { slot: 'title' }, [menu.name]) : menu.name
        ]
      )]
      const itemArr = []
      menu.children.forEach(function(item) {
        itemArr.push(this_.renderItem(h, item))
      })
      // 这是一个至关重要的key，切换菜单栏模式无法选中，需要加一个key
      return h(Submenu, { key: menu.fullPath, props: { index: menu.fullPath }},
        subItem.concat(itemArr)
      )
    },
    renderItem: function(h, menu) {
      const meta = menu.meta
      if (!meta || !meta.invisible) {
        let renderChildren = false
        const children = menu.children
        if (children !== undefined) {
          for (let i = 0; i < children.length; i++) {
            const childMeta = children[i].meta
            if (!childMeta || !childMeta.invisible) {
              renderChildren = true
              break
            }
          }
        }
        return (menu.children && renderChildren) ? this.renderSubMenu(h, menu) : this.renderMenuItem(h, menu)
      }
    },
    renderMenu: function(h, menuTree) {
      const this_ = this
      const menuArr = []
      menuTree.forEach(function(menu, i) {
        menuArr.push(this_.renderItem(h, menu, '0', i))
      })
      return menuArr
    },
    formatOptions(options, parentPath) {
      options.forEach(route => {
        const isFullPath = route.path.substring(0, 1) === '/'
        route.fullPath = isFullPath ? route.path : parentPath + '/' + route.path
        if (route.children) {
          this.formatOptions(route.children, route.fullPath)
        }
      })
    },
    updateMenu() {
      this.selectedKeys = this.getSelectedKeys()
      let openKeys = this.selectedKeys.filter(item => item !== '')
      openKeys = openKeys.slice(0, openKeys.length - 1)
      if (!fastEqual(openKeys, this.sOpenKeys)) {
        this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.sOpenKeys = openKeys
      }
    },
    getSelectedKeys() {
      let matches = this.$route.matched
      const route = matches[matches.length - 1]
      let chose = this.routesMap[route.path]
      if (chose && chose.meta && chose.meta.highlight) {
        chose = this.routesMap[chose.meta.highlight]
        const resolve = this.$router.resolve({ path: chose.fullPath })
        matches = (resolve.resolved && resolve.resolved.matched) || matches
      }
      return matches.map(item => item.path)
    }
  },
  render(h) {
    return h(
      MenuTransform,
      {
        props: {
          theme: this.menuTheme,
          mode: this.$props.mode,
          level: 1,
          collapse: this.$props.collapsed,
          defaultActive: this.layout === 'mix' && this.mode === 'horizontal' ? this.selectedKeys[1] : this.activeMenu,
          defaultOpeneds: this.openKeys ? this.openKeys : this.sOpenKeys,
          router: true
        },
        on: {
          change(val) {
            // this.defaultActive = val
          }
        }
      }, this.renderMenu(h, this.options)
    )
  }
}

