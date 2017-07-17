<template lang="html">
  <!-- 创建项目 -->
  <section class="createproject">
    <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
  </section>
</template>

<script>
export default {
  methods: {
    back () {
      this.router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .createproject{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ECF0F1;
    z-index: 99;
  }
</style>
