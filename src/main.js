import Vue from 'vue';
// markdown
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
// import 'mavon-editor/dist/highlightjs/highlight.min';
// import 'mavon-editor/dist/katex/katex';
import { Plugin } from 'vue-fragment';
import animate from 'animate.css';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './common/http/api';
import './common/util/timeConverter';
// 整合elementUI
import './plugins/element';
// 引入全局css文件
import '@/assets/style/common.css';
// 引入清除默认的css样式文件
import '@/assets/style/reset.css';
import '../permission';

Vue.use(animate);
Vue.use(Plugin);

Vue.prototype.$api = api;

Vue.use(mavonEditor);
Vue.config.productionTip = false;

window.vm = new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
