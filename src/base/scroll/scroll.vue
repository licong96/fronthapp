<template lang="html">
  <!-- 封装成一个页面scroll组件 -->
  <section ref="wrapper">
    <slot></slot>
  </section>
</template>

<script>
import BScroll from 'better-scroll'
import {classie} from 'common/js/dom'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: null
    },
    listemScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      // console.log(this.data)
      this._initScroll()
    }, 20)
    // 装载延迟动画
    let els = Array.from(this.$el.querySelectorAll('[router-anime]'))
    els.forEach((el, index) => {
      setTimeout(() => classie.addClass(el, 'routerAnimation'), 100 * index)
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      // 监听scroll滚动事件
      if (this.listemScroll) {
        let self = this
        this.scroll.on('scroll', (pos) => {
          self.$emit('scroll', pos)           // 派发事件，输出位置
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()    // 启用
    },
    disable () {
      this.scroll && this.scroll.disable()  // 禁用
    },
    refresh () {
      this.scroll && this.scroll.refresh()  // 重新计算
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
