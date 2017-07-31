<template>
  <div id="app">
    <header class="header">
      <figure class="figure">
        <i class="waves-effect waves-light">
          <img class="waves-image loadimg" v-lazy="user.headimgurl">
        </i>
        <figcaption class="figcaption">{{user.nickname}}</figcaption>
      </figure>
      <div class="establish">
        <router-link to="/createproject">
          <button type="button" class="waves-effect waves-button waves-float">创建项目</button>
        </router-link>
      </div>
    </header>
    <nav class="nav" ref="tabs">
      <router-link to="/allshots"><span>在投项目</span></router-link>
      <router-link to="/myshots"><span>我的项目</span></router-link>
      <router-link to="/myinvite"><span>我邀请的</span></router-link>
    </nav>
    <!-- 加载中 -->
    <section class="loading">

    </section>
    <!-- v-if="user.nickname.length" -->
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view name="tab"></router-view>
      </keep-alive>
    </transition>
    <transition name="translate">
      <router-view name="create"></router-view>
    </transition>
  </div>
</template>

<script>
import scrollMonitor from 'scrollmonitor'
import {mapMutations} from 'vuex'
import {DATAS} from 'api/json'
import {classie} from 'common/js/dom'

export default {
  name: 'app',
  data () {
    return {
      user: {
        nickname: '',
        headimgurl: ''
      }
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    setTimeout(() => {
      this.scrollmonitors()
    }, 20)
  },
  methods: {
    fetchData () {
      // 模拟数据，本地测试
      console.log(DATAS)
      this.setAllshots(DATAS.ztxm)      // 在投项目
      this.setMyshots(DATAS.wdxm)      // 我的项目
      this.setInvite(DATAS.wyqd)      // 我邀请的
      /*
      this.axios.get('wxgroupapi.php?type=userinfo')
        .then(function (response) {
          // console.log(response)
          if (response.data.status === 1) {
            this.user.nickname = response.data.info.nickname
            this.user.headimgurl = response.data.info.headimgurl

            // 传入数据
            this.setAllshots(response.data.ztxm)      // 在投项目
            this.setMyshots(response.data.wdxm)      // 我的项目
            this.setInvite(response.data.wyqd)      // 我邀请的
          } else {
            window.location.href = 'oauth2.php'
          }
        }.bind(this))
        .catch(function (error) {
          this.swal('网络错误', error, 'error')
        }.bind(this))
      */
    },
    scrollmonitors () {     // tab导航fixed
      let watcher = scrollMonitor.create(this.$refs.tabs)
      watcher.lock()
      watcher.exitViewport(() => {
        classie.add(this.$refs.tabs, 'fixed')
      })
      watcher.enterViewport(() => {
        classie.remove(this.$refs.tabs, 'fixed')
      })
    },
    ...mapMutations({
      setAllshots: 'SET_ALLSHOTS',
      setMyshots: 'SET_MYSHOTS',
      setInvite: 'SET_INVITE'
    })
  }
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
          height: 1.6rem;
          border-radius: 1.6rem;
          img{
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 1.6rem;
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

      &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        margin-top: 0;
        width: 100%;
        animation: tabFixed .3s;
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
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  // tab-fixed动画
  @keyframes tabFixed {
    from {
      transform: translate3d(0, -100%, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
