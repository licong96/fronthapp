<template lang="html">
  <!-- 上证指数组件 -->
  <section class="throwpush">
    <div class="flex-warp shanghai">
      <span class="flex-warp-span">上证指数</span>
      <div class="flex-warp-val">
        <input type="text" placeholder="请输入上证指数" v-model="number" readonly @click="_pickerShow">
      </div>
    </div>
    <div class="flex-warp copies">
      <span class="flex-warp-span">份数</span>
      <div class="flex-warp-val copies-count">
        <i class="iconfont icon-jiajian- waves-effect waves-float waves-circle" @click="_countRem"></i>
        <input type="tel" class="copies-input" v-model="copies" @keyup="keyupBoard">
        <i class="iconfont icon-jiajian-1 waves-effect waves-float waves-circle" @click="_countAdd"></i>
      </div>
    </div>
    <div class="flex-warp money">
      <span class="flex-warp-span">金额</span>
      <span class="flex-warp-val">￥<span ref="monycount">{{money}}</span>元</span>
    </div>
  </section>
</template>

<script>
  import Picker from 'better-picker'
  import CountUp from 'countup.js'
  import {data1, data2, data3, data4, data5, data6, data7} from 'common/js/pickerdata'

  export default {
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        number: '0000.00',
        copies: 1,
        numAnim: null,
        postData: null,
        pickerElem: null
      }
    },
    created () {
      // console.log(this.data)
      setTimeout(() => {
        this._pickerIndexs()      // 初始化上证指数选择器
        this.animeCount()         // 金额计算动画
      }, 20)
    },
    methods: {
      _countAdd () {
        this.copies ++
        // this.animeCount()
        this.numAnim.update(this.money)       // 金额动画更新
      },
      _countRem () {
        if (this.copies > 1) {
          this.copies --
          // this.animeCount()
          this.numAnim.update(this.money)       // 金额动画更新
        } else {
          this.copies = 1
        }
      },
      keyupBoard (e) {     // 输入不得超过 10000
        let val = e.target.value
        let reg = /^[0-9]*$/
        if (val > 9999) {
          this.copies = 1
          this.swal('份数太大了', '您填错了吧~', 'error')
        } else if (!reg.test(val)) {
          this.copies = 1
          this.swal('份数只能是数字', '您填错了吧~', 'error')
        } else if (val === '') {
          this.copies = 1
        }
        this.numAnim.update(this.money)       // 金额动画更新
      },
      _pickerIndexs () {            // 配置上证指数选择器
        this.pickerElem = new Picker({
          data: [data1, data2, data3, data4, data5, data6, data7],
          selectedIndex: [0, 0, 0, 0, 0, 0, 0],
          title: '滑动选择上证指数'
        })
        this.pickerElem.on('picker.select', function (selectedVal, selectedIndex) {
          let value = ''
          for (let key in selectedVal) {
            value += selectedVal[key]
          }
          this.number = value
        }.bind(this))
      },
      _pickerShow () {        // 显示选择器
        this.pickerElem.show()
      },
      submit () {     // 验证
        this.postData = {         // 返回数据
          indexs: this.number,    // 上证指数
          copies: this.copies,    // 份数
          extras: this.money,     // 金额
          pid: this.data.id,      // id
          title: this.data.title  // 标题
        }
        if (!this.money) {
          this.swal('份数只能是数字', '金额计算错误', 'error')
        } else {
          return this.postData
        }
      },
      animeCount () {     // 金额加减动画
        this.numAnim = new CountUp(this.$refs.monycount, 0, this.money, 2, 1.5)
        this.numAnim.start()
      }
    },
    computed: {
      money () {      // 计算金额
        return this.data.singleamount * this.copies
      }
    }
  }
</script>

<style scoped lang="scss">
  .throwpush{
    position: relative;
    z-index: 2;
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
</style>
