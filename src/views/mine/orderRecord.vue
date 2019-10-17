<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="btn-group">
        <div class="btn" @click="$router.push('/recharge')">体力值充值</div>
        <div class="btn" @click="$router.push('/')">立即去抢单</div>
      </div>
      <van-collapse v-model="activeTime" :border="false " accordion @change="getMon">
        <van-collapse-item :title="key" :name="key" :border="false" v-for="(i,key) in list" :key="key">
          <div class="list">
            <div class="item" v-for="(j,index) in i" :key="index">
              <h5>{{j.time}}</h5>
              <p>
                通过 <span v-if="j.payment==1">微信</span><span v-else-if="j.payment==2">支付宝</span>二维码 收款
                <span>{{j.price}}元</span>
              </p>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-divider v-if="JSON.stringify(list)=='{}'">暂无数据</van-divider>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "qrcode",
  components: {
    navBar
  },
  data() {
    return {
      activeTime: null,
      list:{}
    };
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.$SERVER.log_list().then(res=>{
        this.list = res.data
      })
    },
    getMon(activeNames){
      this.$SERVER.log_list({
        time:activeNames
      }).then(res=>{
        this.list[activeNames] = res.data[activeNames]
      })
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 0 15px;
  background: rgba(255, 255, 255, 1) url(../../assets/images/bg3.png) no-repeat
    250px 150px;
  background-size: auto 270px;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 35px 0;
  padding: 0 10px;
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
.list {
  padding: 15px 15px 0 15px;
  background: rgba(247, 247, 247, 1);
  .item {
    padding-bottom: 30px;
    h5 {
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 24px;
    }
    p {
      font-size: 13px;
      font-weight: 500;
      line-height: 24px;
      color: #333333;
      span {
        &:first-child {          
        color: #999999;
        }
        &:last-child {
          color: #ff474e;
        }
      }
    }
  }
}
</style>