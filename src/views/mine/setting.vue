<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell
          title="修改昵称"
          :value="$store.state.userInfo.user_nickname"
          is-link
          @click="edit(1)"
        />
        <van-cell
          title="修改钱包地址"
          is-link
          @click="edit(2)"
        />
        <van-cell title="修改绑定手机" is-link to="/securityaccount" />
        <van-cell title="修改密码" is-link to="/resetPassword" />
      </van-cell-group>

      <van-cell-group class="cell-group">
        <van-cell title="退出" is-link @click="logout()" />
      </van-cell-group>

      <van-popup
        v-model="popupShow"
        type="primary"
        position="bottom"
        get-container="body"
        :style="{ height: '100%' }"
      >
        <div :style="'height:25px'"></div>
        <van-nav-bar
          :title="'修改'+editName"
          left-text="取消"
          @click-left="popupShow = false"
          @click-right="confirmEdit"
        >
          <van-button type="primary" size="small" slot="right">确定</van-button>
        </van-nav-bar>
        <van-cell-group>
          <van-field
            v-model="user_nickname"
            :placeholder="$store.state.userInfo.user_nickname || '请输入昵称'"
            v-if="editName=='昵称'"
          />
          <van-field
            v-model="wallet_address"
            :placeholder="$store.state.userInfo.wallet_address || '请输入钱包地址'"
            v-else-if="editName=='钱包地址'"
          />
        </van-cell-group>
      </van-popup>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "setting",
  components: {
    navBar
  },
  data() {
    return {
      popupShow: false,
      user_nickname: this.$store.state.userInfo.user_nickname,
      wallet_address: this.$store.state.userInfo.wallet_address,
      editName: ""
    };
  },
  methods: {
    logout() {
      var push = api.require("push");
      push.unbind(
        {
          userName: this.$store.state.user_nickname,
          userId: this.$store.state.use_rid
        },
        function(ret, err) {}
      );
      this.$METHOD.removeStore("token");
      this.$store.state.userInfo = {};
      this.$toast.success("退出成功！");
      this.$SERVER.logout().then(res => {});
      this.$SERVER
        .setting({
          setting: 0
        })
        .then(res => {
          this.$store.state.isActive = false;
        });

      this.$router.push("/");
    },
    edit(type) {
      if (type == "1") {
        this.popupShow = true;
        this.editName = "昵称";
        //wallet_address
      } else if (type == 2) {
        this.popupShow = true;
        this.editName = "钱包地址";
      }
    },
    confirmEdit() {
      var that = this;
      if (this.user_nickname.length > 6) {
        this.$toast.fail("昵称不能超过6字");
        return;
      }
      var json = {};
      if (this.editName == "昵称") {
        json.user_nickname = this.user_nickname;
      } else if (this.editName == "钱包地址") {
        json.wallet_address = this.wallet_address;
      }
      this.$SERVER.faceup(json).then(res => {
        this.$toast.success("修改成功！");
        this.popupShow = false;
        if (this.editName == "昵称") {
          this.$store.state.userInfo.user_nickname = this.user_nickname;
        } else if (this.editName == "钱包地址") {
          this.$store.state.userInfo.wallet_address = this.user_nwallet_addressickname;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background: #eee;
}
.cell-group {
  margin-top: 20px;
}
</style>