<template lang="html">
  <!-- 在投项目 -->
  <section class="allshots">
    <router-anime>
      <ul>
        <li router-anime v-for="item in allshotsData">
          <p class="title">{{item.title}}</p>
          <router-link :to="{ name: 'AllshotsDraw', params: { id: item.id }}" class="waves-effect waves-button draw">开奖</router-link>
          <router-link :to="{ name: 'AllshotsThrow', params: { id: item.id }}" class="waves-effect waves-button throw">去投</router-link>
        </li>
      </ul>
    </router-anime>
    <transition name="translate">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import RouterAnime from 'base/router-anime/router-anime'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      allshotsData: {}
    }
  },
  computed: {
    ...mapGetters([
      'allshots'
    ])
  },
  created () {
    this.allshotsData = this.allshots
  },
  watch: {
    allshots: {
      handler: function (newVal) {
        this.allshotsData = newVal
        console.log(this.allshotsData)
      },
      deep: true
    }
  },
  components: {
    RouterAnime
  }
}
</script>

<style lang="scss" scoped>
  @import "../../common/sass/style.scss";

  .allshots{
    padding: .2rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    li{
      display: flex;
      margin: 0 .2rem;
      padding: .27rem 0;
      align-items: center;
      @include border(b);
      p{
        flex: 1;
        line-height: 1.5;
        font-size: .43rem;
        color: $textColor1;
      }
      a{
        color: #fff;
        margin-left: .4rem;
        font-size: .32rem;
      }
      .draw{
        background-color: $color3;
      }
      .throw{
        background-color: $btnColor9;
      }
    }
  }

  .translate-enter-active, .translate-leave-active {
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  .translate-enter, .translate-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
