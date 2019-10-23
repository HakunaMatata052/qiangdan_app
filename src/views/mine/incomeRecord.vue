<template>
  <div class="container">
    <navBar :title="title"/>
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <table class="table" border="0">
          <tr>
            <th align="left" width="50%">时间</th>
            <th align="right">金额</th>
          </tr>
          <tr v-for="(item,index) in list" :key="index">
            <td align="left">{{$METHOD.format(item.create_time,'yyyy-MM-dd hh:mm:ss')}}</td>
            <td align="right">{{item.money}}</td>
          </tr>
        </table>
      </van-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "incomeRecord",
  components: {
    navBar
  },
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false,
      title:""
    };
  },
  created(){
      this.title = this.$route.params.user      
  },
  methods: {
    getList(isClear) {
      if (isClear) {
        this.list = [];
        this.page = 1;
      }
      this.$SERVER
        .user_moneyinfo({
          page: this.page,
          user_id: this.$route.params.id
        })
        .then(res => {
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          this.list = [...this.list, ...res.data];
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
