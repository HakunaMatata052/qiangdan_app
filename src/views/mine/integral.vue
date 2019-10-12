<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-tabs v-model="activeType" swipeable sticky>
        <van-tab title="积分记录" :name="1"></van-tab>
        <van-tab title="兑换记录" :name="2">
          <van-list
            v-model="exchangeLoading"
            :finished="exchangeFinished"
            finished-text="没有更多了"
            @load="getExchangeLog"
          >
            <van-cell-group>
              <van-cell title="日期" value="积分" />
              <van-cell
                :title="item.createtime"
                :value="item.convert"
                :label="`商品名称：${item.shop_name}`"
                v-for="(item,index) in exchangeList"
                :key="index"
              />
            </van-cell-group>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "integral",
  components: {
    navBar
  },
  data() {
    return {
      activeType: 1,
      exchangeList: [],
      exchangePage: 1,
      exchangeLoading: false,
      exchangeFinished: false
    };
  },
  created() {
    this.getExchangeLog();
  },
  methods: {
    getExchangeLog(isClear) {
      if (isClear) {
        this.exchangeList = [];
        this.exchangePage = 1;
      }
      this.$SERVER
        .exchange_log({
          page: this.exchangePage
        })
        .then(res => {
          this.exchangeLoading = false;
          if (res.data.length == 0) {
            this.exchangeFinished = true;
            return;
          }
          this.exchangePage++;
          this.exchangeList = [...this.exchangeList, ...res.data];
        });
    }
  }
};
</script>
<style lang="less" scoped>
</style>