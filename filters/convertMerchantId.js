import Vue from 'vue'

export default () => {
  Vue.filter("convertMerchantId", function (merchantId) {
    let status = "";
    switch (merchantId) {
      case "66":
        status = "بسته ایرانسل";
        break;
      case "67":
        status = "شارژ ایرانسل";
        break;
      case "68":
        status = "شارژ رایتل";
        break;
      case "69":
        status = "بسته رایتل";
        break;
      case "70":
        status = "بسته همراه اول";
        break;
      case "71":
        status = "شارژ همراه اول";
        break;
      default:
        status = "تعیین نشده";
    }
    return status;
  });
}
