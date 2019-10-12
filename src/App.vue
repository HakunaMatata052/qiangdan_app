<template>
  <div id="app">
    <!-- 全局组件 -->
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
/* eslint-disable */
import router from "./router/router.js";
export default {
  name: "App",
  data() {
    return {
      transitionName: "",
      keepAlive: []
    };
  },
  created() {
    var that = this;
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes);
    // 记录路由,动态给定动画
    this.$navigation.on("forward", to => {
      this.transitionName = to.route.meta.isTransition ? "slide-left" : "";
    });
    this.$navigation.on("back", (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    });
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255,255,255,0)"
      });
      that.$store.state.systemType = api.systemType;
      //关闭启动图
      api.removeLaunchView({
        animation: { type: "fade", duration: 0 }
      });
      // 更新
      api.addEventListener(
        {
          name: "smartupdatefinish"
        },
        function(ret, err) {
          that.$dialog
            .confirm({
              title: "更新",
              message: "APP更新完成，是否现在重启？"
            })
            .then(() => {
              api.rebootApp();
            });
        }
      );
      var push = api.require("push");
      if (this.$METHOD.getStore("token")) {
        push.bind(
          {
            userName: this.$store.state.userInfo.user_nickname,
            userId: this.$store.state.userInfo.use_rid
          },
          function(ret, err) {}
        );
      }
      push.setListener(function(ret, err) {
        if (ret) {
          
          var content = JSON.parse(ret.data)
          //仅提示音
          api.notification({
            sound: "default",
            notify: {
              title: content.title
            }
          });
          var message = []
          if(that.$METHOD.getStore('message')){
            message = that.$METHOD.getStore('message')
          }else{
            message= '[]'
          }
          message = JSON.parse(message)
          message.push(content)
          that.$METHOD.setStore('message',message)
        }
      });
    }
    this.setVux();
  },
  mounted() {
    // console.log(this.keepAlive); // 设置缓存匹配
  },
  methods: {
    setRouteKeepAlive(routes) {
      routes.map(item => {
        if (item.children && Array.isArray(item.children)) {
          this.setRouteKeepAlive(item.children);
        } else {
          if (item.meta && item.meta.keepAlive) {
            this.keepAlive.push(item.name);
          }
        }
      });
    },

    allEvent() {
      var that = this;
      // 点击消息状态栏跳转
      api.addEventListener(
        {
          name: "swiperight"
        },
        function(ret, err) {
          if (
            that.$route.name == "home" ||
            that.$route.name == "shop" ||
            that.$route.name == "message" ||
            that.$route.name == "mine"
          ) {
          } else {
            that.$router.go(-1);
          }
        }
      );
      //点击消息状态栏跳转
        api.addEventListener({
            name: 'noticeclicked'
        }, function (ret, err) {
                console.log(123)
                alert(123)
        });
    },
    setVux() {
      if (this.$METHOD.getStore("token")) {
        this.$store.state.token = this.$METHOD.getStore("token");
        this.$SERVER.information().then(res => {
          this.$store.state.userInfo = res.data;
          this.$store.state.isActive = Boolean(res.data.setting);
        });
      }
    }
  }
};
</script>
<style lang="less">
.color {
  color: #ffd948;
}
@color: #ffd948;
@black: #000;
@white: #fff;
@red: #000 !important;
@blue: #999;
@orange: #ff976a;
@orange-dark: #ed6a0c;
@orange-light: #fffbe8;
@green: #07c160;
@gray: #c9c9c9;
@gray-light: #e5e5e5;
@gray-darker: #7d7e80;
@gray-dark: #969799;

// default colors
@text-color: #323233;
@border-color: #ebedf0;
@active-color: #f2f3f5;
@background-color: #f8f8f8;
@background-color-light: #fafafa;
</style>

<style lang="less" scope>
#app {
  font-family: "PingFang-SC-Medium", "PingFang SC", "Microsoft YaHei", Helvetica,
    Tahoma, Arial, "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei",
    sans-serif;
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
</style>
