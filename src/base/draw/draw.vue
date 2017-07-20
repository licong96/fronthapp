<template lang="html">
  <!-- 开奖 -->
  <section class="draw">
    <header class="header">
      <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
      <h2 class="title">开奖</h2>
    </header>
    <div class="nav" ref="navdraw">
      <ul ref="uldraw">
        <li v-for="(item, index) in 10" :class="{active: activeNum===index}" @click="switchover(index)">7-1{{index}}</li>
      </ul>
    </div>
    <section class="main">
      <div class="title">
        <span>用户名</span>
        <span>上证指数</span>
        <span>份额</span>
        <span>金额</span>
      </div>
      <div class="text" ref="textdraw">
        <ul>
          <li v-for="(item, index) in 25">
            <span>李四{{index}}</span>
            <span>3170.60</span>
            <span>1份</span>
            <span>20元</span>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      activeNum: 0
    }
  },
  created () {
    this.$nextTick(() => {
      // 根据li的个数计算ul的宽度
      let oUl = this.$refs.uldraw
      let aLi = oUl.getElementsByTagName('li')
      let ulwidth = aLi.length * 80
      this.$refs.uldraw.style.width = ulwidth + 'px'
      // 加导航横向滑动
      this.scroll = new this.BScroll(this.$refs.navdraw, {
        click: true,
        scrollX: true,
        scrollY: false
      })
      // 加内容纵向滑动
      this.textscroll = new this.BScroll(this.$refs.textdraw, {
        click: true,
        scrollX: false
      })
    })
  },
  methods: {
    back () {
      this.router.go(-1)
    },
    switchover (index) {
      this.activeNum = index
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
    overflow: hidden;
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
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 1.12rem;
      line-height: 1.12rem;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      ul{
        width: 750px;
        li{
          display: inline-block;
          width: 80px;
          height: 1.12rem;
          text-align: center;
          font-size: .4rem;
          @include border(r);
          &.active{
            background-color: $btnColor9;
            color: #fff;
            &:after{
              display: none;
            }
          }
          &:last-child{
            &:after{
              display: none;
            }
          }
        }
      }
    }
    .main{
      position: absolute;
      top: 100px;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-align: center;
      background-color: #fff;
      .title{
        display: flex;
        margin-top: .27rem;
        span{
          flex: 1;
          font-size: .4rem;
          font-weight: 700;
          color: $textColor1;
        }
      }
      .text{
        position: absolute;
        top: 30px;
        right: 0;
        bottom: 100px;
        left: 0;
        width: 100%;
        overflow: hidden;
        ul{
          padding-bottom: 30px;
        }
        li{
          display: flex;
          margin-top: .4rem;
          span{
            flex: 1;
            font-size: .37rem;
            color: $textColor2;
          }
        }
      }
    }
  }
</style>
