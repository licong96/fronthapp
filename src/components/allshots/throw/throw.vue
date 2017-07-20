<template lang="html">
  <!-- 全部去投 -->
  <section class="throw" ref="throw">
    <div class="throw-wrap">
      <div class="header">
        <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
        <img src="http://preview.quanjing.com/pm0052/pm0052-1907vh.jpg" alt="">
      </div>
      <div class="text">
        <h3>项目名称</h3>
        <p>文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述</p>
      </div>
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
      height: 250px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      .iconfont{
        position: absolute;
        top: .13rem;
        left: .13rem;
        background-color: rgba(0,0,0,0.1);
        color: #fff;
      }
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .text{
      margin-top: .27rem;
      padding: .4rem;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      h3{
        font-size: .43rem;
        color: #333;
      }
      p{
        margin-top: .27rem;
        line-height: 1.5;
        font-size: .37rem;
        color: #666;
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
