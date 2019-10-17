<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="securityaccount">
        <form class="nameAndidcard">
          <van-cell-group>
            <van-field
              v-model="form.user_account"
              center
              clearable
              type="number"
              pattern="[0-9]*"
              label="新手机码"
              placeholder="请输入新手机号"
            >
              <van-button
                slot="button"
                size="small"
                type="info"
                class="checknumbtn"
                @click="sendchecknum"
                :disabled="checkNumDisabled"
              >
                <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
                <span v-else>发送验证码</span>
              </van-button>
            </van-field>
            <van-field
              v-model="form.captcha"
              label="验证码"
              placeholder="请输入短信验证码"
              type="number"
              pattern="[0-9]*"
            />
          </van-cell-group>
        </form>
        <van-button type="info" class="btn" :loading="loading" @click="submit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "securityaccount2",
  components: {
    navBar
  },
  data() {
    return {
      form: {
        user_account: "",
        captcha: ""
      },
      loading: false,
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },

  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    sendchecknum() {
      if (this.form.user_account == this.$store.state.userInfo.user_account) {
        this.$toast.fail("该手机号与当前绑定的手机号相同");
        return;
      }
      if (regexUtil.isPhone(this.form.user_account)) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .smscode({
            mobile: this.form.user_account
          })
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.form.captcha = "";
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("请输入正确的手机号码");
      }
    },
    submit() {
      if (!regexUtil.isPhone(this.form.user_account)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.form.user_account == this.$store.state.userInfo.user_account) {
        this.$toast.fail("该手机号与当前绑定的手机号相同");
      }
      if (!this.form.captcha || this.form.captcha.length == 0) {
        this.$toast.fail("请输入验证码");
        return;
      }
      this.$SERVER
        .faceup({
          captcha: this.form.captcha,
          user_account: this.form.user_account
        })
        .then(res => {
          this.$store.state.userInfo.user_account = this.form.user_account
          this.$toast.success("修改成功！");
          this.$router.push("/mine");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.securityaccount {
  .tipBox {
    display: flex;
    padding: 23px 21px 19px 21px;
    background: rgba(255, 89, 65, 0.1);
    .tipContent {
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 89, 65, 1);
      line-height: 20px;
    }

    .jinggaoIcon {
      font-size: 29px;
      color: rgba(255, 89, 65, 1);
      margin-right: 11px;
      margin-top: 3px;
    }
  }
  .steps {
    padding: 20px;
    background: #fff;
    display: flex;
    .stepsL,
    .stepsR {
      flex: 1;
      text-align: center;
      .stepsLT {
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background: rgba(179, 179, 179, 1);
        border-radius: 50%;
        margin: 0 auto;
      }
      .stepsLC {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        margin: 10px auto;
      }
      .stepsLB {
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .stepsC {
      display: flex;
      width: 50px;
      margin-top: 40px;
      justify-content: space-around;
      p {
        height: 8px;
        width: 8px;
        background: rgba(224, 224, 224, 1);
        border-radius: 50%;
      }
    }
    .active {
      .stepsLT {
        background: linear-gradient(90deg,rgba(249,74,81,1),rgba(247,109,98,1));
      }
      .stepsLC {
        color: #333333;
      }
    }
  }
  .nameAndidcard {
    margin: 15px 0 30px;
    .support {
      height: 45px;
      line-height: 45px;
      background: rgba(245, 245, 245, 1);
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(249,74,81,1);
      text-align: right;
      padding-right: 49px;
    }
  }
  
  .checknumbtn {
    background: linear-gradient(90deg,rgba(249,74,81,1),rgba(247,109,98,1));
    border: 0;
  }
  .btn {
    width: 270px;
    height: 44px;
    background: linear-gradient(90deg,rgba(249,74,81,1),rgba(247,109,98,1));
    border-radius: 22px;
    font-size: 17px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 44px;
    margin: 0 auto;
    display: block;
    border:0;
  }
  .securityaccountBottom {
    padding: 21px 20px 47px 20px;
    div:nth-child(1) {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      span {
        color: rgba(249,74,81,1);
      }
    }
    div:nth-child(2) {
      font-size: 13px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(249,74,81,1);
      line-height: 18px;
      text-align: center;
      margin-top: 40px;
    }
  }
}

.right-text {
  text-align: right;
  color: #999;
}
</style>

