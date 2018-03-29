<template>
    <div class="activityList">
        <!--<loader v-if="loader" />-->
        <div v-if="!loader" v-for="(activity, activityIndex) in activities" :key="activityIndex" class="activityListBlock">
            <Panel-heading :title="showDate(activity.timestamp)" v-if="checkShow(activityIndex) && isShowDate"/>
            <div class="activity-list">
                <div class="status sent" v-if="typeTransaction(activity.walletAddress)">
                    <span>{{ $t('pages.summary.activityList.status.sent') }}</span>
                </div>
                <div v-else class="status received">
                    <span>{{ $t('pages.summary.activityList.status.recieved') }}</span>
                </div>
                <div class="details" :class="{ 'sent': typeTransaction(activity.walletAddress), 'received': !typeTransaction(activity.walletAddress) }">
                    <div class="info">
                        <p v-if="typeTransaction(activity.walletAddress)">{{ $t('pages.summary.activityList.to') }} {{ activity.walletDestination }}</p>
                        <p v-else>{{ $t('pages.summary.activityList.from') }} {{ activity.walletAddress }}</p>
                        <p>{{ parseDate(activity.timestamp) }} / {{ parseTime(activity.timestamp) }}</p>
                    </div>
                    <div class="purpose">
                        <div>
                            Purpose transaction
                        </div>
                    </div>
                    <div class="count" :class="{ 'active': !typeTransaction(activity.walletAddress) }">
                        <span>{{ activity.count }} ALE</span>
                    </div>
                </div>
            </div>
        <div class="result-day" v-if="checkShowResultActivityPanel(activityIndex)">

            <div class="result-day-col">
                    <div class="result-day-status">
                        <span class="result-day-field">
                            {{ $t('pages.summary.activityList.resultDay.received') }}
                        </span>
                    </div>
                    <div class="result-day-status">
                        <span class="result-day-field">
                            {{ $t('pages.summary.activityList.resultDay.sent') }}
                        </span>
                    </div>
                    <div class="result-day-status">
                        <span class="result-day-field">
                            {{ $t('pages.summary.activityList.resultDay.total') }}
                        </span>
                    </div>
                </div>
                <div class="result-day-col">
                    <div class="result-day-line">
                        <span class="result-day-span">
                            <span class="count">
                                <FormattingPrice
                                        :value="resultReceived(activity.timestamp)"
                                />
                            </span>
                            ALE
                        </span>
                    </div>
                    <div class="result-day-line">
                        <span class="result-day-span sent">
                            <span class="count">
                                 <FormattingPrice
                                         :value="resultSent(activity.timestamp)"
                                 />
                            </span>
                            ALE
                        </span>
                    </div>
                    <div class="result-day-line">
                        <span class="result-day-span">
                            <span class="count">
                                <FormattingPrice
                                        :value="resultTotal(activity.timestamp)"
                                />
                            </span>
                            ALE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PanelHeading from './PanelHeading';
    import Moment from 'moment';
    import FormattingPrice from './FormattingPrice';
    import Loader from './Spinner'

    import {mapMutations} from 'vuex';

    export default {
        name: 'activityList',
        components: {
            PanelHeading,
            FormattingPrice,
            Loader
        },
        props: {
            activities: {
                type: Array,
                required: true
            },
            isShowDate: {
                type: Boolean,
                required: false
            },
            changeWalletResult: {
                type: [Boolean, String]
            },
            newTransaction: {
                type: [Boolean, String]
            },
            loader: {
                type: Boolean
            }
        },
        watch: {
            'changeWalletResult': function (val) {
                if (val) {
                    this.setChunkTransactions(this.chunkActivities);
                    this.$parent.$emit('resetWalletResult', false);
                }
            },
            'newTransaction': function (val) {
                if (val) {
                    this.setChunkTransactions(this.chunkActivities);
                    this.$parent.$emit('resetNewTransactions', false);
                }
            }
        },
        computed: {
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            currentBalance: function () {
                return this.currentWallet.balance;
            },
            stateChunkTransactions: function () {
                return this.$store.state.Transactions.chunkTransactions;
            },
            chunkActivities: function () {
                let chunksActivities = [];
                let chunk = [];
                let j = 0;
                for (let i = 0; i < this.activities.length; i++) {
                    if (i === 0) {
                        chunk.push(this.activities[i]);
                    } else if (Moment(this.activities[i].timestamp).format('YYYY/MM/DD') === Moment(this.activities[i - 1].timestamp).format('YYYY/MM/DD')) {
                        chunk.push(this.activities[i]);
                    } else {
                        j++;
                        chunksActivities.push(chunk);

                        chunk = [];
                        chunk.push(this.activities[i]);
                    }
                }

                chunksActivities.push(chunk);

                return chunksActivities;
            },
        },
        methods: {
            ...mapMutations({
                setChunkTransactions: 'SET_CHUNK_TRANSACTIONS'
            }),

            currentTransactions: function (date) {
                return this.activities.filter(item => {
                    let itemDate = Moment(item.timestamp).format('YYYY/MM/DD');
                    return itemDate === Moment(date).format('YYYY/MM/DD');
                });
            },

            transactionsForTotal (date) {
                let absolutDate = Number(Moment(Moment(date).format('YYYY/MM/DD')).format('x')) + (24*60*60*1000);
                return this.activities.filter(item => {
                    return absolutDate > item.timestamp;
                })
            },

            resultSentForTotal: function (date) {
                let sent = 0,
                    transactions = this.transactionsForTotal(date);
                for (let i = 0; i < transactions.length; i++) {
                    if (this.typeTransaction(transactions[i].walletAddress)) {
                        sent += transactions[i].count;
                    }
                }
                return sent
            },

            resultReceivedForTotal: function (date) {
                let received = 0,
                    transactions = this.transactionsForTotal(date);
                for (let i = 0; i < transactions.length; i++) {
                    if (!this.typeTransaction(transactions[i].walletAddress)) {
                        received += transactions[i].count;
                    }
                }
                return received;
            },

            resultTotal: function (date) {
                let transactions = this.activities;
                return transactions[transactions.length-1].balanceInfo.before + this.resultReceivedForTotal(date) - this.resultSentForTotal(date)
            },

            resultSent: function (date) {
                let sent = 0,
                    transactions = this.currentTransactions(date);
                for (let i = 0; i < transactions.length; i++) {
                    if (this.typeTransaction(transactions[i].walletAddress)) {
                        sent += transactions[i].count;
                    }
                }
                return sent
            },

            resultReceived: function (date) {
                let received = 0,
                    transactions = this.currentTransactions(date);
                for (let i = 0; i < transactions.length; i++) {
                    if (!this.typeTransaction(transactions[i].walletAddress)) {
                        received += transactions[i].count;
                    }
                }
                return received;
            },

            parseTime(date) {
                return Moment(date).format('HH:mm');
            },

            parseDate(date) {
                return Moment(date).format('MMM DD');
            },

            checkShow(index) {
                if (index === 0) return true;
                if (index === this.activities.length) {
                    if (Moment(this.activities[index].timestamp).format('YYYY/MM/DD') === Moment(this.activities[index + 1].timestamp).format('YYYY/MM/DD')) return false;
                    return true;
                } else {
                    if (Moment(this.activities[index].timestamp).format('YYYY/MM/DD') === Moment(this.activities[index - 1].timestamp).format('YYYY/MM/DD')) return false;
                    return true;
                }
            },
            checkShowResultActivityPanel: function (index) {
                let currentDay = new Date(this.activities[index].timestamp);
                if (index !== this.activities.length - 1) {
                    let nextDay = new Date(this.activities[index + 1].timestamp);

                    if (currentDay.getDay() === nextDay.getDay() && currentDay.getMonth() === nextDay.getMonth() &&
                        currentDay.getFullYear() === nextDay.getFullYear()) {
                        return false;
                    }
                }
                return true;
            },

            showDate: function (date) {
                let currentDate = new Date();
                let yesterdayDate = new Date();
                yesterdayDate = yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                if (Moment(date).format('YYYY/MM/DD') === Moment(currentDate).format('YYYY/MM/DD')) {
                    return 'today';
                }
                if (Moment(date).format('YYYY/MM/DD') === Moment(yesterdayDate).format('YYYY/MM/DD')) {
                    return 'yesterday'
                }
                return Moment(date).format('MM/DD');
            },

            typeTransaction: function (address) {
                if(address === this.$store.state.Wallets.currentWallet.address) return true;
                return false;
            }
        },
        created() {
            this.setChunkTransactions(this.chunkActivities);
        },
        mounted() {
            // this.setChunkTransactions(this.chunkActivities);
        }
    }
</script>

<style lang="scss">

    .reset-style {
        /*padding: 0 !important;*/
        /*margin: 0 !important;*/
    }

    .activity-list {
        & .status {
            min-width: 150px;

            & span {
                color: #34343e;
                text-transform: uppercase;
            }
        }
        & .details {
            margin: 0;
            padding-right: 16px;
            padding-left: 0;

            & .count {
                background-color: transparent;
                display: flex;
                justify-content: flex-end;
                min-width: 100px;

                & .count-received, .count-total {
                    color: #0d1717 !important;

                    & span {
                        color: #0d1717 !important;
                    }
                }

                & span {
                    color: #b10303 !important;
                }
            }
            & .count.active {
                background-color: transparent !important;
                & span {
                    color: #34343e !important;
                }
            }

            & .info {
                min-width: 380px;
                word-break: break-all;
            }

            & .purpose {
                width: 100%;
                display: flex;
                color: #34343e;
                justify-content: flex-start;
                font-family: MuseoSansCyrl500;

                & div {
                    font-weight: 500;
                }
            }

            & .info, & .count {
                -webkit-touch-callout: text;
                -webkit-user-select: text;
                -khtml-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
            }
        }
    }

    .activityListBlock {

        & .result-day {
            display: flex;
            justify-content: flex-end;
            margin: 16px 16px 0 0;

            & .result-day-col {
                font-family: MuseoSansCyrl500;
                color: #34343e;
                display: flex;
                flex-direction: column;
                align-self: flex-end;

                & .result-day-status {
                    /*margin-bottom: 5px;*/
                    font-size: 14px;
                    padding: 5px;

                    & .result-day-field {
                        margin: 0 10px 0 10px;
                        padding: 5px;
                    }
                }

                & .result-day-line {
                    font-family: MuseoSansCyrl500;
                    line-height: 1.4;
                    align-self: flex-end;
                    color: #34343e;
                    font-weight: 500;
                    font-size: 14px;
                    // margin-bottom: 5px;
                    padding: 4px;

                    & .result-day-span {
                        margin: 0 10px 0 10px;
                        padding: 0 5px;

                        & .count {
                            margin: 0 10px 0 10px;
                            padding: 0 5px;
                        }
                    }

                    & .sent {
                        color: #b10303;
                    }
                }
            }

        }

        & .activity-list {
            background: inherit;
            margin-bottom: 6px;

            & .received {
                background-color: rgba(255, 210, 79, 0.6) !important;
            }

            & .sent {
                background-color: #f0f0f0 !important;
            }
        }

        &:nth-child(odd) {
            & .activity-list {
                background: inherit;
            }
        }

        &:nth-child(even) {
            & .activity-list {
                background: #f0f0f0;
            }
        }

        &:nth-child(1) {
            & .activity-list {
                background: #f0f0f0;
            }
        }
    }

    @media screen and (max-width: 1130px) {
        .activity-list {
            & .details {
                & .info {
                    word-break: break-all;
                    min-width: 220px;
                    padding-right: 30px;
                }
                & .purpose {
                    max-width: 90px;
                }
            }
        }
    }
    @media screen and (max-width: 600px) {
        .activityListBlock {
            & .result-day {
                margin-right: 0;
            }
            & .activity-list {
                display: flex;
                flex-direction: column;
            }
        }
        .activity-list {
            & .status {
                width: 100%;
                height: 40px;
            }
            & .details {
                padding-left: 30px;
                display: flex;
                flex-direction: column;
                position: relative;
                & .count {
                    align-self: flex-end;
                    position: absolute;
                    bottom: 0;
                    & span {
                        margin: 0;
                        padding: 0;
                    }
                }
                & .info {
                    align-self: flex-start;
                    min-width: 200px;
                    & p {
                        margin-bottom: 10px;
                    }
                }
                & .purpose {
                    display: none;
                }
            }
        }
    }
</style>
