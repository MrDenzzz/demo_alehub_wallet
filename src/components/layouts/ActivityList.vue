<template>
    <div class="activityList">
        <div
                v-for="(activity, activityIndex) in activities"
                :key="activityIndex" class="activityListBlock">
            <panel-heading
                    :title="showDate(activity.timestamp)"
                    v-if="checkShow(activityIndex) && isShowDate"/>
            <div class="activity-list">
                <div class="status sent" v-if="typeTransaction(activity.walletAddress)">
                    <span>{{ $t('pages.summary.activityList.status.sent') }}</span>
                </div>
                <div v-else class="status received">
                    <span>{{ $t('pages.summary.activityList.status.recieved') }}</span>
                </div>
                <div
                        class="details"
                        :class="{ 'sent': typeTransaction(activity.walletAddress), 'received': !typeTransaction(activity.walletAddress) }">
                    <div class="info">
                        <p v-if="typeTransaction(activity.walletAddress)">
                            {{ $t('pages.summary.activityList.to') }} {{ activity.walletDestination }}
                        </p>
                        <p v-else>
                            {{ $t('pages.summary.activityList.from') }} {{ activity.walletAddress }}
                        </p>
                        <p>
                            {{ parseDate(activity.timestamp) }} / {{ parseTime(activity.timestamp) }}
                        </p>
                    </div>
                    <div class="purpose">
                        <div>
                            {{ $t('pages.summary.activityList.purpose') }}
                        </div>
                    </div>
                    <div
                            class="count"
                            :class="{ 'active': !typeTransaction(activity.walletAddress) }">
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
                                <formatting-price
                                        :value="resultReceived(activity.timestamp)"
                                />
                            </span>
                            ALE
                        </span>
                    </div>
                    <div class="result-day-line">
                        <span class="result-day-span sent">
                            <span class="count">
                                 <formatting-price
                                         :value="resultSent(activity.timestamp)"
                                 />
                            </span>
                            ALE
                        </span>
                    </div>
                    <div class="result-day-line">
                        <span class="result-day-span">
                            <span class="count">
                                <formatting-price
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

    import {mapGetters} from 'vuex';

    export default {
        name: 'activityList',
        components: {
            PanelHeading,
            FormattingPrice,
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
            }
        },
        computed: {
            ...mapGetters([
                'currentWallet'
            ]),
        },
        methods: {
            currentTransactions: function (date) {
                return this.activities.filter(item => {
                    let itemDate = Moment(item.timestamp).format('YYYY/MM/DD');
                    return itemDate === Moment(date).format('YYYY/MM/DD');
                });
            },

            transactionsForTotal (date) {
                let absoluteDate = Number(Moment(Moment(date).format('YYYY/MM/DD')).format('x')) + (24*60*60*1000);
                return this.activities.filter(item => {
                    return absoluteDate > item.timestamp;
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

            parseTime: function (date) {
                return Moment(date).format('HH:mm');
            },

            parseDate: function (date) {
                return Moment(date).format('MMM DD');
            },

            checkShow: function (index) {
                if (index === 0)
                    return true;
                if (index === this.activities.length) {
                    if (Moment(this.activities[index].timestamp).format('YYYY/MM/DD') === Moment(
                        this.activities[index + 1].timestamp).format('YYYY/MM/DD')) return false;
                    return true;
                } else {
                    if (Moment(this.activities[index].timestamp).format('YYYY/MM/DD') === Moment(
                        this.activities[index - 1].timestamp).format('YYYY/MM/DD')) return false;
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
                    return this.$t('pages.summary.activityList.today');
                }
                if (Moment(date).format('YYYY/MM/DD') === Moment(yesterdayDate).format('YYYY/MM/DD')) {
                    return this.$t('pages.summary.activityList.yesterday');
                }
                return Moment(date).format('MM/DD');
            },

            typeTransaction: function (address) {
                if(address === this.currentWallet.address)
                    return true;
                return false;
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>

