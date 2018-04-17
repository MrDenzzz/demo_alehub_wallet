import Vue from 'vue';
import Router from 'vue-router';
import VModal from 'vue-js-modal';
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
import NewOffer from '@/components/NewOffer';
import Recover from '@/components/Recover';
import RecoverConfirm from '@/components/RecoverConfirm';
import Recover2fa from '@/components/Recover2fa';
import LoginTwoAuth from '@/components/LoginTwoAuth';
import ConfirmationChangeEmail from '@/components/ConfirmationChangeEmail';

Vue.use(Router);
Vue.use(VModal);

const ifNotAuthenticated = (to, from, next) => {
    // console.log(to, 'to');
    // console.log(from, 'from');
    let token = localStorage.getItem(sha256('user-token'));
    if (token === null || token === 'undefined' || token === undefined) {
        console.log('mistake');
        localStorage.removeItem(sha256('user-token'));
        next();
        return;
    }
    next(from.fullPath);
};

const ifNotFirstStepAuthenticated = (to, from, next) => {
    console.log('mistake 1');
    let token = localStorage.getItem(sha256('user-token'));
    if (from.name !== 'Login' && (token === null || token === 'undefined' || token === undefined)) {
        localStorage.removeItem(sha256('user-token'));
        next('/login');
        return;
    } else if (token !== null && token !== 'undefined' && token !== undefined) {
        next(from.fullPath);
        return;
    }
    next();
};

const ifAuthenticated = (to, from, next) => {
    console.log('mistake 2');
    //заплатка. переписать
    setTimeout(() => {
        if (store.state.Wallets.wallets.length === 0) {
            next('/');
            return;
        }
    }, 1000);
    let token = localStorage.getItem(sha256('user-token'));
    if (token !== null && token !== 'undefined' && token !== undefined) {
        next();
        return;
    }
    localStorage.removeItem(sha256('user-token'));
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
            path: '/registration/confirmationuser/:token',  //set kebab case url
            name: 'ConfirmationUser',
            component: ConfirmationUser,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/confirmation-change-email/:token',
            name: 'ConfirmationChangeEmail',
            component: ConfirmationChangeEmail,
            beforeEnter: ifAuthenticated
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
            name: 'LoginTwoAuth',
            component: LoginTwoAuth,
            beforeEnter: ifNotFirstStepAuthenticated
        },
        {
            path: '/login/twoauth',
            name: 'TwoAuth',
            component: TwoAuth,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/recover-confirm/:token',
            name: 'RecoverConfirm',
            component: RecoverConfirm,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/recover',
            name: 'Recover',
            component: Recover
        },
        {
            path: '/recover-twofactor',
            name: 'Recover2fa',
            component: Recover2fa
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
        // {
        //     path: '/offers',
        //     name: 'Offers',
        //     component: Offers,
        //     beforeEnter: ifAuthenticated
        // },
        // {
        //     path: '/offers/new',
        //     name: 'NewOffer',
        //     component: NewOffer,
        //     beforeEnter: ifAuthenticated
        // },
        // {
        //     path: '/resume',
        //     name: 'Resume',
        //     component: Resume,
        //     beforeEnter: ifAuthenticated
        // },
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
