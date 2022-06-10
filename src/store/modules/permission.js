import { routes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
let result = []
export function findBorther(routers, to) {
  if (!Array.isArray(routers)) {
    to = routers
    routers = [...routes]
  }
  if (routers.length === 0) {
    return
  }
  for (let i = 0; i < routers.length; i++) {
    const route = routers[i]
    if (route.name === to.name) {
      result = routers
      break
    }
    if (route.children && route.children.length > 0) {
      findBorther(route.children, to)
    }
  }
  return result
}

export function redictPath(routes, roles) {
  let route = null
  for (let i = 0; i < routes.length; i++) {
    if (hasPermission(roles, routes[i])) {
      route = routes[i]
      break
    }
  }
  return route
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(routes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
