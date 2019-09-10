import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const locale = require('element-ui/lib/locale/lang/zh-CN').default;  // lang i18n
Vue.use(ElementUI, { locale, size: 'mini' })

// 引入svg icon
import '@/icons';

// 引入样式
import "@/style/index.scss";

// 引入组件
import components from "@/components";
let coms: any = components;
for (const k in coms) {
  Vue.component(k, coms[k])
}

// 引入请求
import '@/permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
