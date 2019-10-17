<template>
  <div class="container">
    <navBar :title="`${typeName}兑换体力值`" />
    <div class="main">
      <div class="content" v-if="this.$route.params.type=='1'">
        <div class="top">
          <h5>体力值钱包地址</h5>
          <p>{{data.wallet_address}}</p>
          <div class="btn" @click="copyFn(data.wallet_address)">复制钱包地址</div>
        </div>
        <div class="box">
          <h4>如何获取我的钱包地址？</h4>
          <p>
            ① 去火币网（
            <span @click="jump('https://www.huobi.cn')">https://www.huobi.cn）</span>注册
          </p>
          <p>
            <img :src="img4" @click="imagePreview(img4)" />
          </p>
          <p>② 点击“资产”——“币币账户（充币&提币）</p>

          <p>
            <img :src="img5" @click="imagePreview(img5)" />
          </p>
          <p>③ 点击USDT“充币”，找到“钱包地址”，复制即可。</p>
          <p>
            <img :src="img6" @click="imagePreview(img6)" />
          </p>
        </div>
      </div>
      <div class="content" v-else-if="this.$route.params.type=='2'" style="padding:30px;">
        <h3>汇款银行卡信息</h3>
        <table class="table">
          <tr>
            <td width="40%" align="right">开户人姓名</td>
            <td>{{data.account_name}}</td>
          </tr>
          <tr>
            <td align="right">开户银行</td>
            <td>{{data.bank_account}}</td>
          </tr>
          <tr>
            <td align="right">银行卡号</td>
            <td>{{data.card_number}}</td>
          </tr>
        </table>
      </div>
      <div class="content" v-else-if="this.$route.params.type=='3'">
        <div class="qrcode">
          <img :src="data.qr_code" />
          <span>{{typeName}}</span>
          <div class="btn" @click="saveimg(data.qr_code)">保存{{typeName}}</div>
        </div>
      </div>
      <div class="content" v-else-if="this.$route.params.type=='4'">
        <div class="qrcode">
          <img :src="data.qr_code" />
          <span>{{typeName}}</span>
          <div class="btn" @click="saveimg(data.qr_code)">保存{{typeName}}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-uploader :after-read="upload" :accept="'image/*'" :max-count="1">
        <div class="btn">充值完成请上传兑换凭证</div>
      </van-uploader>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "rechargeDetails",
  components: {
    navBar
  },
  computed: {
    typeName() {
      switch (this.$route.params.type) {
        case "1":
          this.img4 = require("@/assets/images/img4.jpg");
          this.img5 = require("@/assets/images/img5.jpg");
          this.img6 = require("@/assets/images/img6.jpg");
          return "钱包";
          break;
        case "2":
          return "银行卡";
          break;
        case "3":
          return "微信二维码";
          break;
        case "4":
          return "支付宝二维码";
          break;
      }
    }
  },
  data() {
    return {
      img4: "",
      img5: "",
      img6: "",
      data: {}
    };
  },
  created() {
    this.$SERVER
      .rechargeDetail({
        type: this.$route.params.type
      })
      .then(res => {
        this.data = res.data;
      });
  },
  methods: {
    imagePreview(img) {
      ImagePreview([img]);
    },
    saveimg(img) {
      var that = this;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        api.download(
          {
            url: img,
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
    copyFn(value) {
      var that = this;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var clipBoard = api.require("clipBoard");
        clipBoard.set(
          {
            value: value
          },
          function(ret, err) {
            if (ret) {
              that.$toast.success("复制成功!");
            } else {
              alert(err);
            }
          }
        );
      }
    },
    jump(url) {
      api.openApp(
        {
          androidPkg: "android.intent.action.VIEW",
          mimeType: "text/html",
          uri: url
        },
        function(ret, err) {}
      );
    },
    upload(file) {
      if (!file) {
        this.$toast.fail("请使用文件管理上传图片");
        return;
      }
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("id", this.$route.params.id);
      formData.append("token", this.$store.state.token);
      this.$SERVER
        .certificate(formData)
        .then(res => {
          this.$toast.success(res.msg);
          this.$router.push('/wallet')
        })
        .catch(err => {
          this.$toast.fail(err.msg);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  h3 {
    font-size: 13px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
  }
  .top {
    padding: 20px 15px;
    margin-bottom: 50px;
    h5 {
      font-size: 13px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    p {
      font-size: 11px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      margin-bottom: 10px;
    }
    .btn {
      width: 150px;
      height: 40px;
      background: linear-gradient(
        90deg,
        rgba(249, 74, 81, 1),
        rgba(247, 109, 98, 1)
      );
      border-radius: 20px;

      font-size: 15px;
      font-weight: 400;
      color: rgba(255, 254, 254, 1);
      line-height: 40px;
      text-align: center;
    }
  }
  .box {
    h4 {
      font-size: 15px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 17px;
      padding-left: 15px;
      border-left: 5px solid #f94a51;
      margin: 15px 0;
    }
    p {
      font-size: 13px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      padding: 10px 0;
      span {
        color: aqua;
      }
    }
    img {
      max-width: 100%;
    }
  }
  .table {
    border: 0;
    width: 100%;
    td {
      border: 1px solid rgba(240, 240, 240, 1);

      font-size: 13px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
      padding: 0 15px;
    }
  }
  .qrcode {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    img {
      width: 120px;
      height: 120px;
      padding: 10px;
      border: 1px solid #eee;
    }
    span {
      font-size: 15px;
      color: #ccc;
      margin: 10px 0;
    }
    .btn {
      width: 150px;
      height: 40px;
      border-radius: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: auto;
      font-size: 15px;
      font-weight: 400;
      color: #333;
      line-height: 40px;
      text-align: center;
    }
  }
}
.bottom {
  padding: 20px 0;
  text-align: center;
  .btn {
    width: 250px;
    height: 44px;
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 22px;

    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 254, 254, 1);
    line-height: 44px;
    text-align: center;
    margin: auto;
  }
}
</style>