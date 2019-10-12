<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="balance">
        <h3>账户余额</h3>
        <p>{{$store.state.userInfo.ac_balance}}</p>
      </div>
      <div class="profit">
        <dl>
          <dt>昨日收益</dt>
          <dd>{{$store.state.userInfo.zuo_amount}}</dd>
        </dl>
        <dl>
          <dt>总收益</dt>
          <dd>{{$store.state.userInfo.order_amount}}</dd>
        </dl>
      </div>
      <p class="liushui">查看资金流水</p>
      <div class="btn-group">
        <div class="btn">充值</div>
        <div class="btn">提现</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "wallet",
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 0 25px;
}
.balance {
  margin-top: 20px;
  margin-bottom: 35px;
  padding: 0 10px;
  h3 {
    font-size: 13px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  p {
    font-size: 30px;
    font-weight: 400;
    font-family: Bahnschrift;
    color: rgba(51, 51, 51, 1);
  }
}
.profit {
  display: flex;
  margin-bottom: 40px;
  padding: 0 10px;
  dl {
    margin-right: 30px;
    dt {
      font-size: 13px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    dd {
      font-size: 20px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      font-family: Bahnschrift;
    }
  }
}
.liushui {
  padding: 0 10px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 50px;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 20px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
  }
}
</style>