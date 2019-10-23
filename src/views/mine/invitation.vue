<template>
  <div class="container">
    <navBar stl="nobg"/>
    <div class="main">
      <div class="info">
        <dl @click="$router.push('/userList')">
          <dt>我的会员人数</dt>
          <dd>{{info.my_vip_count}}</dd>
        </dl>
        <dl>
          <dt>我的累计收益</dt>
          <dd>{{info.zong_yingkui}}</dd>
        </dl>
        <dl>
          <dt>本月收益</dt>
          <dd>{{info.month_yingkui}}</dd>
        </dl>
      </div>
      <h3>扫码下方二维码</h3>
      <div class="qrcode">
        <img :src="info.down_url" alt />
      </div>
      <div class="btn-group">
        <div class="btn" @click="saveimg">保存二维码</div>
        <div class="btn" @click="copyFn">复制推广链接</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "invitation",
  components: {
    navBar
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    if(this.$store.state.userInfo.proxy == 7){
      this.$toast.fail('您的等级无法邀请用户！')
      this.$router.push('/')
    }
    this.$SERVER.spread().then(res => {
      this.info = res.data;
    });
  },
  methods: {
    saveimg() {
      var that = this;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        api.download(
          {
            url: this.info.down_url,
            report: true,
            cache: true,
            allowResume: true
          },
          function(ret, err) {
            if (ret.percent == 100) {
              api.saveMediaToAlbum(
                {
                  path: ret.savePath
                },
                function(albumret, albumreterr) {
                  if (albumret && albumret.status) {
                    that.$toast.success("保存成功!");
                  }
                }
              );
            }
          }
        );
      }
    },
    copyFn() {
      var that = this
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var clipBoard = api.require("clipBoard");
        clipBoard.set(
          {
            value: that.info.register_url
          },
          function(ret, err) {
            if (ret) {
              that.$toast.success("复制成功!");
            } else {
            }
          }
        );
      } 
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background: #fa4a54 url(../../assets/images/bg1.jpg) no-repeat center top;
  background-size: 100%;
  overflow: hidden;
  .help {
    width: 47px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    right: 17px;
    top: 17px;
  }
  .info {
    margin-top: 190px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    dl {
      width: 33%;
      height: 70px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 5px 5px 0 #f85654;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      dt {
        font-size: 15px;
        font-weight: 400;
        color: #f85654;
      }
      dd {
        font-size: 17px;
        font-weight: bold;
        color: #f85654;
      }
    }
  }
  h3 {
    margin: 30px auto 20px;
    font-size: 25px;
    font-family: HYJinKaiJ;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
  .qrcode {
    text-align: center;
    img {
      width: 140px;
      height: 140px;
      border: 10px solid rgba(255, 255, 255, 0.33);
    }
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 40px;
    .btn {
      width: 140px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #fff;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 20px;
      font-size: 15px;
      font-weight: 400;
      color: #f85654;
    }
  }
}
</style>

