import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import TabsView from '@/layouts/tabs'
// import BlankView from '@/layouts/BlankView'
import Layout from '@/views/Layout'
// import PageView from '@/layouts/PageView'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const routes = [
  {
    path: '/redirect',
    component: TabsView,
    meta: {
      invisible: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: '登录页',
    meta: {
      title: '登录页',
      invisible: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
    meta: {
      invisible: true
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error-page/403')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401')
  },
  {
    path: '/',
    component: TabsView,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: '首页',
        component: Layout,
        meta: {
          title: '首页',
          icon: 'dashboard'
        },
        children: [
          {
            path: 'firstPage',
            name: '第一页',
            component: () => import('@/views/dashboard/firstPage'),
            meta: {
              title: '第一页',
              icon: 'icon'
            }
          },
          {
            path: 'secondPage',
            name: '第二页',
            component: () => import('@/views/dashboard/secondPage'),
            meta: {
              title: '第二页',
              icon: 'shopping'
            }
          }
        ]
      },
      {
        path: '/documentation',
        name: '文档',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: '文档',
          icon: 'education'
        }
      },
      {
        path: '/guide',
        name: '引导页',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: 'guide',
          icon: 'guide'
        }
      },
      {
        path: '/icon',
        name: '图标',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: '图标',
          icon: 'icon'
        }
      },
      {
        path: '/tab',
        name: 'Tab',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: 'Tab',
          icon: 'tab'
        }
      },
      {
        path: '/pdf',
        name: 'PDF',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: 'PDF',
          icon: 'pdf'
        }
      },
      {
        path: '/error',
        name: '错误页',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: '错误页',
          icon: '404'
        }
      },
      {
        path: '/link',
        name: '外链',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: '外链',
          icon: 'link'
        }
      },
      {
        path: '/qq',
        name: 'QQ',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: 'QQ',
          icon: 'qq'
        }
      },
      {
        path: '/wechat',
        name: 'Wechat',
        component: () => import('@/views/test/testPage'),
        meta: {
          title: 'Wechat',
          icon: 'wechat'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', meta: {
    invisible: true
  }}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
