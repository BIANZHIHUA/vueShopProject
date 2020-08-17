import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '../components/login.vue'
const login = () => import(/* webpackChunkName:"login_home_welcome" */'../components/login.vue')

// import home from '../components/home.vue'
const home = () => import(/* webpackChunkName:"login_home_welcome" */'../components/home.vue')

// import welcome from '../components/welcome.vue'
const welcome = () => import(/* webpackChunkName:"login_home_welcome" */'../components/welcome.vue')

// import user from '../components/user/users.vue'
const user = () => import(/* webpackChunkName:"user_roles_rights" */'../components/user/users.vue')
// import roles from '../components/power/roles.vue'
const roles = () => import(/* webpackChunkName:"user_roles_rights" */'../components/power/roles.vue')
// import rights from '../components/power/rights.vue'
const rights = () => import(/* webpackChunkName:"user_roles_rights" */'../components/power/rights.vue')

// import cate from '../components/goods/cate.vue'
const cate = () => import(/* webpackChunkName:"cate_params" */'../components/goods/cate.vue')
// import params from '../components/goods/params.vue'
const params = () => import(/* webpackChunkName:"cate_params" */'../components/goods/params.vue')

// import goodsList from '../components/goods/list.vue'
const goodsList = () => import(/* webpackChunkName:"goodsList_addGoods" */'../components/goods/list.vue')
// import addGoods from '../components/goods/users.vue'
const addGoods = () => import(/* webpackChunkName:"goodsList_addGoods" */'../components/goods/users.vue')

// import order from '../components/order/order.vue'
const order = () => import(/* webpackChunkName:"order_report" */'../components/order/order.vue')
// import report from '../components/report/report.vue'
const report = () => import(/* webpackChunkName:"order_report" */'../components/report/report.vue')

Vue.use(VueRouter)

// 解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home', component: home, redirect: '/welcome', children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: user },
      { path: '/roles', component: roles },
      { path: '/rights', component: rights },
      { path: '/categories', component: cate },
      { path: '/params', component: params },
      { path: '/goods', component: goodsList },
      { path: '/path', component: addGoods },
      { path: '/orders', component: order },
      { path: '/reports', component: report }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const sessionStr = window.sessionStorage.getItem('token')
  if (!sessionStr) return next('/login');
  next()
})
export default router
