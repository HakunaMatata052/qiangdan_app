<template>
  <div class="container">
    <navBar :goback="false" />
    <div class="main" id="message">
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="message-box">
            <h3>{{item.t}}</h3>
            <div class="con" v-html="item.c"></div>
            <div class="go" @click="$router.push(item.u)"></div>
          </div>
          <p>{{item.d}}</p>
        </div>
      </div>
      <van-divider v-if="!list||list.length==0">暂无数据</van-divider>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "message",
  components: {
    navBar
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    message() {
      return this.$store.state.message;
    }
  },
  watch: {
    message() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var message = this.$METHOD.getStore("message");
      this.list = JSON.parse(message);
    },
  }
};
</script>

<style lang="less" scoped>
#message {
  display: flex;
  flex-flow: column-reverse;
  align-items: baseline;
}
.list {
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  .item {
    .message-box {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(24, 27, 45, 0.11);
      border-radius: 5px;
      padding: 0 15px;
      h3 {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
      }
      .con {
        font-size: 13px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        padding: 15px 0;
      }
      .go {
        font-size: 13px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-top: 20px;
      }
    }
    p {
      width: 150px;
      height: 20px;
      line-height: 20px;
      margin: 10px auto;
      background: rgba(224, 224, 224, 1);
      border-radius: 3px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
  }
}
</style>

