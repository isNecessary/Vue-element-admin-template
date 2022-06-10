// import { routes } from '@/router'
// 应用配置
const appOptions = {
  router: undefined,
  store: undefined
}
// 不需要登录拦截的路由配置
const loginIgnore = {
  names: ['404', '403'], // 根据路由名称匹配
  paths: ['/login'], // 根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  }
}
function setAppOptions(options) {
  const { router, store } = options
  appOptions.router = router
  appOptions.store = store
}
/**
 * 从路由 path 解析 i18n key
 * @param path
 * @returns {*}
 */

// const loadRoutes = async function() {
//   const { router, store } = appOptions
//   // const { roles } = await store.dispatch('user/getInfo')
//   // const roles = ['ACCOUNT_MANAGE',
//   //   'USER_MANAGE',
//   //   'ROLE_MANAGE',
//   //   'OPT_MANAGE']
//   // generate accessible routes map based on roles
//   const accessRoutes = routes
//   // dynamically add accessible routes
//   // router.addRoutes(accessRoutes)
//   const rootRoutes = accessRoutes.find(item => item.path === '/')
//   const menuRoutes = rootRoutes && rootRoutes.children
//   if (menuRoutes) {
//     store.commit('setting/setMenuData', menuRoutes)
//   }
// }
function loadGuards(guards, options) {
  const { beforeEach, afterEach } = guards
  const { router } = options
  beforeEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.beforeEach((to, from, next) => guard(to, from, next, options))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.afterEach((to, from) => guard(to, from, options))
    }
  })
}
export { loginIgnore, loadGuards, setAppOptions }
