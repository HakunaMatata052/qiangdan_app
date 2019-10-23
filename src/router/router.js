import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";

// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
          path: "",
          name: "home",
          component: () => import("@/views/index/subviews/home.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"抢单",
            isMember: false,
            isLogin:false,
            index: 0
          }
        },
        {
          path: "/orderRecordi",
          name:"orderRecord",
          component: () => import("@/views/mine/orderRecord.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title:"抢单记录",
            isMember: false,
            isLogin:true
          }
        },
        // {
        //   path: "/shop",
        //   name: "shop",
        //   component: () => import("@/views/index/subviews/shop.vue"),
        //   meta: {
        //     keepAlive: true,
        //     isTransition: true,
        //     title:"积分商城",
        //     isMember: false,
        //     isLogin:false,
        //     index: 1
        //   }
        // },
        {
          path: "/message",
          name: "message",
          component: () => import("@/views/index/subviews/message.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title:"消息",
            isMember: false,
            isLogin:false,
            index: 2
          }
        },
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/index/subviews/mine.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title:"我的",
            isMember: false,
            isLogin:true,
            index: 3
          }
        }
      ]
    },
    // 注册登录
    {
      path: "/login/:name?",
      name:"login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"登录",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/register/:val?",
      name:"register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"注册",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/registerPassword",
      name: "registerPassword",
      component: () => import("@/views/login/registerPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "设置密码",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/resetPassword",
      name:"resetPassword",
      component: () => import("@/views/login/resetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"修改密码",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/wallet",
      name:"wallet",
      component: () => import("@/views/mine/wallet.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"钱包",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/qrcode",
      name:"qrcode",
      component: () => import("@/views/mine/qrcode.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"二维码管理",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/orderRecord",
      name:"orderRecord",
      component: () => import("@/views/mine/orderRecord.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"抢单记录",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/integral",
      name:"integral",
      component: () => import("@/views/mine/integral.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"积分记录",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/capitalFlow",
      name:"capitalFlow",
      component: () => import("@/views/mine/capitalFlow.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"资金流水",
        isMember: false,
        isLogin:true
      }
    },
    
    {
      path: "/invitation",
      name:"invitation",
      component: () => import("@/views/mine/invitation.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"推广",
        isMember: false,
        isLogin:true
      }
    },
    {
      path: "/rankingList",
      name:"rankingList",
      component: () => import("@/views/other/rankingList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"排行榜",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/setting",
      name:"setting",
      component: () => import("@/views/mine/setting.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"设置",
        isMember: false,
        isLogin:true
      }
    },
    //修改绑定手机
    {
      path: "/securityaccount",
      name: "securityaccount",
      component: () => import("@/views/mine/securityaccount.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改绑定手机",
        isMember: false,
        isLogin: true
      }
    },
    
    //修改绑定手机
    {
      path: "/securityaccount2",
      name: "securityaccount2",
      component: () => import("@/views/mine/securityaccount2.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "绑定新手机",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/recharge",
      name: "recharge",
      component: () => import("@/views/other/recharge.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "兑换体力值",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/rechargeDetails/:type/:id",
      name: "rechargeDetails",
      component: () => import("@/views/other/rechargeDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "兑换体力值",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/userList",
      name: "userList",
      component: () => import("@/views/mine/userList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "会员明细",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/incomeRecord/:id/:user",
      name: "incomeRecord",
      component: () => import("@/views/mine/incomeRecord.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "收益记录",
        isMember: false,
        isLogin: false
      }
    },    
  ]
});
router.beforeEach((to, from, next) => {
  if (to.name != "register" && to.name != "registerPassword") {
    if (!window.navigator.userAgent.match(/APICloud/i)) {
      if (process.env.NODE_ENV === "production") {
        router.push('/register')
      }
    }
  }
  if (to.meta.index!=undefined) {
    store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      if(from.name=="login"){
        router.push('/')
      }else{
        router.push('/login/'+from.name)
      }      
    }else{
      next()
    }
    if (to.meta.isMember) {
      if (!window.localStorage.getItem('token')) {
        router.push('/login/'+from.name)
      }else{
        if (store.state.isMember) {
          next()
        }else{
          router.push('/buymember')
        }
      }
    }
  }else {
    next()
  }
})

router.afterEach(route => {
    
  // console.log(route)
  // console.log("跳转")
})

export default router;