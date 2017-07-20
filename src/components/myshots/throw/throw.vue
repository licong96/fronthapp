<template lang="html">
  <!-- 我投的去投 -->
  <section class="throw" ref="throw">
    <div class="throw-wrap">
      <header class="header">
        <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
        <h2 class="title">去投</h2>
      </header>
      <section class="main">
        <div class="title">
          <span>日期</span>
          <span>上证指数</span>
          <span>份数</span>
          <span>金额</span>
        </div>
        <div class="text" ref="textdraw">
          <ul>
            <li v-for="(item, index) in 2">
              <span>2017-7-19</span>
              <span>3170.60</span>
              <span>1份</span>
              <span>20元</span>
            </li>
          </ul>
        </div>
      </section>
      <section class="throwpush">
        <div class="flex-warp shanghai">
          <span class="flex-warp-span">上证指数</span>
          <div class="flex-warp-val">
            <input type="text" placeholder="请输入上证指数">
          </div>
        </div>
        <div class="flex-warp copies">
          <span class="flex-warp-span">份数</span>
          <div class="flex-warp-val copies-count">
            <i class="iconfont icon-jiajian- waves-effect waves-float waves-circle"></i>
            <input type="tel" class="copies-input" v-model="count">
            <i class="iconfont icon-jiajian-1 waves-effect waves-float waves-circle"></i>
          </div>
        </div>
        <div class="flex-warp money">
          <span class="flex-warp-span">金额</span>
          <span class="flex-warp-val">￥20元</span>
        </div>
      </section>
      <div class="hr"></div>
    </div>
    <div class="btn">
      <button type="button" class="waves-effect waves-button waves-light">去投</button>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  created () {
    this.$nextTick(() => {
      this.textscroll = new this.BScroll(this.$refs.throw, {
        click: true
      })
    })
  },
  methods: {
    back () {
      this.router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../common/sass/style.scss";

  .throw{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
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
    .main{
      margin-top: .27rem;
      padding: .4rem 0;
      text-align: center;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      .title{
        display: flex;
        span{
          flex: 1;
          font-size: .4rem;
          font-weight: 700;
          color: $textColor1;
        }
      }
      .text{
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
    .throwpush{
      position: relative;
      z-index: 2;
      margin-top: .27rem;
      padding: .4rem;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      .flex-warp{
        display: flex;
        align-items: center;
        padding: .27rem 0;
        .flex-warp-span{
          flex: 1;
          font-size: .43rem;
          color: #333;
        }
        .flex-warp-val{
          flex: 2;
        }
      }
      .shanghai{
      }
      .copies{
        .copies-count{
          display: flex;
          align-items: center;
          .iconfont{
            background-color: #1abc9c;
            color: #fff;
            &.waves-circle{
              width: 2em;
              height: 2em;
              line-height: 2em;
            }
          }
          .copies-input{
            margin: 0 .27rem;
            width: 1.33rem;
            text-align: center;
            padding: 5px 0;
          }
        }
      }
      .money{
        .flex-warp-val{
          font-size: .43rem;
          color: #e74c3c;
        }
      }
    }
    .hr{
      position: relative;
      z-index: 1;
      width: 100%;
      height: 50px;
      background: #ECF0F1;
    }
    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      button{
        padding: 1em;
        width: 100%;
        background-color: $btnColor9;
        border-radius: 0;
        font-size: .43rem;
        color: #fff;
      }
    }
  }
</style>
