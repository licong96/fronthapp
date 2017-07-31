<template lang="html">
  <!-- 延迟动画 -->
  <section class="router-anime">
    <slot></slot>
  </section>
</template>

<script>
  import {classie} from 'common/js/dom'

  export default {
    mounted () {      // 装载延迟动画
      setTimeout(() => {
        this.anime()
      }, 20)
    },
    methods: {
      anime () {
        let els = Array.from(this.$el.querySelectorAll('[router-anime]'))
        els.forEach((el, index) => {
          setTimeout(() => classie.addClass(el, 'routerAnimation'), 100 * index)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
