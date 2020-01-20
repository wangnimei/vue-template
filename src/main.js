import Vue from 'vue';
import {
  Form, FormItem, Input, Button,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import 'nprogress/nprogress.css';
import './styles/common.scss';


Vue.config.productionTip = false;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
