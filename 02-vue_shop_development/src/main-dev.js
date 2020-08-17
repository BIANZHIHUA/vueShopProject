import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入可以处理树形结构数据的表格插件
import treeTable from "vue-table-with-tree-grid"
// 导入富文本编辑器
import vueQuillEditor from "vue-quill-editor"
// 富文本编辑器的相关样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 引入页面加载的进度条
import NProgess from 'nprogress'
import 'nprogress/nprogress.css'
// 导入axios发送请求
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

// axios设置请求拦截器
// config是数据发送的配置对象
axios.interceptors.request.use(config => {
  NProgess.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, err => {
  console.log(err)
})
// axios设置响应拦截器
// config时数据的配置对象
axios.interceptors.response.use(config => {
  NProgess.done()
  return config
}, err => {
  console.log(err)
})

// Vue过滤器注册
Vue.filter('dateFormat', function (originNumbers) {
  const dt = new Date(originNumbers)

  const yy = dt.getFullYear()
  const mm = (dt.getMonth() + 1 + '').padStart(2, '0')
  const dd = (dt.getDay() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mi = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${yy}-${mm}-${dd}  ${hh}:${mi}:${ss}`
})

// 注册全局组件treeTable,命名为tree-table
Vue.component('tree-table', treeTable)

// 注册全局富文本编辑器
Vue.use(vueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
