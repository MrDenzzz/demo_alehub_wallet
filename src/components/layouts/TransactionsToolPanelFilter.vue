<template>
    <div class="bottom">
        <div class="date">
            <h3 class="date-title">
                {{ $t('pages.summary.searchPanel.dateRange') }}
            </h3>
            <div class="datepicker-wrap">
                <datepicker
                        id="datepickerFrom"
                        v-model="dateFromDatepicker"
                        language="en"
                        :placeholder="'Date from'"/>

                <datepicker
                        id="datepickerTo"
                        v-model="dateToDatepicker"
                        language="en"
                        :placeholder="'Date to'"/>
            </div>
        </div>
        <div class="docs">
            <button
                    class="buttons btn-default"
                    :class="{ 'disable-gray-button': currentTransactions.length === 0 }"
                    @click="openModal('download-pdf')"
                    :disabled="currentTransactions.length === 0">
                {{ $t('pages.summary.searchPanel.buttons.download') }}
            </button>
            <button
                    class="buttons btn-default"
                    :class="{ 'disable-gray-button': currentTransactions.length === 0 }"
                    @click="openModal('share-transactions')"
                    :disabled="currentTransactions.length === 0">
                {{ $t('pages.summary.searchPanel.buttons.share') }}
            </button>
        </div>
        <div class="info">
            <div class="stats-col">
                <div class="title-opt-span">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.received') }}
                        </span>
                </div>
                <div class="title-opt-span sent">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.sent') }}
                        </span>
                </div>
                <div class="title-opt-span">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.starting') }}
                        </span>
                </div>
                <div class="title-opt-span">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.total') }}
                        </span>
                </div>
            </div>
            <div class="stats-col">
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price :value="currentReceivedBalance"/>
                        </span>
                    ALE
                </div>
                <div class="result-opt-span sent">
                        <span class="count">
                            <formatting-price :value="currentSentBalance"/>
                        </span>
                    ALE
                </div>
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price :value="currentBalanceBeginPeriod"/>
                        </span>
                    ALE
                </div>
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price :value="currentBalanceEndPeriod"/>
                        </span>
                    ALE
                </div>
            </div>
        </div>

        <modal-share-transactions/>
        <modal-download-p-d-f
                :current-balance-begin-period="currentBalanceBeginPeriod"
                :current-balance-end-period="currentBalanceEndPeriod"
                :current-received-balance="currentReceivedBalance"
                :current-sent-balance="currentSentBalance"/>

    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import FormattingPrice from '../layouts/FormattingPrice';
    import ModalShareTransactions from '../modals/ShareTransactions';
    import ModalDownloadPDF from '../modals/DownloadPDF';

    import {mapGetters} from 'vuex';

    export default {
        name: 'transactions-tool-panel-filter',
        components: {
            Datepicker,
            FormattingPrice,
            ModalShareTransactions,
            ModalDownloadPDF
        },
        props: {
            currentTransactions: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                dateFromDatepicker: '',
                dateToDatepicker: ''
            }
        },
        watch: {
            dateFromDatepicker: function (val) {
                this.$store.dispatch('changeDateFrom',
                    val
                ).then(() => {

                }).catch(() => {

                });
            },
            dateToDatepicker: function (val) {
                this.$store.dispatch('changeDateTo',
                    val
                ).then(() => {

                }).catch(() => {

                });
            }
        },
        computed: {
            ...mapGetters([
                'transactions',
                'currentWallet',
                'dateFrom',
                'dateTo'
            ]),
            currentBalanceBeginPeriod: function () {
                this.watchResetStateDate();
                return (this.currentTransactions.length !== 0) ? this.currentTransactions[this.currentTransactions.length - 1].balanceInfo.before : 0;
            },
            currentBalanceEndPeriod: function () {
                return (this.currentTransactions.length !== 0) ? this.currentTransactions[0].balanceInfo.after : 0;
            },
            currentSentBalance: function () {
                let sentTransactions = this.currentTransactions.filter(item => {
                    return item.balanceInfo.after - item.balanceInfo.before < 0;
                });

                if (sentTransactions.length > 1) {
                    let sum = 0;
                    for (let i = 0; i < sentTransactions.length; i++)
                        sum += sentTransactions[i].count;
                    return sum;
                } else if (sentTransactions.length === 1)
                    return sentTransactions[0].count;

                return 0;
            },
            currentReceivedBalance: function () {
                let receiveTransactions = this.currentTransactions.filter(item => {
                    return item.balanceInfo.after - item.balanceInfo.before > 0;
                });

                if (receiveTransactions.length > 1) {
                    let sum = 0;
                    for (let i = 0; i < receiveTransactions.length; i++)
                        sum += receiveTransactions[i].count;
                    return sum;

                } else if (receiveTransactions.length === 1)
                    return receiveTransactions[0].count;

                return 0;
            },
        },
        methods: {
            openModal: function (nameModal) {
                this.$modal.show(nameModal);
            },
            watchResetStateDate: function () {
                this.dateFromDatepicker = this.dateFrom;
                this.dateToDatepicker = this.dateTo;
            },
        },
        created() {
            this.dateFromDatepicker = this.dateFrom;
            this.dateToDatepicker = this.dateTo;
        },
    }
</script>