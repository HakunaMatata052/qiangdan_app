<template>
  <div class="container">
    <navBar />
    <div class="main">
      <h3>兑换体力值</h3>
      <p>
        <input type="number" placeholder="输入体力值" pattern="[0-9]*" v-model="$store.state.recharge" />
        <label>点</label>
      </p>
      <div class="tips"></div>
      <div class="btn-group">
        <div
          class="btn"
          @click="go(item.type)"
          v-for="(item,index) in typeList"
          :key="index"
        >{{item.path}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "recharge",
  components: {
    navBar
  },
  data() {
    return {
      value: null,
      typeList: []
    };
  },
  created() {
    this.$SERVER.chongzhi().then(res => {
      this.typeList = res.data;
    });
  },
  methods: {
    go(type) {
      if (this.$store.state.recharge < 0) {
        this.$toast.fail("请输入体力值");
        return;
      }
      this.$SERVER
        .recharge({
          type: type,
          price: this.$store.state.recharge
        })
        .then(res => {
          this.$router.push("/rechargeDetails/" + type + "/" + res.data);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  padding: 30px 15px;
}
h3 {
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin: 20px 0;
}
p {
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  display: flex;
  align-items: flex-end;
  padding: 15px;
  label {
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    flex-grow: 0;
  }
  input {
    flex-grow: 1;
    font-size: 45px;
    box-sizing: border-box;
    width: 260px;
  }
}
.btn-group {
  .btn {
    width: 200px;
    height: 44px;
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 22px;
    margin: 45px auto 0;

    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
    line-height: 44px;
    text-align: center;
  }
}
</style>