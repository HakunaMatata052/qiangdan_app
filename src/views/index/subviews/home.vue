<template>
  <div class="container" id="home">
    <navBar :goback="false" />
    <div class="main">
      <div class="top">
        <div class="border"></div>
        <dl>
          <dt>{{$store.state.userInfo.order_count}}</dt>
          <dd>总订单</dd>
        </dl>
        <dl>
          <dt>{{$store.state.userInfo.order_amount}}</dt>
          <dd>已承兑（元）</dd>
        </dl>
      </div>
      <div class="btn-area">
        <div
          :class="isActive?'btn btn--shockwave is-active':'btn btn--shockwave'"
          @click="activeFn"
        >
          <!-- <span>可抢金额:{{$store.state.userInfo.keqiang_amount}}元</span> -->
          <p v-if="isActive">运行中</p>
          <p v-else>启动服务</p>
        </div>
      </div>
      <div class="userList">
        <svg-icon icon-class="home-active" class="svg" />
        <van-swipe
          style="height: 25px;"
          class="userList-con van-ellipsis"
          vertical
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item,index) in list" :key="index" class="item">
            <span>{{item.user_nickname}}</span>通过
            <span v-if="item.payment==1">微信</span>
            <span v-else-if="item.payment==2">支付宝</span>
            二维码 抢了{{item.price}}元订单
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="btn-group">
        <div class="btn" @click="$router.push('/rankingList')">排行榜</div>
        <div class="btn" @click="$router.push('/invitation')">推广</div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "home",
  data() {
    return {
      notifyMrg: null,
      list: []
    };
  },
  computed: {
    isActive: {
      get() {
        return this.$store.state.isActive;
      },
      set(newVal) {
        this.$store.state.isActive = newVal;
      }
    }
  },
  watch: {
    isActive(newVal) {
      var that = this;
      if (newVal) {
        that.isEnabled(() => {
          that.notifyMrg.onNotificationPosted(function(ret, err) {
            console.log(ret)
            if (
              ret.packageName == "com.tencent.mm" &&
              ret.title == "微信支付"
            ) {
              var result = /[1-9]\d*\.\d*|0\.\d*[1-9]\d*/.exec(ret.text);
              that.payment(1, result[result.length-1]);
            } else if (
              ret.packageName == "com.eg.android.AlipayGphone" &&
              ret.title == "支付宝通知"
            ) {
              var result = /[1-9]\d*\.\d*|0\.\d*[1-9]\d*/.exec(ret.text);
              that.payment(2, result[result.length-1]);
            }
          });
        });
      } else {
        that.notifyMrg.onNotificationRemoved(function(ret, err) {});
      }
    }
  },
  components: {
    navBar
  },
  created() {
    this.getList();
    this.notifyMrg = api.require("notifyMrg");
    this.isEnabled();
  },
  mounted() {},
  methods: {
    payment(type, price) {
      this.$SERVER
        .payment({
          payment: type,
          price: price
        })
        .then(res => {
          this.$store.state.userInfo.order_amount = res.data.order_amount;
          this.$store.state.userInfo.order_count = res.data.order_count;
          this.$store.state.userInfo.keqiang_amount = res.data.keqiang_amount;
        });
    },
    getList() {
      this.$SERVER.carousel().then(res => {
        this.list = res.data;
      });
    },
    activeFn() {
      this.$SERVER
        .setting({
          setting: Number(!this.isActive)
        })
        .then(res => {
          this.isActive = !this.isActive;
        });
    },
    isEnabled(fn) {
      var ret = this.notifyMrg.isEnabled();
      if (!ret.status) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "未开启通知栏获取权限，是否取开启？"
          })
          .then(() => {
            this.notifyMrg.goNotificationSettings(function(ret, err) {
              if (fn) {
                fn();
              }
            });
          });
      } else {
        if (fn) {
          fn();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  position: relative;
  margin-top: 40px;
  .border {
    position: absolute;
    left: -6px;
    width: 12px;
    height: 60px;
    background: linear-gradient(
      0deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 8px;
  }
  dl {
    padding-left: 30px;
    margin-right: 50px;
    dt {
      font-size: 30px;
      font-weight: 400;
      font-family: Bahnschrift;
      color: rgba(51, 51, 51, 1);
    }
    dd {
      font-size: 15px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.btn-area {
  padding: 70px 0;
  .btn {
    width: 170px;
    height: 170px;
    margin: auto;
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    border: none;
    padding: 0;
    position: relative;
    span {
      font-size: 15px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    p {
      font-size: 25px;
      font-weight: 300;
      color: rgba(255, 255, 255, 1);
    }
  }

  .btn--shockwave.is-active {
    -webkit-animation: shockwaveJump 1s ease-out infinite;
    animation: shockwaveJump 1s ease-out infinite;
  }
  .btn--shockwave.is-active:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    -webkit-animation: shockwave 1s 0.65s ease-out infinite;
    animation: shockwave 1s 0.65s ease-out infinite;
  }
  .btn--shockwave.is-active:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    -webkit-animation: shockwave 1s 0.5s ease-out infinite;
    animation: shockwave 1s 0.5s ease-out infinite;
  }
}
.userList {
  display: flex;
  align-items: center;
  padding: 0 40px;
  .userList-con {
    flex-grow: 1;
  }
  .svg {
    flex-shrink: 0;
    margin-right: 10px;
  }
  .item {
    font-size: 13px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    span:first-child {
      color: rgba(248, 95, 91, 1);
    }
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  .btn {
    font-size: 17px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);

    width: 150px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 25px 0px rgba(118, 2, 0, 0.07);
    border-radius: 23px;
  }
}
@-webkit-keyframes shockwaveJump {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  40% {
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }
  50% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  55% {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
  60% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes shockwaveJump {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  40% {
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }
  50% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  55% {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
  60% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes shockwave {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 0 2px rgba(249, 74, 81, 0.1),
      inset 0 0 1px rgba(249, 74, 81, 0.1);
  }
  95% {
    box-shadow: 0 0 50px transparent, inset 0 0 30px transparent;
  }
  100% {
    -webkit-transform: scale(2.25);
    transform: scale(2.25);
  }
}
@keyframes shockwave {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 0 2px rgba(249, 74, 81, 0.1),
      inset 0 0 1px rgba(249, 74, 81, 0.1);
  }
  95% {
    box-shadow: 0 0 50px transparent, inset 0 0 30px transparent;
  }
  100% {
    -webkit-transform: scale(2.25);
    transform: scale(2.25);
  }
}
</style>

