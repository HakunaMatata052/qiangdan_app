import Axios from "./axios";

class Api extends Axios {
  /**
   * 获取商品数据
   * @param {Object} params typeid
   */
  async smscode(params = {}) {
    return await this.axios("POST", "user/smscode", params);
  }  
  async login(params = {}) {
    return await this.axios("POST", "user/login", params);
  }
  async logout(params = {}) {
    return await this.axios("POST", "user/logout", params)
  }
  async register(params = {}) {
    return await this.axios("POST", "user/register", params);
  }
  async shop_banner(params = {}) {
    return await this.axios("POST", "shop/shop_banner", params);
  }
  async shop_list(params = {}) {
    return await this.axios("POST", "shop/shop_list", params);
  }
  async exchange(params = {}) {
    return await this.axios("POST", "shop/exchange", params,{isLogin:true});
  }
  async exchange_log(params = {}) {
    return await this.axios("POST", "shop/exchange_log", params,{isLogin:true});
  }
  async convert_log(params = {}) {
    return await this.axios("POST", "user/convert_log", params,{isLogin:true});
  }
  async money_log(params = {}) {
    return await this.axios("POST", "user/money_log", params,{isLogin:true});
  }
  
  async qrcode(params = {}) {
    return await this.axios("POST", "userinfo/qrcode", params,{isLogin:true});
  }
  async update_qrcode(params = {}) {
    return await this.axios("POST", "userinfo/update_qrcode", params,{isLogin:true});
  }
  async del_qrcode(params = {}) {
    return await this.axios("POST", "userinfo/del_qrcode", params,{isLogin:true});
  }  
  async setting(params = {}) {
    return await this.axios("POST", "userinfo/setting", params,{isLogin:true});
  }
  async information(params = {}) {
    return await this.axios("POST", "userinfo/information", params);
  }
  async payment(params = {}) {
    return await this.axios("POST", "graborder/payment", params,{fail:true});
  }  
  async index_order(params = {}) {
    return await this.axios("POST", "User/index_order", params);
  }    
  async spread(params = {}) {
    return await this.axios("POST", "User/spread", params);
  }  
  async log_list(params = {}) {
    return await this.axios("POST", "User/log_list", params);
  }  
  async uploadfile(params = {}) {
    return await this.axios("POST", "User/upload", params);
  }
  async faceup(params = {}) {
    return await this.axios("POST", "User/faceup", params);
  }
  async carousel(params = {}) {
    return await this.axios("POST", "graborder/carousel", params);
  }
  async leaderboard(params = {}) {
    return await this.axios("POST", "graborder/leaderboard", params);
  }
  async sms_check(params = {}) {
    return await this.axios("POST", "User/sms_check", params);
  }
  async chongzhi(params = {}) {
    return await this.axios("POST", "userinfo/chongzhi", params);
  }
  async recharge(params = {}) {
    return await this.axios("POST", "userinfo/recharge", params);
  }
  async certificate(params = {}) {
    return await this.axios("POST", "userinfo/certificate", params);
  }
  async rechargeDetail(params = {}) {
    return await this.axios("POST", "userinfo/detail", params);
  }
  async withdraw(params = {}) {
    return await this.axios("POST", "userinfo/withdraw", params);
  }
  async certificate(params = {}) {
    return await this.axios("POST", "userinfo/certificate", params);
  }
}

export default new Api();