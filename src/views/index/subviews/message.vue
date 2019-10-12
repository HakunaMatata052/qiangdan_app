<template>
  <div class="container" id="video">
    <navBar :search="true" />
    <div class="main">
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="message-box">
            <h3>{{item.title}}</h3>
            <div class="con" v-html="item.content">
            </div>
          </div>
          <p>{{$METHOD.format(item.time,'yyyy-MM-dd hh:mm:ss')}}</p>
        </div>
      </div>
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
      list:[]
    };
  },
  created() {
    var message = this.$METHOD.getStore("message");
    this.list = JSON.parse(message);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.list {
  padding: 15px;
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
    }
    p {
      width: 125px;
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

