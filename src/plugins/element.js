import Vue from 'vue';
// Element
import Element from 'element-ui';
import './element.scss';

Vue.prototype.$message = Element.Message;
Vue.use(Element);
