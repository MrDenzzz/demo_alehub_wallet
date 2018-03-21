<template>
    <div class="wallet">
        <Navbar
                :title="$t('pages.summary.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"
        />
        <section class="main" style="height: 100%;">

            <Wallets-list
                    :new-wallets="wallets"
            />
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="stats-balance">
                                <div class="stats-col">
                                    <div>
                                        <button class="buttons btn-yellow" @click="openModal('send')">
                                            <img :src="getIcon('send')" width="18" height="15" class="icon">
                                            {{ $t('pages.summary.buttons.send') }}
                                        </button>
                                        <button class="buttons btn-default" @click="openModal('request')">
                                            <img :src="getIcon('receive')" width="18" height="15" class="icon">
                                            {{ $t('pages.summary.buttons.request') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!--<Spinner v-if="isLoader"/>  &lt;!&ndash; переписать спиннер &ndash;&gt;-->


                            <!--{{ this.$store.state.Transactions.transactions }}-->


                            <Search-panel
                                    v-if="getActivity.length !== 0"
                                    :check-activities="getActivity.length"
                                    :current-transactions="currentTmpTransactions"
                                    :total-transactions="totalTransactions"
                                    :starting-transactions="startingTransactions"
                            />

                            <Activity-list
                                    v-if="getActivity.length !== 0"
                                    :activities="getActivity"
                                    :is-show-date="true"
                                    :change-wallet-result="changeWalletResult"
                                    :new-transaction="newTransaction"
                                    :loader="transactionsLoader"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="flex-block-transaction"
                                 :class="{'m-t-center': transactions.length === 0}"
                                 v-if="getActivity.length === 0 && !transactionsLoader">
                                <p class="absence-transactions">No transactions found</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Modal-send/>
        <Modal-request/>
        <New-wallet/>
    </div>
</template>

<script>
    import Navbar from "./layouts/Navbar";
    import WalletsList from "./layouts/WalletsList";
    import ActivityList from "./layouts/ActivityList";
    import ModalSend from "./modals/Send";
    import ModalRequest from "./modals/Request";
    import PanelHeading from "./layouts/PanelHeading";
    import NewWallet from './modals/NewWallet';
    import SearchPanel from './layouts/SearchPanel';
    import Datepicker from 'vuejs-datepicker';
    import TransactionsFilter from './layouts/TransactionsFilter';
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
            ModalSend,
            ModalRequest,
            PanelHeading,
            NewWallet,
            SearchPanel,
            Datepicker,
            TransactionsFilter,
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
                'walletTransactions',
                'transactionsFilter',
                'lengthWalletList',
                'walletStatus',
                'currentWallet'
            ]),

            getTransactions: function () {
                if (this.currentWallet !== null) {
                    this.$store.dispatch('walletsRequestLazy').then(() => {
                        this.$store.dispatch('transactionsRequestLazy', this.currentWallet !== null ? this.currentWallet.address : '').then(() => {
                        });
                    });
                }
            },


            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            },

            transactionsLoader: function () {
                return this.$store.state.Transactions.transactionsLoader;
            },


            //
            // currentTransactions: function () {
            //     return this.transactions;
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


            currentTransactions1: function () {
                this.$store.dispatch('walletTransactions', this.currentWallet.address).then(() => {

                });
            },

            openModal: function (name) {
                this.$modal.show(name);
            },

            getIcon: function (name) {
                if (this.selectedTheme === 'dark') return require(`../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === 'white') return require(`../assets/img/${name}_dark.svg`);
                else return require(`../assets/img/${name}.svg`);
            },

            // initiateDate: function () {
            //
            //     this.dateFrom = new Date(this.transactions.reduce(
            //         (acc, loc) =>
            //             acc.timestamp < loc.timestamp
            //                 ? acc
            //                 : loc
            //     ).timestamp);
            //     this.dateFrom.setHours(0);
            //     this.dateFrom.setMinutes(0);
            //     this.dateFrom.setSeconds(0);
            //     this.dateFrom.setMilliseconds(0);
            //
            //     this.dateTo = new Date();
            //     this.dateTo.setHours(23);
            //     this.dateTo.setMinutes(59);
            //     this.dateTo.setSeconds(59);
            //     this.dateTo.setMilliseconds(999);
            // },

            changeSelectedWallet: function (address) {
                this.changeTransactionLoaderState(true);
                this.$http.get(`${this.$host}/transactions/${address}`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json',
                        'Authorization': localStorage.getItem(sha256('user-token'))
                    }
                }).then(response => {
                    this.addNewTransactions(response.body);
                    this.changeTransactionLoaderState(false);
                }, response => {
                    console.log('error', response);
                });
            },
        },
        created() {

            // let _this = this;
            // this.setIntervalId = setInterval(this.getTransactions, 15000);

            //переписать каррент трансекшинс в
            this.currentTransactions1();

            // if (this.transactions.length !== 0) {
            //     this.initiateDate();
            // }

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
            if (this.lengthWalletList === 0) {
                this.openModal('newwallet');
            }

            //переписать название функции sendMoney на что нибудь более подходящее; переписать названия мутаций тоже
            this.$on('sendMoney', function (data) {

                let checkFirstTransaction = false;
                if (this.transactions.length === 0) {
                    checkFirstTransaction = true;
                }

                this.sendMoneyToAdress(data);
                this.setNotificationForSend(data);
                this.setNotificationForSendToProfile(this.transactions[this.transactions.length - 1]);
                this.newTransaction = true;

                if (checkFirstTransaction) {
                    this.initiateDate();
                }
            });

            this.$on('successCopyAddress', function (wallet) {
                this.$modal.hide('request');
                this.$toasted.show(`Address ${wallet} was copied to the clipboard`, {
                    duration: 5000,
                    type: 'success',
                });
            });

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

            this.$on('changeWallet', function (val, address) {
                if (val && this.transactions.length !== 0) {
                    this.changeWalletResult = true;
                }
                this.changeSelectedWallet(address);
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


            this.currentTransactions1();

            console.log(this.walletTransactions, 'this.walletTransactions');
        }
    }
</script>

<style lang="stylus" scoped>
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
