<template>
  <div class="container" id="shop">
    <navBar :goback="false" :search="true" :stl="bg" />
    <div class="main">
      <div class="bg"></div>
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white" :height="170">
          <van-swipe-item v-for="(item,index) in banner.top_banner" :key="index">
            <img :src="item.img" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="info">
        <div class="my-integral">
          <div class="decorate"></div>
          <span>我的积分</span>
          <p>{{$store.state.userInfo.ac_reward}}</p>
          <div class="btn" @click="$router.push('/invitation')">去赚积分</div>
        </div>
        <div class="ad">
          <img :src="item.img" v-for="(item,index) in banner.small_banner" :key="index" />
        </div>
      </div>
      <van-pull-refresh v-model="refreshLoading" @refresh="getList(true)">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
          <div class="list">
            <div class="item" v-for="(item,index) in list" :key="index">
              <img :src="item.shop_photo" />
              <div class="con">
                <h3 class="van-ellipsis">{{item.shop_name}}</h3>
                <p>{{item.convert}}积分兑换</p>
                <div class="bottom">
                  <span>市场价{{item.number}}元</span>
                  <span>{{item.purchase_number}}人已换购</span>
                </div>
                <van-button round color="#ff474e" @click="exchange(item)" class="btn">立即兑换</van-button>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "shop",
  components: {
    navBar
  },
  data() {
    return {
      bg: "nobg",
      banner: {
        top_banner:[],
        small_banner:[]
      },
      list: [],
      page: 1,
      loading: false,
      finished: false,
      refreshLoading: false
    };
  },
  created() {
    this.getBanner();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getBanner() {
      this.$SERVER.shop_banner().then(res => {
        this.banner = res.data;
      });
    },
    getList(isClear) {
      if (isClear) {
        this.list = [];
        this.page = 1;
      }
      this.$SERVER
        .shop_list({
          page: this.page
        })
        .then(res => {
          this.refreshLoading = false;
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          this.list = [...this.list, ...res.data];
        });
    },
    exchange(item) {
      this.$dialog
        .confirm({
          title: "是否兑换？",
          message: `是否使用 <font color="#f00">${item.convert}</font> 积分兑换 <font color="#f00">【${item.shop_name}】</font> ?`
        })
        .then(() => {
          this.$SERVER
            .exchange({
              shop_id: item.id
            })
            .then(res => {
              this.$store.state.userInfo.ac_reward = res.data
              this.$toast.success('兑换成功！')
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    handleScroll(e) {
      if (e.target.scrollTop > 46) {
        this.bg = "";
      } else {
        this.bg = "nobg";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  padding: 0 15px;
  position: relative;
}
.bg {
  position: absolute;
  width: 100%;
  height: 130px;
  left: 0;
  background: url(../../../assets/images/bg2.png) no-repeat center top;
  background-size: 100% auto;
}
.banner {
  margin-top: 64px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 345px;
    height: 170px;
    object-fit: cover;
  }
}
.info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  .my-integral {
    width: 128px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    text-align: center;
    color: #fff;
    background: linear-gradient(
      -40deg,
      rgba(255, 157, 14, 1),
      rgba(253, 232, 156, 1)
    );
    border-radius: 5px;
    position: relative;
    .decorate {
      position: absolute;
      top: -9px;
      right: 11px;
      width: 29px;
      height: 38px;
      background: url(../../../assets/images/bg1.png) no-repeat center top;
      background-size: 100% 100%;
    }
    span {
      font-size: 13px;
      font-weight: 500;
    }
    p {
      font-size: 35px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    .btn {
      width: 75px;
      height: 25px;
      line-height: 25px;
      background: rgba(251, 124, 61, 0.3);
      border-radius: 13px;
      font-size: 13px;
      font-weight: 400;
    }
  }
  .ad {
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    img {
      width: 209px;
      height: 60px;
      border-radius: 5px;
      object-fit: cover;
    }
  }
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    width: 170px;
    height: 230px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 30px 0px rgba(42, 42, 42, 0.08);
    border-radius: 5px;
    overflow: hidden;
    .con {
      padding: 5px 12px 10px;
    }
    img {
      width: 100%;
      height: 108px;
      object-fit: cover;
    }
    h3 {
      font-size: 13px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 10px;
    }
    p {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 71, 78, 1);
      margin-bottom: 5px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span:first-child {
        text-decoration: line-through;
      }
    }
    .btn {
      background: #ff474e;
      width: 80%;
      display: block;
      margin: 10px auto;
      border: 0;
      color: #fff;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>