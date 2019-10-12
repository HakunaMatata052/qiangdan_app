<template>
  <div class="container">
    <navBar>
      <van-button type="primary" size="mini" slot="right" v-if="edit" @click="edit=false" color="#f85f5b">取消</van-button>
    </navBar>
    <div class="main">
      <div class="btn-group">
        <div class="btn" @click="show = true">添加二维码</div>
        <div class="btn">
          <span v-if="edit" @click="DelFn">（{{count}}）删除</span>
          <span v-else @click="edit = true">管理二维码</span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index">
          <img :src="item.qr_code" />
          <div class="text">
            <h3>
              <span v-if="item.payment==1">微信</span>
              <span v-else-if="item.payment==2">支付宝</span>收款码
              <van-tag round v-if="item.status==0">审核中</van-tag>
              <van-tag type="success" round v-else-if="item.status==1">已通过</van-tag>
              <van-tag type="danger" round v-else-if="item.status==2">未通过</van-tag>
            </h3>
            <p v-if="item.status==1">有效期至：{{item.expire_at}}</p>
          </div>
          <div class="radio" @click="selectDel(index)" v-if="edit">
            <van-icon name="circle" v-if="!item.del" color="#FF474E" />
            <van-icon name="checked" v-else color="#FF474E" />
          </div>
        </div>
      </div>
      <van-divider v-if="list.length==0">暂无数据</van-divider>
      <van-dialog v-model="show" :showConfirmButton="false" closeOnClickOverlay>
        <div class="uploadDialog">
          <div class="select" @click="optionShow = true">
            <h3>{{paymentText}}</h3>
            <div class="option" v-show="optionShow">
              <div
                class="item"
                v-for="(item,index) in option"
                :key="index"
                :data-type="item.value"
                @click.stop="optionFn($event)"
              >{{item.text}}</div>
            </div>
          </div>
          <van-uploader :after-read="upload" :accept="'image/*'" :max-count="1">
            <van-button
              type="primary"
              size="large"
              :loading="loading"
              loading-type="spinner"
              class="uploadBtn"
              :hairline="false"
            >点击上传</van-button>
          </van-uploader>
        </div>
      </van-dialog>
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
      list: [],
      show: false,
      payment: null,
      paymentText: "请选择二维码类型",
      option: [{ text: "微信", value: 1 }, { text: "支付宝", value: 2 }],
      loading: false,
      optionShow: false,
      edit: false,
      delList: []
    };
  },
  created() {
    this.getList();
  },
  computed: {
    count() {
      var count = 0;
      this.list.forEach(e => {
        if (e.del) {
          count++;
        }
      });
      return count;
    }
  },
  methods: {
    getList() {
      this.$SERVER.qrcode().then(res => {
        this.list = res.data;
      });
    },
    upload(file) {
      if (!this.payment) {
        this.$toast.fail("请先选择二维码类型！");
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("token", this.$store.state.token);
      formData.append("payment", this.payment);
      this.$SERVER
        .update_qrcode(formData)
        .then(res => {
          this.getList();
          this.loading = false;
          this.show = false;
        })
        .catch(err => {
          this.$toast.fail(err.msg);
        });
    },
    optionFn(e) {
      this.payment = e.target.dataset.type;
      this.paymentText = e.target.innerText;
      this.optionShow = false;
    },
    selectDel(index) {
      this.list[index].del = !this.list[index].del;
      if (this.list[index].del) {
        this.delList.push(this.list[index].id);
        this.delList = [...new Set(this.delList)];
      }
    },
    DelFn() {
      if (this.delList.length == 0) {
        this.$toast.fail("请选择要删除的二维码！");
        return
      }
      this.$SERVER
        .del_qrcode({
          id: this.delList.join(",")
        })
        .then(res => {
          this.$toast.success("删除成功！");
          this.edit = false;
          this.delList = [];
          this.getList();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 0 25px;
  background: rgba(255, 255, 255, 1) url(../../assets/images/bg3.png) no-repeat
    250px 150px;
  background-size: auto 270px;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 35px 0;
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
    span {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
.list {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    img {
      width: 35px;
      height: 35px;
      margin-right: 15px;
    }
    .text {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      flex-grow: 1;
      h3 {
        font-size: 15px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        span {
          font-weight: bold;
        }
      }
      p {
        font-size: 13px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
      }
    }
  }
}
.uploadDialog {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  .select {
    width: 250px;
    height: 40px;
    background: rgba(231, 231, 231, 1);
    border: 1px solid rgba(0, 0, 0, 0.09);
    border-radius: 20px;
    position: relative;
    h3 {
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 40px;
      text-indent: 3em;
    }
    .option {
      position: absolute;
      z-index: 999;
      background-color: #fff;
      .item {
        width: 250px;
        height: 40px;
        line-height: 40px;
        background: rgba(231, 231, 231, 1);
        border: 1px solid rgba(0, 0, 0, 0.09);
        border-radius: 20px;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
  .uploadBtn {
    width: 150px;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(249, 74, 81, 1),
      rgba(247, 109, 98, 1)
    );
    border-radius: 20px;

    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;

    margin: 20px auto;
    font-size: 17px;
    border: 0;
  }
}
</style>