import Vue from 'vue';
import Router from 'vue-router';
import {store} from '../store';

import Summary from '@/components/Summary';
import Login from '@/components/Login';
import Registration from '@/components/Registration';
import TwoAuth from '@/components/TwoAuth';
import Notifications from '@/components/Notifications';
import Settings from '@/components/Settings';
import WalletSettings from '@/components/WalletSettings';
import NotFound from '@/components/NotFound';
import Offers from '@/components/Offers';
import Resume from '@/components/Resume';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Summary',
            component: Summary
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/twoauth',
            name: 'TwoAuth',
            component: TwoAuth
        },
        {
            path: '/wallet/settings',
            name: 'WalletSettings',
            component: WalletSettings
        },
        // {
        //     path: '/wallet',
        //     redirect: '/',
        // },
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
            path: '/offers',
            name: 'Offers',
            component: Offers
        },
        {
            path: '/resume',
            name: 'Resume',
            component: Resume
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});


// router.beforeEach((to, from, next) => {

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

//     next();
//
// });

export default router;
