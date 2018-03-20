import Vue from 'vue';
import Router from 'vue-router';
import {store} from '../store';
import sha256 from 'sha256';

import Summary from '@/components/Summary';
import Login from '@/components/Login';
import Registration from '@/components/Registration';
import TwoAuth from '@/components/TwoAuth';
import ConfirmationUser from '@/components/ConfirmationUser';
import Notifications from '@/components/Notifications';
import Settings from '@/components/Settings';
import WalletSettings from '@/components/WalletSettings';
import NotFound from '@/components/NotFound';
import Offers from '@/components/Offers';
import Resume from '@/components/Resume';
import NewOffer from '@/components/NewOffer'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    let token = localStorage.getItem(sha256('user-token'));
    if (token === null || token === 'undefined' || token === undefined) {
        localStorage.clear();
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    let token = localStorage.getItem(sha256('user-token'));
    if (token !== null && token !== 'undefined' && token !== undefined) {
        next();
        return;
    }
    localStorage.clear();
    next('/login');
};

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Summary',
            component: Summary,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/registration/confirmationuser/:token',
            name: 'ConfirmationUser',
            component: ConfirmationUser,
            beforeEnter: ifNotAuthenticated
        },
        // {
        //     path: '/registration/confirmationuser',
        //     name: 'ConfirmationUser',
        //     component: ConfirmationUser
        // },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/login/twoauth',
            name: 'TwoAuth',
            component: TwoAuth,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/wallet/settings',
            name: 'WalletSettings',
            component: WalletSettings,
            beforeEnter: ifAuthenticated
        },
        // {
        //     path: '/wallet',
        //     redirect: '/',
        // },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/notifications',
            name: 'Notifications',
            component: Notifications,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/offers',
            name: 'Offers',
            component: Offers,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/offers/new',
            name: 'NewOffer',
            component: NewOffer,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/resume',
            name: 'Resume',
            component: Resume,
            beforeEnter: ifAuthenticated
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});


router.beforeEach((to, from, next) => {

    next();
});

export default router;
