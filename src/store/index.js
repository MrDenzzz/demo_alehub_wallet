import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import NavbarModule from './modules/Navbar';
import NotificationsModule from './modules/Notifications';
import SettingsModule from './modules/Settings';
import TransactionsModule from './modules/Transactions';
import UsersModule from './modules/Users';
import UserModule from './modules/User';
import WalletsModule from './modules/Wallets';
import OffersModule from './modules/Offers';
import OffersListModule from './modules/OffersList';
import ThemesModule from './modules/Themes';
import OfferModule from './modules/Offer';
import OffersNew from './modules/OffersNew';
import OfferRequirements from './modules/OfferRequirements';


export const store = new Vuex.Store({
    modules: {
        Navbar: NavbarModule,
        Notifications: NotificationsModule,
        Settings: SettingsModule,
        Transactions: TransactionsModule,
        Users: UsersModule,
        User: UserModule,
        Wallets: WalletsModule,
        Offers: OffersModule,
        OffersList: OffersListModule,
        Themes: ThemesModule,
        Offer: OfferModule,
        OffersNew: OffersNew,
        OfferRequirements: OfferRequirements
    },
    strict: false
});
