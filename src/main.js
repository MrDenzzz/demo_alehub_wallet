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
Vue.prototype.$host = 'http://192.168.1.42:4000';
// Vue.prototype.$host = 'http://192.168.1.42:4000';
// Vue.prototype.$host = 'localhost:4000';

const NotifOptions = {
    position: 'bottom-center',
    fullWidth: true,
    singleton: true,
    containerClass: 'notifPanel',
    fitToScreen: true,
    closeOnSwipe: true,
    // action : {
        onClick : (e, toastObject) => {
            console.log('clickclickclick');
            toastObject.goAway(0);
        }
    // },
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


Object.prototype.equals = function (object2) {

    for (let propName in this) {
        if (this.hasOwnProperty(propName) !== object2.hasOwnProperty(propName))
            return false;

        else if (typeof this[propName] !== typeof object2[propName])
            return false;
    }

    for (let propName in object2) {

        if (this.hasOwnProperty(propName) !== object2.hasOwnProperty(propName))
            return false;

        else if (typeof this[propName] !== typeof object2[propName])
            return false;


        if (!this.hasOwnProperty(propName))
            continue;

        /**REQUIRES Array.equals**/

        if (this[propName] instanceof Array && object2[propName] instanceof Array) {

            if (!this[propName].equals(object2[propName]))
                return false;

        } else if (this[propName] instanceof Object && object2[propName] instanceof Object) {

            if (!this[propName].equals(object2[propName]))
                return false;

        } else if (this[propName] !== object2[propName]) {
            return false;
        }
    }

    return true;
};

Object.defineProperty(Object.prototype, 'equals', {enumerable: false});

Array.prototype.equals = function (array) {

    let self = this;

    if (!array)
        return false;

    if (self.length !== array.length)
        return false;

    for (var i = 0; i < self.length; i++) {
        if (self[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!self[i].equals(array[i]))
                return false;

            /**REQUIRES OBJECT COMPARE**/
        } else if (self[i] instanceof Object && array[i] instanceof Object) {

            if (!self[i].equals(array[i]))
                return false;

        } else if (self[i] !== array[i]) {
            return false;
        }
    }
    return true;
};

Object.defineProperty(Array.prototype, 'equals', {enumerable: false});


let systemLang = '';
if (localStorage.getItem('systemLang') === null) {
    localStorage.setItem('systemLang', 'eng');
    systemLang = 'eng';
} else {
    systemLang = localStorage.getItem('systemLang');
}
if (systemLang !== ('rus' || 'eng')) systemLang = 'eng';

const i18n = new VueI18n({
    locale: systemLang,
    messages
});

const token = localStorage.getItem(sha256('user-token'));
if (token !== 'undefined' && token) {
    axios.defaults.headers.common['Authorization'] = token;

    store.dispatch('userRequest').then((resp) => {

        console.log(resp, 'this user');

        console.log('Successfully reload');

        if (store.state.User.haveWallets) {

            store.dispatch('walletsRequest').then(() => {

                console.log('Successfully reload wallets');

                if (store.state.Wallets.currentWallet !== null) {

                    store.dispatch('changeCurrentWallet',
                        localStorage.getItem(sha256('current-wallet'))
                    ).then(() => {

                        if (store.state.User.haveTransactions) {
                            store.dispatch('transactionsRequest',
                                store.state.Wallets.currentWallet.address
                            ).then(() => {
                                console.log('Successfully reload transactions');
                            }).catch(() => {
                                console.log('Error requesting transactions. main.js');
                            });
                        }

                    }).catch(() => {
                        console.log('Error set current wallet. main.js');
                    });
                }
            }).catch(() => {
                console.log('Error requesting wallets. main.js');
            });
        }
    }).catch(() => {
        console.log('Error requesting user. main.js');
    });

}

new Vue({
    el: '#app',
    store,
    router,
    i18n,
    components: {App},
    template: '<App/>'
});
