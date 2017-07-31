<template lang="html">
  <!-- 全部去投 -->
  <section class="throw">
    <!-- <scroll class="throw-content" :data="allshotsData" ref="scroll">
      <div>
        <div class="throw-wrap">
          <div class="header">
            <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
            <img class="loadimg" @load="loadImage" v-lazy="allshotsData.src">
          </div>
          <div class="text">
            <h3 router-anime class="title">{{allshotsData.title}}</h3>
            <p router-anime class="desc">{{allshotsData.brief}}</p>
            <span router-anime class="addtime">{{allshotsData.addtime}}</span>
          </div>
          <throwpush router-anime :data="allshotsData" ref="thowpushs"></throwpush>
          <div class="hr"></div>
        </div>
      </div>
    </scroll> -->

    <div class="header" ref="header">
      <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
      <span class="title">{{allshotsData.title}}</span>
    </div>
    <i class="iconfont icon-fanhui waves-effect waves-circle back" @click="back"></i>
    <div class="bgimage" :style="bgImage" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <scroll
    class="throw-content"
    :data="allshotsData"
    :probe-type="probeType"
    :listem-scroll="listemScroll"
    @scroll="scroll"
    ref="scrolls">
      <div class="throw-wrap">
        <div class="text">
          <h3 router-anime class="title">{{allshotsData.title}}</h3>
          <p router-anime class="desc">{{allshotsData.brief}}</p>
          <span router-anime class="addtime">{{allshotsData.addtime}}</span>
        </div>
        <div class="hr-top"></div>
        <!-- 上证指数组件 -->
        <throwpush router-anime :data="allshotsData" ref="thowpushs"></throwpush>
        <div class="hr"></div>
      </div>
    </scroll>
    <div class="btn" @click="goThrow">
      <button type="button" class="waves-effect waves-button waves-light gothrow">去投</button>
    </div>
  </section>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Throwpush from 'base/throwpush/throwpush'
import {mapGetters} from 'vuex'
import {STATUS_OK} from 'api/config'
import {prefixStyle} from 'common/js/dom'
import weixin from 'weixin-js-sdk'

const transform = prefixStyle('transform')    // 浏览器前缀
const filter = prefixStyle('filter')          // 浏览器前缀

export default {
  data () {
    return {
      count: 1,
      allshotsData: {},
      WeixinJSBridge: null,
      weixinData: null,
      scrollY: 0
    }
  },
  created () {
    this.probeType = 3
    this.listemScroll = true
    this._getAllshotsList()
  },
  mounted () {
    // 保存高度，减少dom请求
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.$refs.scrolls.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    scroll (pos) {     // 监听滚动位置
      this.scrollY = pos.y
    },
    _getAllshotsList () {
      if (!this.allshots.length) {
        return false
      }
      let id = this.$route.params.id    // 获取参数
      this.allshots.forEach(function (item) {
        if (item.id === id) {
          this.allshotsData = item
        }
      }.bind(this))
    },
    loadImage () {
      setTimeout(() => {
        this.$refs.scrolls.refresh()
      }, 20)
    },
    goThrow () {      // 去投
      let postData = this.$refs.thowpushs.submit()
      if (!postData) {
        return false
      }
      this.axios.post('wxgroupapi.php?type=addindex', postData)
        .then(function (response) {
          if (response.data.status === STATUS_OK) {
            console.log(response.data)
            this.weixinData = response.data.data
            this.callpay()
          }
        }.bind(this))
        .catch(function (error) {
          this.swal('网络错误', error, 'error')
        }.bind(this))
    },
    callpay () {    // 支付判断
      if (typeof weixin.WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.jsApiCall)
          document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall)
        }
      } else {
        this.jsApiCall()
      }
    },
    jsApiCall () {    // 调用支付
      // let self = this
      weixin.WeixinJSBridge.invoke('getBrandWCPayRequest',
      this.weixinData,
      function (res) {
        weixin.WeixinJSBridge.log(res.err_msg)
        alert(res.err_code + res.err_desc + res.err_msg)
      })
    },
    back () {
      this.$router.back()
    }
  },
  computed: {
    bgImage () {
      return `background-image: url(${this.allshotsData.src})`
    },
    ...mapGetters([
      'allshots'
    ])
  },
  watch: {
    scrollY (newY) {
      // console.log(newY)
      let scale = 1
      let blur = 0
      let opacity = 0
      let imgTop = 0
      let percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        imgTop = 0
      } else {
        imgTop = percent * 100
        blur = Math.min(10 * percent, 10)   // 返回最小值
        opacity = Math.min(percent, 1)   // header下滑
        this.$refs.filter.style.background = `rgba(255, 255, 255, ${percent})`
        this.$refs.header.style.opacity = `${opacity}`
      }
      this.$refs.bgImage.style[filter] = `blur(${blur}px)`
      this.$refs.bgImage.style[transform] = `scale(${scale}) translate3d(0, -${imgTop}px, 0)`
    },
    allshots: {
      handler: function (newVal) {
        this._getAllshotsList()
      },
      deep: true
    }
  },
  components: {
    Scroll,
    Throwpush
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../common/sass/style.scss";

  .throw {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #ECF0F1;
    .header {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 1.07rem;
      background-color: #fff;
      font-size: .43rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      .iconfont {
        position: relative;
        z-index: 3;
        color: #000000;
      }
      .title {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        padding: 0 15%;
        width: 70%;
        line-height: 1.07rem;
        text-align: center;
        @include nowrap;
      }
    }
    .back {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
    }
    .waves-circle {
      width: 1.9em;
      height: 1.9em;
      line-height: 1.9em;
      margin-left: .3em;
      margin-top: .3em;
    }
    .bgimage {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      transform-origin: top;
      background-size: cover;
      background-position: center;
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .throw-content {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
    }
    .text{
      padding: .4rem;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      overflow: hidden;
      .title{
        font-size: .43rem;
        font-weight: 700;
        color: #333;
      }
      .desc{
        margin-top: .27rem;
        line-height: 1.5;
        font-size: .43rem;
        color: #666;
      }
      .addtime{
        display: block;
        margin-top: .4rem;
        text-align: right;
        color: #999;
        font-size: .37rem;
      }
    }
    .hr{
      position: relative;
      z-index: 1;
      width: 100%;
      height: 1.7rem;
      background: #ECF0F1;
    }
    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      .gothrow{
        padding: 1em;
        width: 100%;
        background-color: $btnColor9;
        border-radius: 0;
        font-size: .43rem;
        color: #fff;
      }
    }
    .hr-top {
      width: 100%;
      height: .27rem;
      background-color: #ECF0F1;
    }
  }
</style>
