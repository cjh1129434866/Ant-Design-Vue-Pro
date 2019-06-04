import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import { Button, Layout, Icon, Drawer, Radio, Menu, Form, Input, Select, LocaleProvider, Dropdown, DatePicker } from "ant-design-vue";
import Authorized from "./components/authorized";
import Auth from './directives/auth.js';
import request from "./utils/request.js";
import queryString from "query-string";
import vueI18n from "vue-i18n";
import zhCN from "./locale/zhCN.js";
import enUS from "./locale/enUS.js";
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/github.css';
Vue.config.productionTip = false;

Vue.prototype.axios = request
Vue.use(Button)
  .use(Layout)
  .use(Icon)
  .use(Drawer)
  .use(Radio)
  .use(Menu)
  .use(Form)
  .use(Input)
  .use(Select)
  .use(LocaleProvider)
  .use(Dropdown)
  .use(DatePicker)
  .use(VueHighlightJS);
Vue.use(Auth);
Vue.use(vueI18n);
Vue.component("Authorized", Authorized);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1222568_6l4352tpkp8.js" // 在 iconfont.cn 上生成
});
Vue.component("IconFont", IconFont);

const i18n = new vueI18n({
  locale: queryString.parse(location.search).locale || "zhCN", // 默认语言； 引入需要url, 所以这里使用queryString 解析
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
