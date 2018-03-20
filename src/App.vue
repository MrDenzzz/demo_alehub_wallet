<template>
    <div id="app" :class="systemLanguage">

        <div v-if="isLoading">
            <sync-loader :load="isLoading"/>
        </div>
        <div v-else>
            <!--<New-wallet/>-->
            <router-view/>
            <Connection-modal/>
        </div>
    </div>
</template>

<script>
    import ConnectionModal from './components/modals/ConnectionModal';
    import NewWallet from './components/modals/NewWallet';
    import Spinner from './components/layouts/Spinner';
    import SyncLoader from './components/layouts/SyncLoader';

    import sha256 from 'sha256';

    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';

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
                isLoader: false,
                token: localStorage.getItem(sha256('user-token'))
            }
        },
        computed: {
            ...mapGetters([
                'authStatus',
                'userStatus',
                'walletStatus',
                'transactionsStatus',
                'lengthWalletList'
            ]),
            // currentToken: function () {
            //     return this.$store.state.User.token;
            // },
            // currentStatus: function () {
            //     return this.$store.state.User.status;
            // },
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            systemLanguage: function () {
                if (this.language === null) return 'eng';
                else return this.language;
            },
            selectedTheme() {
                return this.$store.state.Themes.theme;
            },
            isLoading: function () {
                if (localStorage.getItem(sha256('user-token')) === null) {
                    return false;
                }

                if (this.authStatus === 'success' && this.userStatus === 'success' && this.walletStatus === 'success') {
                    // this.transactionsStatus === 'success') {


                    // if (this.lengthWalletList === 0) {
                    //     this.$modal.show('newwallet');
                    // }

                    return false;
                }

                // else if (this.token === null) {
                //     this.$router.push('/login');
                //     return false
                // }

                return true;
            }
        },
        methods: {
            ...mapMutations({
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
            let body = document.querySelector('body');
            switch (this.selectedTheme) {
                case 'main':
                    body.classList.remove("dark", "white");
                    break;
                case 'dark':
                    body.classList.remove("white");
                    body.classList.add("dark");
                    break;
                case 'white':
                    body.classList.remove("dark");
                    body.classList.add("white");
                    break;
            }
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
