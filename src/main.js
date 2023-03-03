import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './css/request.less';
import * as echarts from 'echarts';
//引入i18n
import i18n from './lang/index';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册字节跳动图标
import iconPark from './plugins/icon-park'
app.config.globalProperties.$echarts = echarts;
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(iconPark);
app.use(i18n);

app.mount('#app');
