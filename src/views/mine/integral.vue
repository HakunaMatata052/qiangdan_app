<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-tabs v-model="activeType" swipeable sticky>
        <van-tab title="积分记录" :name="1">
          <van-list
            v-model="convertLoading"
            :finished="convertFinished"
            finished-text="没有更多了"
            @load="getConvertLog"
          >
            <table class="table" border="0">
              <tr>
                <th width="50%">时间</th>
                <th align="right">积分</th>
              </tr>
              <tr v-for="(item,index) in convertList" :key="index">
                <td>{{item.createtime}}</td>
                <td align="right">{{item.convert}}</td>
              </tr>
            </table>
          </van-list>
        </van-tab>
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
      exchangeFinished: false,

      convertList: [],
      convertPage: 1,
      convertLoading: false,
      convertFinished: false
    };
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
    },
    getConvertLog(isClear) {
      if (isClear) {
        this.convertList = [];
        this.convertPage = 1;
      }
      this.$SERVER
        .convert_log({
          page: this.convertPage
        })
        .then(res => {
          this.convertLoading = false;
          if (res.data.length == 0) {
            this.convertFinished = true;
            return;
          }
          this.convertPage++;
          this.convertList = [...this.convertList, ...res.data];
        });
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  width: 90%;
  margin: 0 auto;
  th {
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    padding: 10px 0;
  }
  td {
    font-size: 13px;
    font-weight: 500;
    padding: 10px 0;
  }
}
</style>