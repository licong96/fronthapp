import Vue from 'vue'
import Router from 'vue-router'
import createproject from 'components/createproject/createproject'
import allshots from 'components/allshots/allshots'
import myshots from 'components/myshots/myshots'
import myinvite from 'components/myinvite/myinvite'
import draw from 'base/draw/draw'       // 开奖
import allshotsthrow from 'components/allshots/throw/throw'   // 全部去投
import myshotsthrow from 'components/myshots/throw/throw'   // 我投的去投

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/allshots'
    },
    // 全部在投
    {
      path: '/allshots',
      // component: allshots,
      components: {
        tab: allshots
      },
      children: [
        {
          path: '/allshots/draw',
          name: 'AllshotsDraw',
          component: draw
        },
        {
          path: '/allshots/throw/:id',
          name: 'AllshotsThrow',
          component: allshotsthrow
        }
      ]
    },
    // 我投的
    {
      path: '/myshots',
      // component: myshots,
      components: {
        tab: myshots
      },
      children: [
        {
          path: '/myshots/draw',
          component: draw
        },
        {
          path: '/myshots/throw',
          component: myshotsthrow
        }
      ]
    },
    // 我邀请的
    {
      path: '/myinvite',
      // component: myinvite
      components: {
        tab: myinvite
      }
    },
    // 项目创建
    {
      path: '/createproject',
      // component: createproject
      components: {
        create: createproject
      }
    }
  ]
})
