<template lang="html">
  <!-- 创建项目 -->
  <section class="createproject">
    <header class="header">
      <i class="iconfont icon-fanhui waves-effect waves-circle" @click="back"></i>
      <h2 class="title">创建项目</h2>
    </header>
    <section class="upload">
      <div class="logo">
        <div class="logo-img">
          <img :src="postData.src" alt="" v-show="postData.src">
        </div>
        <i class="iconfont icon-picture"></i>
      </div>
      <div class="upload-btn">
        <vue-core-image-upload
          class="btn btn-primary"
          crop-ratio="1:0.8"
          crop="local"
          @imageuploaded="imageuploaded"
          @imagechanged="imagechanged"
          @imageuploading="imageuploading"
          @errorhandle="errorhandle"
          :max-file-size="2097152"
          :isXhr="true"
          url="wxgroupapi.php?type=uploadimg"
          text="上传图片" >
        </vue-core-image-upload>
      </div>
      <div class="item">
        <span class="title">标题：</span>
        <input class="item-val" type="text" v-model="postData.title" placeholder="请输入标题">
      </div>
      <div class="item">
        <span class="title">简介：</span>
        <textarea class="item-val" v-model="postData.brief" placeholder="请输入简介"></textarea>
      </div>
      <div class="item">
        <span class="title">单笔金额：</span>
        <input class="item-val" type="tel" v-model="postData.singleamount" @change="singnumbers" placeholder="请输入单笔金额（元）">
        <strong class="unit">元</strong>
      </div>
      <div class="item">
        <span class="title">总金额：</span>
        <input class="item-val" type="tel" v-model="postData.grossamount" @change="grossnumbers" placeholder="请输入总金额（元）">
        <strong class="unit">元</strong>
      </div>
    </section>
    <div class="btn">
      <button type="button" class="waves-effect waves-button waves-light" @click="submit">创建</button>
    </div>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  data () {
    return {
      postData: {
        src: '',
        title: '',
        brief: '',
        singleamount: '',
        grossamount: ''
      },
      hint: '内容不能为空',
      hintAnim: false
    }
  },
  methods: {
    imageuploaded (res) {
      if (res.errcode === 0) {
        this.postData.src = res.data.src
      }
    },
    imagechanged (res) {
      this.postData.src = res
    },
    imageuploading () {
      console.log('上传过程中动画')
    },
    errorhandle (res) {
      this.swal('图片不能超过2M', res, 'error')
    },
    singnumbers () {
      let numPattern = /^-?\d*\.?\d+$/      // 只能是整数
      if (!numPattern.test(this.postData.singleamount)) {
        this.swal('请输入合法数字', '单笔金额单位默认（元）', 'warning')
      }
    },
    grossnumbers () {
      let numPattern = /^-?\d*\.?\d+$/      // 只能是整数
      if (!numPattern.test(this.postData.grossamount)) {
        this.swal('请输入合法数字', '总金额单位默认（元）', 'warning')
      }
    },
    submit () {
      // 不能为空
      if (!this.postData.src) {
        this.swal('请上传图片', '图片不能为空', 'warning')
        return false
      } else if (!this.postData.title) {
        this.swal('请输入标题', '标题不能为空', 'warning')
        return false
      } else if (!this.postData.brief) {
        this.swal('请输入简介', '简介不能为空', 'warning')
        return false
      } else if (!this.postData.singleamount) {
        this.swal('请输入单笔金额', '单笔金额不能为空', 'warning')
        return false
      } else if (!this.postData.grossamount) {
        this.swal('请输入总金额', '总金额不能为空', 'warning')
        return false
      }
      let _this = this
      this.axios.post('wxgroupapi.php?type=addproject', _this.postData)
      .then(function (response) {
        // console.log(response)
        if (response.data.status === 1) {
          // this.swal('创建成功', '可回首页查看', 'success')
          _this.swal({
            title: '创建成功',
            text: '可回首页查看',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: '确定',
            closeOnConfirm: true
          },
          function () {
            _this.router.push('/myshots')
          })
          // 上次成功后再次获取数据
          _this.axios.get('wxgroupapi.php?type=userinfo')
                .then(function (response) {
                  if (response.data.status === 1) {
                    _this.setAllshots(response.data.ztxm)      // 在投项目
                    _this.setMyshots(response.data.wdxm)      // 我的项目
                  }
                })
        } else {
          _this.swal('网络错误', response.data.msg, 'error')
        }
      })
      .catch(function (error) {
        _this.swal('网络错误', error, 'error')
      })
    },
    ...mapMutations({
      setAllshots: 'SET_ALLSHOTS',
      setMyshots: 'SET_MYSHOTS'
    }),
    back () {
      this.router.go(-1)
    }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload
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
        position: relative;
        text-align: center;
        font-size: 16px;
        color: $textColor2;
        .logo-img{
          position: relative;
          z-index: 5;
          margin: 0 auto;
          width: 4rem;
          height: 3.2rem;
          border: 1px solid rgba(0, 0, 0, .1);
          box-shadow: 0 0 3px 1px rgba(0, 0, 0, .1);
          border-radius: .11rem;
          overflow: hidden;
          img{
            width: 100%;
            border: 0;
          }
        }
        .iconfont{
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 4;
          margin-top: -50px;
          margin-left: -50px;
          font-size: 100px;
          color: rgba(0, 0, 0, .1);
        }
      }
      .upload-btn{
        display: block;
        margin: .27rem 2rem .8rem 2rem;
        padding: 0;
        border-radius: 0.2em;
        background-color: $btnColor9;
        color: #fff;
        font-size: .37rem;
        .btn{
          margin: 0;
          padding: .6em;
          transition: all .3s;
          &:active{
            background-color: rgba(255,255,255,.5);
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
        .unit{
          color: $btnColor9;
        }
        textarea{
          height: 1.76rem;
        }
      }
    }
    .btn{
      margin-top: .53rem;
      padding-bottom: 1rem;
      text-align: center;
      button{
        width: 7rem;
        background-color: $btnColor9;
        color: #fff;
        font-size: .37rem;
      }
    }
    .hint-wrap{
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 99;
      width: 3.73rem;
      margin-left: -1.87rem;
      text-align: center;
      .hint{
        padding: .21rem .27rem;
        background-color: rgba(0, 0, 0, .6);
        color: #fff;
        border-radius: .53rem;
        font-size: .37rem;
      }
    }
  }
</style>
