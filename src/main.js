import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store'
import VueI18n from 'vue-i18n';
import VModal from 'vue-js-modal';
import VeeValidate from 'vee-validate';
import VueNumeric from 'vue-numeric';
import VueQriously from 'vue-qriously';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import VueTheMask from 'vue-the-mask';
import VueResource from 'vue-resource';

import axios from 'axios';
import sha256 from 'sha256';

Vue.config.productionTip = false;
Vue.prototype.$host = 'http://192.168.1.37:4000';
// Vue.prototype.$host = 'localhost:4000';

const NotifOptions = {
    position: 'bottom-center',
    fullWidth: true,
    singleton: true,
    containerClass: 'notifPanel',
    fitToScreen: true,
    closeOnSwipe: false
};

Vue.use(VueI18n);
Vue.use(VueNumeric);
Vue.use(VeeValidate);
Vue.use(VueQriously);
Vue.use(VueClipboard);
Vue.use(VModal);
Vue.use(Toasted, NotifOptions);
Vue.use(VueTheMask);
Vue.use(VueResource);

import messages from './i18n.js';

let systemLang = '';
if (localStorage.getItem('systemLang') === null) {
    localStorage.setItem('systemLang', 'eng');
    systemLang = 'eng';
} else {
    systemLang = localStorage.getItem('systemLang');
}
if (systemLang !== ('rus' || 'eng')) systemLang = 'eng'

const i18n = new VueI18n({
    locale: systemLang,
    messages
});

const token = localStorage.getItem(sha256('user-token'));
if (token !== 'undefined' && token) {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch('userRequest').then(() => {
        console.log('successfully reload');
    });
}

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>'
});
