import Vue from 'vue';
import Electron from 'vue-electron';
import Modal from 'vue-js-modal';
import axios from 'axios';
import App from './App';
// 暂时去掉没用的rounter
import router from './router';
import store from './store';

Vue.use(Electron);
Vue.use(Modal);

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
}).$mount('#app');
