<template lang="html">
  <!-- 开奖 -->
  <section class="draw">
    <header class="header">
      <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
      <h2 class="title" @click="scroll">开奖</h2>
    </header>
    <div class="nav" ref="navdraw">
      <ul>
        <li v-for="(item, index) in 10">7-1{{index}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  created () {
    this.$nextTick(() => {
      this.scroll = new this.BScroll(this.$refs.navdraw, {
        click: true,
        scrollX: true
      })
    })
  },
  methods: {
    back () {
      this.router.go(-1)
    },
    scroll () {
      this.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../common/sass/style.scss";

  .draw{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: #ECF0F1;
    .header{
      position: relative;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      font-size: .43rem;
      .iconfont{
        position: relative;
        z-index: 3;
      }
      .title{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 42px;
        text-align: center;
        z-index: 2;
        color: #000;
      }
    }
    .nav{
      position: fixed;
      top: 43px;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 1.12rem;
      line-height: 1.12rem;
      background-color: #fff;
      overflow: hidden;
      ul{
        display: flex;
        overflow-x: scroll;
        li{
          flex: 0 0 auto;
          padding: 0 20px;
          height: 1.12rem;
          @include border(r);
        }
      }
    }
  }
</style>
