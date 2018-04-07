<template>
    <div id="app" :class="systemLanguage">
        <div v-if="isLoading">
            <sync-loader :load="isLoading"/>
        </div>
        <div v-else>
            <router-view/>
            <div
                    v-if="changedTransactions"
                    class="alert-new-transactions"
                    @click="refreshCurrentTransactions">
                You have received new transactions. Click to refresh.
                <img src="/static/img/reload-white.svg" class="alert-new-transactions__img" alt="">
            </div>
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
                token: localStorage.getItem(sha256('user-token')),
                readyToPing: false,
                setIntervalId: 0
            }
        },
        computed: {
            ...mapGetters([
                'authStatus',
                'userStatus',
                'walletStatus',
                'userHaveWallets',
                'userHaveTransactions',
                'transactionStatus',
                'initiateFilterDateStatus',
                'lengthWalletList',
                'currentWalletAddress',
                'changedTransactions',
                'wallets',
                'currentWallet',
                'changedWallets',
                'currentWalletHaveTransactions',

                'allTransactions',

                'walletsLoadedAddresses',

                'diffWalletsAddresses'
            ]),
            systemLanguage: function () {
                if (this.language === null) return 'eng';
                else return this.language;
            },
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            isLoading: function () {
                if (localStorage.getItem(sha256('user-token')) === null) {
                    this.readyToPing = false;
                    return false;
                }

                if ((this.authStatus === 'success' && this.userStatus === 'success' && !this.userHaveWallets && !this.currentWalletHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && !this.currentWalletHaveTransactions) ||
                    (this.authStatus === 'success' && this.userStatus === 'success' && this.userHaveWallets && this.walletStatus === 'success' && this.currentWalletHaveTransactions && this.transactionStatus === 'success' && this.initiateFilterDateStatus === 'success')) {

                    (!this.userHaveWallets) ? this.readyToPing = false : this.readyToPing = true;

                    this.downloadMissingTransactions();

                    console.log('Load app');
                    return false;
                }
                return true;
            }
        },
        methods: {
            updateOnlineStatus: function (e) {
                if (!navigator.onLine) {
                    return this.$modal.show('connectionmodal');
                }
            },
            pingData: function () {
                if (this.readyToPing && this.wallets.length !== 0) {
                    this.$store.dispatch('transactionsRequestPing',
                        this.currentWalletAddress
                    ).then(() => {
                        this.$store.dispatch('walletsRequestPing'
                        ).then(() => {

                            if (this.changedWallets) {

                                this.$store.dispatch('resetChangedWallets'
                                ).then(() => {
                                    // console.log('Success reset changed wallets. App.vue');
                                }).catch(() => {
                                    console.log('Error reset changed wallets. App.vue');
                                });

                                this.$store.dispatch('getNotifications'
                                ).then(() => {
                                    console.log('Success get notifications');
                                }).catch(() => {
                                    console.log('Error get notifications');
                                });

                                this.$toasted.show('You got money for your wallet', {
                                    duration: 10000,
                                    type: 'success',
                                    action : {
                                        text : 'hide',
                                        class: 'toasted-action-hide',
                                        onClick : (e, toastObject) => {
                                            toastObject.goAway(0);
                                        }
                                    }
                                })
                            }
                        }).catch(() => {
                            console.log('Error ping wallets');
                        });
                    }).catch(() => {
                        console.log('Error ping transactions');
                    });
                }
            },
            refreshCurrentTransactions: function () {
                this.$store.dispatch('refreshTransactions'
                ).then(() => {
                    console.log('Success refresh transactions');
                }).catch(() => {
                    console.log('Error refresh transactions');
                });
            },
            downloadMissingTransactions: function () {
                this.$store.dispatch('addMissingToLoadedWallets'
                ).then(() => {

                    // console.log(this.walletsLoadedAddresses, 'this.walletsLoadedAddresses');
                    // console.log(this.diffWalletsAddresses, 'this.diffWalletsAddresses');

                    this.$store.dispatch('addMissingTransactionsRequest', {
                        addresses: this.diffWalletsAddresses
                    }).then(() => {
                        console.log(this.allTransactions, 'this.allTransactions from WalletsList.vue');
                    }).catch(() => {
                        console.log('Error request all transactions');
                    });
                }).catch(() => {
                    console.log('Error addition missing wallets to loaded wallets');
                });
            }
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


            this.isOpenModal = false;
            if (localStorage.getItem('wallets') === null) {
                return false;
            }
        },
        mounted() {
            this.setIntervalId = setInterval(this.pingData, 60000);

            if (!navigator.onLine) {
                this.isLoader = true;
                return this.$modal.show('connectionmodal');
            }

            this.$on('changeSystemLanguage', function () {
                this.language = localStorage.getItem('systemLang');
            });

            this.isLoader = false;
        }
    }
</script>

<style lang="stylus">
    .alert-new-transactions
        position fixed
        bottom 0
        width 100%
        color #ffffff
        background-color #1bac2c
        z-index 10000
        display flex
        justify-content center
        align-items center
        justify-content center
        padding-top 1em
        padding-bottom 1em
        cursor pointer
        font-family MuseoSansCyrl500

        .alert-new-transactions__img
            height 15px
            width 15px
            margin-left 0.5em

    .toasted-action-hide
        color #f7f7f7 !important

    .rus
        .navbar
            .title
                font-family DINProCondensedBold
                font-size 26px
                @media (max-width: 1200px)
                    transform translateX(-40%)
                @media (max-width: 1150px)
                    transform translateX(-30%)
                @media (max-width: 1100px)
                    transform translateX(-20%)
                @media (max-width: 1050px)
                    transform translateX(-10%)
                @media (max-width: 1024px)
                    transform translateX(-50%)

    .china
        .navbar
            .title
                font-family PingFangSCBold

    .fade-enter-active, .fade-leave-active
        transition opacity .3s

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
        opacity 0.5

</style>
