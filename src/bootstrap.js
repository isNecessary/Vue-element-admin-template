
import { loadGuards, setAppOptions } from '@/utils/routerUtil'
import guards from '@/router/utils/guards'
function bootstrap({ router, store, message }) {
  setAppOptions({ router, store })
  // 加载路由守卫
  loadGuards(guards, { router, store, message })
}

export default bootstrap
