// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import swal from 'sweetalert'
import libFlexible from 'lib-flexible'
import fastclick from 'fastclick'
import Waves from 'node-waves'
import BScroll from 'better-scroll'

Vue.config.productionTip = false
Vue.prototype.router = router
Vue.prototype.axios = axios
Vue.prototype.BScroll = BScroll
Vue.prototype.swal = swal

Vue.use(libFlexible)                // 移动端rem计算
Waves.init()                        // 波纹点击效果初始化
fastclick.attach(document.body)     // 取消移动端点击事件延迟
import 'common/css/flexible.css'    // 样式初始化
import 'common/css/waves.css'      // 波纹样式初始化
import 'common/css/sweetalert.css' // 弹出框样式初始化

// vue图片懒加载
Vue.use(VueLazyload, {
  error: require('common/image/loading.gif'),
  loading: require('common/image/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
