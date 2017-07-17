<template>
  <div id="app">
    <header class="header">
      <figure class="figure">
        <i class="waves-effect waves-light">
          <img class="waves-image" src="https://s.gravatar.com/avatar/f0a29af415477aa8c498a4f41ffe6640?size=100&default=retro" alt="头像">
        </i>
        <figcaption class="figcaption">用户名</figcaption>
      </figure>
      <div class="establish">
        <router-link to="/createproject">
          <button type="button" class="waves-effect waves-button waves-float">创建项目</button>
        </router-link>
      </div>
    </header>
    <nav class="nav">
      <router-link to="/allshots"><span>全部在投</span></router-link>
      <router-link to="/myshots"><span>我投的</span></router-link>
      <router-link to="/myinvite"><span>我邀请的</span></router-link>
    </nav>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view name="tab"></router-view>
      </keep-alive>
    </transition>
    <transition name="translate">
      <keep-alive>
        <router-view name="create"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
  @import "common/sass/style.scss";

  #app{
    overflow: hidden;
    .header{
      padding: 1rem 0;
      text-align: center;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      .figure{
        i{
          width: 1.6rem;
          border-radius: 1.6rem;
          img{
            display: block;
            width: 100%;
          }
        }
        .figcaption{
          margin-top: .16rem;
          font-size: .43rem;
          color: $textColor2;
        }
      }
      .establish{
        margin-top: 1rem;
        button{
          width: 5.33rem;
          background-color: $btnColor9;
          color: #fff;
          font-size: .37rem;
        }
      }
    }
    .nav{
      margin-top: .4rem;
      display: flex;
      background-color: #fff;
      @include border(b);
      a{
        flex: 1;
        padding: .4rem 0;
        text-align: center;
        color: $textColor1;
        font-size: .43rem;
        font-weight: 400;
        text-decoration: none;
        span{
          position: relative;
          padding: 0 .13rem .37rem .13rem;
          &:after{
            content: "";
            position: absolute;
            bottom: .11rem;
            left: 0;
            width: 100%;
            height: .05rem;
            background-color: $btnColor9;
            border-radius: 2px;
            transform: scaleX(0);
            transform-origin: center;
            transition: all .3s;
            z-index: 9;
          }
        }
      }
      .router-link-active{
        color: $btnColor9;
        span{
          &:after{
            transform: scaleX(1);
          }
        }
      }
    }
  }
  // 创建项目动画
  .translate-enter-active, .translate-leave-active {
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  .translate-enter, .translate-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  // tab过渡
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
