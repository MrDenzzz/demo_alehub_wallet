<template>
    <div class="wallet">
        <navbar
                :title="$t('pages.summary.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"
        />
        <section class="main">

            <wallets-list
                    :new-wallets="wallets"
            />
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="stats-balance">
                                <div class="stats-col">
                                    <send-request v-if="getActivity.length === 0 && transactionsLazyStatus === 'success'"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div v-if="transactionsLazyStatus !== 'success'" class="wrap-spinner">
                                <Spinner />
                            </div>

                            <transactions-tool-panel
                                    v-if="getActivity.length !== 0 && transactionsLazyStatus === 'success'"
                                    :check-activities="getActivity.length"
                                    :current-transactions="currentTmpTransactions"
                                    :total-transactions="totalTransactions"
                                    :starting-transactions="startingTransactions"
                            />

                            <activity-list
                                    v-if="getActivity.length !== 0 && transactionsLazyStatus === 'success'"
                                    :activities="getActivity"
                                    :is-show-date="true"
                                    :change-wallet-result="changeWalletResult"
                                    :new-transaction="newTransaction"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="flex-block-transaction"
                                 :class="{'m-t-center': transactions.length === 0}"
                                 v-if="getActivity.length === 0 && transactionsLazyStatus === 'success'">

                                <p class="absence-transactions">No transactions found</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <new-wallet/>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import WalletsList from './layouts/WalletsList';
    import ActivityList from './layouts/ActivityList';
    import PanelHeading from './layouts/PanelHeading';
    import NewWallet from './modals/NewWallet';
    import SendRequest from './layouts/SendRequest';
    import TransactionsToolPanel from './layouts/TransactionsToolPanel';
    import FormattingPrice from './layouts/FormattingPrice';
    import Spinner from './layouts/Spinner';
    import Moment from 'moment';

    import sha256 from 'sha256';


    import {mapMutations} from "vuex";
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
            Spinner
        },
        data() {
            return {
                isSuccessNotif: true,
                dateFrom: null,
                dateTo: null,
                placeholderDateFrom: 'Date from',
                placeholderDateTo: 'Date to',
                newTransaction: false,
                rightMenu: {
                    horizontal: false,
                    list: [{
                        type: "link",
                        name: this.$t('pages.summary.rightMenu.summary'),
                        link: "/wallet"
                    }, {
                        type: "link",
                        name: this.$t('pages.summary.rightMenu.walletSettings'),
                        link: "/wallet/settings"
                    }]
                },
                searchText: '',
                changeWalletResult: false,
                totalTransactions: 0,
                startingTransactions: 0,
                isLoader: false
            }
        },
        watch: {},
        computed: {
            ...mapGetters([
                'wallets',
                'transactions',
                'transactionsFilter',
                'lengthWalletList',
                'walletStatus',
                'currentWallet',
                'transactionStatus',
                'transactionsLazyStatus'
            ]),

            // getTransactions: function () {
            //     if (this.currentWallet !== null) {
            //         this.$store.dispatch(
            //             'walletsRequestLazy'
            //         ).then(() => {
            //             this.$store.dispatch('transactionsRequestLazy',
            //                 this.currentWallet !== null ? this.currentWallet.address : ''
            //             ).then(() => {
            //
            //             }).catch(() => {
            //
            //             });
            //         }).catch(() => {
            //
            //         });
            //     }
            // },


            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },

            // transactionsLoader: function () {
            //     return this.$store.state.Transactions.transactionsLoader;
            // },

            currentTmpTransactions: function () {
                if (this.dateFrom && this.dateTo) {
                    let dateFrom = this.dateFrom.getTime(),
                        dateTo = this.dateTo.getTime();

                    return this.transactions.filter(item => {
                        return item.date >= dateFrom && item.date <= dateTo;
                    });
                }
                return [];
            },


            getFilteredActivity: function () {

                let list = this.transactions.slice().sort((a, b) => {
                    return a.transactions - b.transactions;
                }).reverse();


                let activity = [];
                for (let i = 0; i < list.length; i++) {
                    let findActivity = this.transactionsFilter.find(item => {
                        return list[i]._id === item._id;
                    });
                    if (findActivity !== undefined) {
                        activity.push(findActivity)
                    }
                }
                return activity;
            },
            getActivity: function () {
                //return this.$store.state.Transactions.transactions;
                if (this.searchText) {
                    return this.getFilteredActivity.filter(item => {
                        return this.currentWallet.address === item.walletAddress ? item.walletDestination.toLowerCase().includes(this.searchText.toLowerCase()) :
                            item.walletAddress.toLowerCase().includes(this.searchText.toLowerCase())
                    })
                }
                return this.getFilteredActivity;
            },
        },
        methods: {
            ...mapMutations({
                changeWallet: "CHANGE_SELECTED_WALLET",
                sendMoneyToAdress: "SEND_MONEY_TO_ADDRESS",
                changeNewWallet: 'CHANGE_NEW_WALLET',
                setNotificationForSend: 'SET_NOTIFICATION_FOR_SEND',
                setNotificationForSendToProfile: 'SET_NOTIFICATION_FOR_SEND_TO_PROFILE',
                setDefaultChart: 'SET_DEFAULT_CHARTS',
                setActivePeriod: 'SET_ACTIVE_PERIOD',

                changeActiveFilter: "CHANGE_ACTIVE_FILTER",
                searchTransaction: "CHANGE_FILTER_TEXT",
                setDateFrom: 'SET_DATE_FROM',
                setDateTo: 'SET_DATE_TO',
                addNewTransactions: 'ADD_NEW_TRANSACTION',
                changeTransactionLoaderState: 'CHANGE_TRANSACTION_LOADER_STATE'
            }),


            // currentTransactions1: function () {
            //     this.$store.dispatch('walletTransactions', this.currentWallet.address).then(() => {
            //
            //     }).catch(() => {
            //
            //     });
            // },

            openModal: function (name) {
                this.$modal.show(name);
            },
        },
        created() {

            // let _this = this;
            // this.setIntervalId = setInterval(this.getTransactions, 15000);

            //переписать каррент трансекшинс в
            // if (this.currentWallet) {
            //     this.currentTransactions1();
            // }

            if (this.wallets.length === 0) {
                this.$store.dispatch('zeroingOutCurrentWallet'
                ).then(() => {
                    console.log('Success zeroing out current wallet');
                }).catch(() => {
                    console.log('Error zeroing out current wallet');
                });
            };

            this.$on('changeTotalTransactions', val => {
                this.totalTransactions = val;
            });

            this.$on('changeStartingTransactions', val => {
                this.startingTransactions = val;
            });

        },
        mounted() {

            this.setIntervalId = setInterval(this.getTransactions, 15000);

            // if (this.lengthWalletList === 0 && this.walletStatus === 'success') {

            console.log(this.wallets, 'this.wallets');
            console.log(this.lengthWalletList, 'this.lengthWalletList');

            if (this.lengthWalletList === 0) {
                this.openModal('newwallet');
            }

            //переписать название функции sendMoney на что нибудь более подходящее; переписать названия мутаций тоже
            // this.$on('sendMoney', function (data) {
            //
            //     let checkFirstTransaction = false;
            //     if (this.transactions.length === 0) {
            //         checkFirstTransaction = true;
            //     }
            //
            //     this.sendMoneyToAdress(data);
            //     this.setNotificationForSend(data);
            //     this.setNotificationForSendToProfile(this.transactions[this.transactions.length - 1]);
            //     this.newTransaction = true;
            //
            //     if (checkFirstTransaction) {
            //         this.initiateDate();
            //     }
            // });

            this.$on('setPeriod', function (period) {
                this.setActivePeriod(period);
                if (period !== "alltime") this.setDefaultChart(period);
            });

            this.$on('changeFilterType', function (index) {
                this.changeActiveFilter(index);
            });

            this.$on('searchTransaction', function (searchText) {
                this.searchTransaction(searchText);
                this.searchText = searchText;
            });

            this.$on('changeCurrentWalletEmit', function (address) {

                localStorage.setItem(sha256('current-wallet'), this.currentWallet.address);

                this.$store.dispatch('transactionsRequestLazy',
                    address
                ).then(() => {
                    console.log('Transactions for the current wallet were successfully received');
                }).catch(() => {
                    console.log(err, 'Get transactions for current wallet impossible');
                });

            });

            this.$on('resetWalletResult', val => {
                if (!val) {
                    this.changeWalletResult = false;
                }
            });

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
        }
    }
</script>

<style lang="stylus" scoped>
    .wrap-spinner
        display flex
        justify-content center
        align-items center
        padding 1em 0
        margin-top 33vh

        img
            margin-top 0

    .main
        height 100%

    .result-opt-span.sent
        color #b10303

    .stats-col
        display flex
        flex-direction column

    .stats-balance
        font-size 14px
        font-family MuseoSansCyrl500
        color #34343e
        display flex
        justify-content space-between

        .result-opt-span
            align-self flex-end

        .title-opt-span
            align-self flex-start

    .result-opt-span, .count, .title-opt-span
        margin 0 10px 0 10px
        padding 5px

    .absence-transactions
        font-size 14px
        font-family MuseoSansCyrl500
        color #34343e

    .empty-notif
        background-color #f0f0f0
        padding 5px
        p
            opacity 0.7
            font-family MuseoSansCyrl500
            font-size 16px
            font-weight 500
            line-height 1.25
            text-align center
            color #34343e

    .flex-block-transaction
        display flex
        justify-content center

    .m-t-center
        margin-top 30vh

    @media (max-width: 600px)
        .stats-col
            margin 0 auto

    @media (max-width: 375px)
        .stats-col
            width 100%

        .buttons
            width 100%
</style>
