<template lang="html">
  <!-- 我邀请的 -->
  <section class="myinvite">
    <nav class="nav">
      <span class="name">用户名</span>
      <span class="time">注册时间</span>
      <span class="money">参与金额</span>
    </nav>
    <section class="main">
      <ul>
        <li>
          <span class="name">张三</span>
          <span class="time">2017-7-17 15:33</span>
          <span class="money">20元</span>
        </li>
      </ul>
    </section>
    <div class="food-btn">
      <button type="button" class="waves-effect waves-button waves-light">邀请好友</button>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import "../../common/sass/style.scss";

  .myinvite{
    padding: .4rem 0;
    background-color: #fff;
    .nav{
      display: flex;
      span{
        flex: 1;
        text-align: center;
        font-size: .37rem;
        font-weight: 700;
        color: $textColor2;
      }
    }
    .main{
      li{
        display: flex;
        margin-top: .4rem;
        span{
          flex: 1;
          text-align: center;
          font-size: .37rem;
        }
      }
    }
    .food-btn{
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
