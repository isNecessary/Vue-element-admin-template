import defaultSettings from '@/settings'
import { formatFullPath } from '@/utils/setting'
import { ADMIN } from '@/config/default'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
const localSetting = JSON.parse(localStorage.getItem('admin.setting'))
export default {
  namespaced: true,
  state: {
    systemName: 'Vue EL Admin',
    scale: 1, // 缩放
    filterMenu: true, // 是否根据权限过滤路由
    layout: localSetting.layout || 'mix', // side, head, mix
    fixedTabs: true,
    sideBar: '',
    menuData: [],
    animates: ADMIN.animates,
    palettes: ADMIN.palettes,
    activatedFirst: undefined,
    defaultActive: undefined,
    showSettings: showSettings,
    pageMinHeight: 0,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    fixedSideBar: false,
    theme: {
      color: localSetting.color || '#1890ff',
      mode: 'light'
    }
  },

  getters: {
    menuData(state, getters, rootState) {
      return state.menuData
    },
    firstMenu(state, getters) {
      const { menuData } = getters
      if (menuData.length > 0 && !menuData[0].fullPath) {
        formatFullPath(menuData)
      }
      return menuData.map(item => {
        const menuItem = { ...item }
        delete menuItem.children
        return menuItem
      })
    },
    subMenu(state) {
      const { menuData, activatedFirst } = state
      if (menuData.length > 0 && !menuData[0].fullPath) {
        formatFullPath(menuData)
      }
      const current = menuData.find(menu => menu.fullPath === activatedFirst)
      return current && current.children || []
    }
  },

  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    },
    setLayout(state, layout) {
      state.layout = layout
    },
    setAnimate(state, animate) {
      state.animate = animate
    },
    setMenuData(state, menuData) {
      state.menuData = menuData
    },
    setTheme(state, theme) {
      state.theme = theme
    },
    correctPageMinHeight(state, minHeight) {
      state.pageMinHeight += minHeight
    },
    setActivatedFirst(state, activatedFirst) {
      state.activatedFirst = activatedFirst
    },
    setDefaultActive(state, defaultActive) {
      state.defaultActive = defaultActive
    },
    setScale(state, scale) {
      state.scale = scale
    },
    setFixedSideBar(state, fixedSideBar) {
      state.fixedSideBar = fixedSideBar
    }
  },

  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}

// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions
// }

