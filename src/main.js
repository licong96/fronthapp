// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import libFlexible from 'lib-flexible'
import fastclick from 'fastclick'
import Waves from 'node-waves'
import BScroll from 'better-scroll'

Vue.config.productionTip = false
Vue.prototype.router = router
Vue.prototype.BScroll = BScroll

Vue.use(libFlexible)                // 移动端rem计算
Waves.init()                        // 波纹点击效果初始化
fastclick.attach(document.body)     // 取消移动端点击事件延迟
import 'common/css/flexible.css'    // 样式初始化
import 'common/css/waves.css'      // 波纹样式初始化

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
