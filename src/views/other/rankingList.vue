<template>
  <div class="container">
    <navBar title>
      <van-tabs v-model="activeType" slot="title" :border="false" @change="getList">
        <van-tab title="日榜" :name="1"></van-tab>
        <van-tab title="周榜" :name="2"></van-tab>
        <van-tab title="月榜" :name="3"></van-tab>
        <van-tab title="总榜" :name="4"></van-tab>
      </van-tabs>
    </navBar>
    <div class="main">
      <table class="table" border="0">
        <tr>
          <th width="90%">排行</th>
          <th>已承兑</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <td>
            <div class="item">
              <div class="avatar">
                <img :src="item.user_img || user_img" alt />
                <ranking :index="index" />
              </div>
              <div class="info">
                <h3>{{item.user_nickname}}</h3>
                <p>注册日期：{{$METHOD.format(item.user_reg_time,'yyyy.MM.dd')}}</p>
              </div>
            </div>
          </td>
          <td class="num">{{item.sum_price}}</td>
        </tr>
      </table>
      <van-divider v-if="list.length==0">暂无数据</van-divider>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import ranking from "@/components/user/ranking.vue";
import user_img from "@/assets/images/default.png";
export default {
  name: "rankingList",
  components: {
    navBar,
    ranking
  },
  data() {
    return {
      activeType: 1,
      list:[],
      user_img:user_img
    };
  },
  created() {
      this.getList()
  },
  methods: {
      getList(){
          this.$SERVER.leaderboard({
              type: this.activeType
          }).then(res=>{
              this.list = res.data
          })
      }
  }
};
</script>
<style lang="less" scoped>
.table {
  width: 90%;
  margin: 20px auto;
  th {
    text-align: left;
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    padding: 10px 0;
  }
  td {
      
    padding: 10px 0;
  }
  .num {
    vertical-align: middle;
    font-size: 22px;
    font-family: Bahnschrift;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .item {
    display: flex;
    .avatar {
      position: relative;
      img {
        display: block;
        width: 44px;
        height: 44px;
        margin-right: 10px;
        border-radius: 50%;
        border: 4px solid rgba(255, 255, 255, 0.33);
      }
    }
    .info {
      display: flex;
      flex-flow: column;
      h3 {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
      p {
        font-size: 11px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>