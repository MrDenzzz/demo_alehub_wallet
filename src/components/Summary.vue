<template>
    <div class="wallet">
        <navbar :title="$t('pages.summary.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"/>

        <section class="main">
            <wallets-list :new-wallets="wallets"/>
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="stats-balance">
                                <div class="stats-col">
                                    <!--заплатка. переделать-->
                                    <send-request v-if="this.transactions.length === 0 && (transactionStatus === 'error' ||
                                             transactionsLazyStatus === 'success' || !currentWalletHaveTransactions)"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!--заплатка. переделать-->
                            <div v-if="checkLoadingSpinner"
                                 class="wrap-spinner">
                                <spinner/>
                            </div>

                            <transactions-tool-panel v-if="this.transactions.length !== 0 &&
                                                     transactionsLazyStatus === 'success'"
                                                     :current-transactions="getActivity"
                                                     :reset-search="resetSearch"/>

                            <activity-list v-if="getActivity.length !== 0 && transactionsLazyStatus === 'success'"
                                           :activities="getActivity"
                                           :is-show-date="true"
                                           :change-wallet-result="changeWalletResult"
                                           :new-transaction="newTransaction"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="flex-block-transaction"
                                 :class="{'m-t-center': transactions.length === 0}"
                                 v-if="getActivity.length === 0 && (transactionStatus === 'error' ||
                                 transactionsLazyStatus === 'success' || !currentWalletHaveTransactions)">

                                <p class="absence-transactions">
                                    {{ $t('pages.summary.notFound') }}
                                </p>

                                <button v-if="transactions.length !== 0"
                                        class="buttons btn-yellow"
                                        @click="resetFilter()">
                                    {{ $t('pages.summary.buttons.reset')}}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <new-wallet/>
        <select-language/>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import WalletsList from './layouts/WalletsList';
    import ActivityList from './layouts/ActivityList';
    import PanelHeading from './layouts/PanelHeading';
    import NewWallet from './modals/NewWallet';
    import SelectLanguage from './modals/SelectLanguage';
    import SendRequest from './layouts/SendRequest';
    import TransactionsToolPanel from './layouts/TransactionsToolPanel';
    import FormattingPrice from './layouts/FormattingPrice';
    import Spinner from './layouts/Spinner';

    import Moment from 'moment';

    import sha256 from 'sha256';

    import {mapGetters} from "vuex";

    export default {
        name: 'wallet',
        components: {
            Navbar,
            WalletsList,
            ActivityList,
            PanelHeading,
            NewWallet,
            SendRequest,
            TransactionsToolPanel,
            FormattingPrice,
            Spinner,
            SelectLanguage //z
        },
        data() {
            return {
                isSuccessNotif: true,
                newTransaction: false,
                rightMenu: {
                    horizontal: false,
                    list: [{
                        type: "link",
                        name: this.$t('pages.summary.rightMenu.summary'),
                        link: "/"
                    }, {
                        type: "link",
                        name: this.$t('pages.summary.rightMenu.walletSettings'),
                        link: "/wallet/settings"
                    }]
                },
                changeWalletResult: false,
                totalTransactions: 0,
                startingTransactions: 0,
                resetSearch: false,
            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'transactions',
                'dateTransactions',
                'lengthWalletList',
                'walletStatus',
                'currentWallet',
                'transactionStatus',
                'transactionsLazyStatus',
                'currentWalletHaveTransactions',
                'dateFrom',
                'dateTo',
                'searchText',
                'confirmationChangeEmailStatus',
                'cancellationChangeEmailStatus'
            ]),

            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },
            checkLoadingSpinner: function () {
                if (this.transactionsLazyStatus !== 'success' && (this.transactions.length !== 0 ||
                    this.transactionsLazyStatus === 'success'))
                    return true;

                return false;
            },

            currentDateTransactions: function () {
                if (this.dateFrom && this.dateTo) {
                    let dateFrom = this.dateFrom.getTime(),
                        dateTo = this.dateTo.getTime();

                    return this.transactions.filter(item => {
                        return item.timestamp >= dateFrom && item.timestamp <= dateTo;
                    });
                }
                return [];
            },
            getActivity: function () {
                if (this.searchText) {
                    return this.currentDateTransactions.filter(item => {
                        return this.currentWallet.address === item.walletAddress ? item.walletDestination.toLowerCase().includes(this.searchText.toLowerCase()) :
                            item.walletAddress.toLowerCase().includes(this.searchText.toLowerCase())
                    })
                }
                return this.currentDateTransactions;
            },
        },
        methods: {
            openModal: function (name) {
                this.$modal.show(name);
            },
            resetFilter: function () {
                this.$store.dispatch('setFilterDate').then(() => {
                    console.log('Success set filter date');
                }).catch(() => {
                    console.log('Error set filter date');
                });

                this.$store.dispatch('setSearchText',
                    ''
                ).then(() => {
                    this.resetSearch = true;
                    console.log('Success set search text');
                }).catch(() => {
                    console.log('Error set search text');
                });
            },
        },
        created() {
            if (this.wallets.length === 0) {
                this.$store.dispatch('zeroingOutCurrentWallet'
                ).then(() => {
                    console.log('Success zeroing out current wallet');
                }).catch(() => {
                    console.log('Error zeroing out current wallet');
                });
            }

            this.$on('changeTotalTransactions', val => {
                this.totalTransactions = val;
            });

            this.$on('changeStartingTransactions', val => {
                this.startingTransactions = val;
            });

        },
        mounted() {
            if (this.lengthWalletList === 0) {
                this.openModal('selectLanguage');//z
                // this.openModal('newwallet');//z
            }

            this.$on('resetNewTransactions', val => {
                if (!val) {
                    this.newTransaction = false;
                }
            });

            this.$on('changeDateFrom', function (from) {
                this.dateFrom = from;
            });

            this.$on('changeDateTo', function (to) {
                this.dateTo = to;
            });

            this.$on('successResetSearchToTool', function () {
                this.resetSearch = false;
            });

            if (this.confirmationChangeEmailStatus === 'success') {
                this.$store.dispatch('resetConfirmationChangeEmailStatus'
                ).then(() => {
                    this.$toasted.show(this.$t('modals.success.changeAddr'), {
                        duration: 5000,
                        type: 'success',
                    });
                }).catch(() => {
                    this.$toasted.show(this.$t('modals.error.changeAddr'), {
                        duration: 10000,
                        type: 'error',
                    });
                });
            }

            if (this.cancellationChangeEmailStatus === 'success') {
                this.$store.dispatch('resetCancellationChangeEmailStatus'
                ).then(() => {
                    this.$toasted.show(this.$t('modals.success.cancelChangeAddr'), {
                        duration: 5000,
                        type: 'success',
                    });
                }).catch(() => {
                    this.$toasted.show(this.$t('modals.error.cancelChangeAddr'), {
                        duration: 10000,
                        type: 'error',
                    });
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    // .wrap-spinner
    //     margin-top 33vh

    //     img
    //         margin-top 0

</style>
