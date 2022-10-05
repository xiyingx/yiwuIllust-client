import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index'
import store from './store/index'
import './assets/icons/index'
import { VueMasonryPlugin } from 'vue-masonry';
import picturePrint from '@/components/picturePrint'
import printUserList from '@/components/printUserList'
import navP from '@/components/navP'
import nav from '@/components/nav'
import navItem from '@/components/navItem'
import navI from '@/components/navI'

Vue.use(VueMasonryPlugin);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component("print-pic", picturePrint);
Vue.component("print-user", printUserList);

Vue.component("nav-my", nav);
Vue.component("nav-item", navItem);

Vue.component("nav-i", navI);

Vue.component("nav-p", navP);

new Vue({
  el: '#app',
  router: router,
  store: store,
  //接收router实例对象
  render: h => h(App)
});
