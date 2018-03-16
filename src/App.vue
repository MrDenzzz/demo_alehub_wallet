<template>
    <div id="app" :class="systemLanguage">

        <div v-if="isLoader">
            <sync-loader :load="isLoader" />
        </div>

        <div v-else>
            <router-view />
            <Connection-modal />
            <New-wallet />
        </div>
    </div>
</template>

<script>
    import ConnectionModal from './components/modals/ConnectionModal';
    import NewWallet from './components/modals/NewWallet';
    import Spinner from './components/layouts/Spinner';
    import SyncLoader from './components/layouts/SyncLoader';

    import {mapMutations} from 'vuex';

    export default {
        name: 'alehub',
        components: {
            ConnectionModal,
            NewWallet,
            Spinner,
            SyncLoader
        },
        data() {
            return {
                language: localStorage.getItem('systemLang'),
                isOpenModal: false,
                isLoader: true
            }
        },
        computed: {
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            systemLanguage: function () {
                if (this.language === null) return 'eng';
                else return this.language;
            }
        },
        methods: {
            ...mapMutations ({
                setCurrentWallet: 'CHANGE_NEW_WALLET',
                createNewWallet: 'CREATE_NEW_WALLET',
                addNewTransactions: 'ADD_NEW_TRANSACTION',
                setNewBalance: 'SET_NEW_BALANCE',
                changeTransactionLoaderState: 'CHANGE_TRANSACTION_LOADER_STATE'
            }),
            // initiateWallets: function () {
            //     this.$http.post(`${this.$host}/wallet/addressInfo`, {
            //         addresses: JSON.parse(localStorage.getItem('wallets')),
            //     }, {
            //         headers: {
            //             'Content-Type': 'application/json; charset=UTF-8',
            //             'Accept': 'application/json'
            //         }
            //     }).then(response => {
            //         console.log(response);
            //         if (response.body.foundedAddresses.length !== 0) {
            //             for (let i = 0; i < response.body.foundedAddresses.length; i++) {
            //                 this.createNewWallet(response.body.foundedAddresses[i]);
            //             }
            //
            //             this.setCurrentWallet(response.body.foundedAddresses[0].address);
            //             this.getTransactions(response.body.foundedAddresses[0].address);
            //             this.isLoader = false;
            //         }
            //     }, response => {
            //         console.log('error', response);
            //     });
            // },
            updateOnlineStatus: function (e) {
                if (!navigator.onLine) {
                    return this.$modal.show('connectionmodal');
                }
            },
            // getTransactions: function (address) {
            //     this.changeTransactionLoaderState(true);
            //     this.$http.get(`${this.$host}/transactions/${address}`, {
            //         headers: {
            //             'Content-Type': 'application/json; charset=UTF-8',
            //             'Accept': 'application/json'
            //         }
            //     }).then(response => {
            //         this.addNewTransactions(response.body);
            //         this.changeTransactionLoaderState(false);
            //     }, response => {
            //         console.log('error', response);
            //     });
            // },
            // getIntervalWalletsInfo () {
            //     this.$http.post(`${this.$host}/wallet/addressInfo`, {
            //         addresses: JSON.parse(localStorage.getItem('wallets')),
            //     }, {
            //         headers: {
            //             'Content-Type': 'application/json; charset=UTF-8',
            //             'Accept': 'application/json'
            //         }
            //     }).then(response => {
            //
            //         if (response.body.foundedAddresses.length !== 0) {
            //             this.setNewBalance(response.body.foundedAddresses);
            //         }
            //
            //     }, response => {
            //         console.log('error', response);
            //     });
            // }
        },
        created() {
            let _this = this;
            this.isOpenModal = false;
            if (localStorage.getItem('wallets') === null) {
                return false;
            }

            // this.initiateWallets();

            // setInterval(_this.getIntervalWalletsInfo, 15000);

        },
        mounted() {
            if (!navigator.onLine) {
                this.isLoader = true;
                return this.$modal.show('connectionmodal');
            }

            this.$on('changeSystemLanguage', function () {
                this.language = localStorage.getItem('systemLang');
            });

            // if (localStorage.getItem('wallets') === null) {
            //     this.isOpenModal = true;
            //     return this.$modal.show("newwallet");
            // }

            this.isLoader = false;
        }
    }
</script>

<style lang="stylus">
    .rus
        .navbar
            .title
                font-family DINProCondensedBold

    .china
        .navbar
            .title
                font-family PingFangSCBold

</style>
