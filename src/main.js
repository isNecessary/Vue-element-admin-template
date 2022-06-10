import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import { initThemeColor } from '@/utils/themeUtil'
import App from './App'
import store from './store'
import router from './router'
import bootstrap from '@/bootstrap'
import './icons' // icon
// import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})
bootstrap({ router, store, message: Vue.prototype.$message })
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
initThemeColor()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
