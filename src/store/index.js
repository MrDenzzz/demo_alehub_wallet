import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import NavbarModule from './modules/Navbar';
import NotificationsModule from './modules/Notifications';
import SettingsModule from './modules/Settings';
import TransactionsModule from './modules/Transactions';
import UsersModule from './modules/Users';
import WalletsModule from './modules/Wallets';
import OffersModule from './modules/Offers';



export const store = new Vuex.Store({
    modules: {
        Navbar: NavbarModule,
        Notifications: NotificationsModule,
        Settings: SettingsModule,
        Transactions: TransactionsModule,
        Users: UsersModule,
        Wallets: WalletsModule,
        Offers: OffersModule
    },
    strict: false
});
