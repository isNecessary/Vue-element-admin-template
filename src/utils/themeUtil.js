const client = require('webpack-theme-color-replacer/client')
import themeUtil from 'webpack-theme-color-replacer/themeUtil'
const { theme } = require('../config/default/setting.config')

let curColor = theme.color

// 动态切换主题色
function changeThemeColor(newColor = curColor) {
  const options = {
    newColors: themeUtil.getMyColors(newColor)
  }
  return client.changer.changeColor(options, Promise)
}

function initThemeColor() {
  const setting = localStorage.getItem('admin.setting')
  const savedColor = setting && JSON.parse(setting).color
  if (savedColor) {
    document.body.style.display = 'none'
    curColor = savedColor
    changeThemeColor(savedColor).finally(() => {
      document.body.style.display = ''
    })
  }
}

export {
  curColor,
  changeThemeColor,
  initThemeColor
}
