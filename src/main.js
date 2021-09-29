import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

 
Vue.component('v-select', vSelect)


Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
