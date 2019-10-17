<template>
  <div id="mine">
    <div class="main">
      <div class="info">
        <van-uploader :after-read="uploadAvatar" :accept="'image/*'" :max-count="1" class="avatar">
          <img :src="$store.state.userInfo.user_img || user_img" />
        </van-uploader>
        <div class="username">
          <h3>{{$store.state.userInfo.user_nickname}} <grade :grade="$store.state.userInfo.grade" /> {{$store.state.userInfo.user_account}}</h3>
        </div>
        <span>注册日期：{{$METHOD.format($store.state.userInfo.user_reg_time,'yyyy.MM.dd')}}</span>
        <div class="data">
          <!-- <dl @click="$router.push('/integral')">
            <dt>{{$store.state.userInfo.ac_reward}}</dt>
            <dd>总积分</dd>
          </dl> -->
          <dl>
            <dt>{{$store.state.userInfo.ac_balance}}</dt>
            <dd>体力值</dd>
          </dl>
          <dl>
            <dt>{{$store.state.userInfo.order_amount}}</dt>
            <dd>已承兑</dd>
          </dl>
        </div>
      </div>
      <div class="menu">
        <div class="grid-item" v-for="(item,index) in menu" :key="index" @click="go(item.path)">
          <svg-icon :icon-class="item.icon" class="icon" />
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user_img from "@/assets/images/default.png";
import grade from "@/components/user/grade.vue"; 
import { install } from "vant";
export default {
  name: "mine",
  components:{
    grade
  },
  data() {
    return {
      menu: [
        { name: "我的钱包", path: "/wallet", icon: "mine1" },
        { name: "抢单记录", path: "/orderRecord", icon: "mine2" },
        { name: "邀请好友", path: "/invitation", icon: "mine3" },
        { name: "二维码管理", path: "/qrcode", icon: "mine4" },
        { name: "在线客服", path: "/kefu", icon: "mine5" },
        { name: "设置", path: "/setting", icon: "mine6" }
      ],
      user_img: user_img
    };
  },
  created() {    
    this.$SERVER.information().then(res => {
          this.$store.state.userInfo = res.data;
    })
  },
  mounted() {},
  methods: {
    uploadAvatar(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("token", this.$store.state.token);
      console.log(file);
      this.$SERVER
        .uploadfile(formData)
        .then(res => {
          this.$SERVER
            .faceup({
              user_img: res.data.face
            })
            .then(res2 => {
              this.$toast.success(res.msg);
              this.$store.state.userInfo.user_img = res.data.face;
            });
        })
        .catch(err => {
          this.$toast.fail(err.msg);
        });
    },
    go(path) {
      var that = this;
      if (path == "/kefu") {        
        this.install("com.tencent.mobileqq", function(status) {
          if (status == 1) {
            window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${that.$store.state.qq}&version=1&src_type=web&web_src=oicqzone.com`
            // api.openApp({
            //   androidPkg: "com.tencent.mobileqq",
            //   mimeType: "text/html",
            //   uri:
            //     "mqqwpa://im/chat?chat_type=wpa&uin=123456&version=1&src_type=web&web_src=oicqzone.com"
            // });
          } else {
            that.$toast.fail("您还没安装QQ客户端");
          }
        });
        return;
      }
      this.$router.push(path);
    },
    install(name, callback) {
      //异步返回结果：
      api.appInstalled(
        {
          appBundle: name
        },
        function(ret, err) {
          if (ret.installed) {
            //应用已安装
            callback(1);
          } else {
            //应用未安装
            callback(0);
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
#mine {
  min-height: 100%;
  background: rgb(253, 252, 252);
}
.main {
  padding: 45px 15px 0;

  background: url(../../../assets/images/bg2.png) no-repeat center top;
  background-size: 100% auto;
}
.info {
  box-sizing: border-box;
  position: relative;
  height: 180px;
  box-shadow: 0px 0px 30px 0px rgba(127, 0, 4, 0.07);
  border-radius: 5px;
  padding: 40px 20px 20px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 1) url(../../../assets/images/bg3.png)
    no-repeat 178px 56px;
  background-size: auto 223px;
  .avatar {
    position: absolute;
    left: 20px;
    top: -20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.33);
    }
  }
  .username {
    display: flex;
    margin-top: 5px;
    h3 {
      font-size: 15px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-right: 5px;
    }
  }
  span {
    font-size: 11px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .data {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    dl {
      text-align: center;
      dt {
        font-size: 23px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 5px;
        font-family: Bahnschrift;
      }
      dd {
        font-size: 13px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .grid-item {
    width: 110px;
    height: 84px;
    padding: 10px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(127, 0, 4, 0.07);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .icon {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 13px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      padding-top: 5px;
    }
  }
}
</style>

