import Vue from 'vue';
import Router from 'vue-router';
import {store} from '../store';

import Wallet from '@/components/Wallet';
import Notifications from '@/components/Notifications';
import Settings from '@/components/Settings';
import WalletSettings from '@/components/WalletSettings';
import NotFound from '@/components/NotFound';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Wallet',
            component: Wallet
        },
        {
            path: '/wallet',
            redirect: '/',
        },
        {
            path: '/wallet/settings',
            name: 'WalletSettings',
            component: WalletSettings
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        },
        {
            path: '/notifications',
            name: 'Notifications',
            component: Notifications
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});


router.beforeEach((to, from, next) => {

    // let findUserWallet = store.state.Wallets.wallets.filter(item => {
    //     return parseInt(item.ownerId) === parseInt(localStorage.getItem('id'))
    // });
    //
    // if (!localStorage.getItem('walletId')) {
    //
    // } else {
    //     if (store.state.Wallets.currentWallet === undefined) {
    //         this.setCurrentWallet(localStorage.getItem('walletId'));
    //     }
    // }

    next();

});

export default router;
