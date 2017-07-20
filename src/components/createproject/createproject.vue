<template lang="html">
  <!-- 创建项目 -->
  <section class="createproject">
    <header class="header">
      <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
      <h2 class="title">创建项目</h2>
    </header>
    <section class="upload">
      <div class="logo">
        <span>上传图片</span>
        <div class="logo-img">
          <img src="https://s.gravatar.com/avatar/f0a29af415477aa8c498a4f41ffe6640?size=100&default=retro" alt="">
        </div>
      </div>
      <div class="item">
        <span class="title">标题：</span>
        <input class="item-val" type="text" placeholder="请输入标题">
      </div>
      <div class="item">
        <span class="title">简介：</span>
        <textarea class="item-val" placeholder="请输入简介"></textarea>
      </div>
      <div class="item">
        <span class="title">单笔金额：</span>
        <input class="item-val" type="tel" placeholder="请输入单笔金额（元）">
      </div>
      <div class="item">
        <span class="title">总金额：</span>
        <input class="item-val" type="tel" placeholder="请输入总金额（元）">
      </div>
    </section>
    <div class="btn">
      <button type="button" class="waves-effect waves-button waves-light">创建</button>
    </div>
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
  @import "../../common/sass/style.scss";
  .createproject{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #ECF0F1;
    z-index: 99;
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
    .upload{
      margin-top: .13rem;
      padding: .4rem;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      .logo{
        text-align: center;
        font-size: 16px;
        color: $textColor2;
        .logo-img{
          margin-top: .27rem;
          img{
            width: 4rem;
          }
        }
      }
      .item{
        margin-top: .27rem;
        display: flex;
        align-items: center;
        padding-bottom: 1px;
        @include border(b);
        .title{
          padding-right: .4rem;
          font-size: .43rem;
          color: $textColor1;
        }
        .item-val{
          flex: 1;
          border: 0;
          font-size: .43rem;
          color: $textColor1;
        }
        textarea{
          height: 1.76rem;
        }
      }
    }
    .btn{
      margin-top: .53rem;
      padding-bottom: .53rem;
      text-align: center;
      button{
        width: 5.33rem;
        background-color: $btnColor9;
        color: #fff;
      }
    }
  }
</style>
