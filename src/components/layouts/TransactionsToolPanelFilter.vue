<template>
    <div class="bottom">
        <div class="date">
            <h3 class="date-title">
                {{ $t('pages.summary.searchPanel.dateRange') }}
            </h3>
            <div class="datepicker-wrap">
                <datepicker
                        id="datepickerFrom"
                        v-model="dateFrom"
                        language="en"
                        :placeholder="'Date from'"
                />

                <datepicker
                        id="datepickerTo"
                        v-model="dateTo"
                        language="en"
                        :placeholder="'Date to'"
                />
            </div>
        </div>
        <div class="docs">
            <button class="buttons btn-default">
                {{ $t('pages.summary.searchPanel.buttons.download') }}
            </button>
            <button class="buttons btn-default" @click="openModal('shareTransactions')">
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
                            <formatting-price
                                    :value="currentReceiveBalance()"
                            />
                        </span>
                    ALC
                </div>
                <div class="result-opt-span sent">
                        <span class="count">
                            <formatting-price
                                    :value="currentSentBalance()"
                            />
                        </span>
                    ALC
                </div>
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price
                                    :value="currentBalanceBeginPeriod()"
                            />
                        </span>
                    ALC
                </div>
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price
                                    :value="currentBalanceEndPeriod()"
                            />
                        </span>
                    ALC
                </div>
            </div>
        </div>

        <modal-share-transactions/>

    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import FormattingPrice from '../layouts/FormattingPrice';
    import ModalShareTransactions from '../modals/ShareTransactions';

    import {mapGetters} from 'vuex';

    export default {
        name: 'transactions-tool-panel-filter',
        components: {
            Datepicker,
            FormattingPrice,
            ModalShareTransactions
        },
        data() {
            return {
                dateFrom: null,
                dateTo: null
            }
        },
        computed: {
            ...mapGetters([
                'transactions',
                'currentWallet',
            ]),
            currentBalance: function () {
                return this.$store.state.Wallets.currentWallet.balance;
            }
        },
        methods: {
            openModal: function (name) {
                this.$modal.show(name);
            },
            initiateDate: function () {
                this.dateFrom = new Date(this.transactions.reduce(
                    (acc, loc) =>
                        acc.timestamp < loc.timestamp
                            ? acc
                            : loc
                ).timestamp);
                this.dateFrom.setHours(0);
                this.dateFrom.setMinutes(0);
                this.dateFrom.setSeconds(0);
                this.dateFrom.setMilliseconds(0);

                this.dateTo = new Date();
                this.dateTo.setHours(23);
                this.dateTo.setMinutes(59);
                this.dateTo.setSeconds(59);
                this.dateTo.setMilliseconds(999);
            },
            currentBalanceBeginPeriod: function () {
                console.log(this.transactions);
                return this.transactions[0].balanceInfo.before;
            },
            currentBalanceEndPeriod: function () {
                return this.transactions[this.transactions.length - 1].balanceInfo.after;
            },
            currentSentBalance: function () {
                let sentTransactions = this.transactions.filter(item => {
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
            currentReceiveBalance: function () {
                let receiveTransactions = this.transactions.filter(item => {
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
        created() {
            if (this.transactions.length !== 0) {
                this.initiateDate();
            }
        },
        mounted() {

        }
    }
</script>

<style lang="stylus">
    input#datepickerFrom, input#datepickerTo
        font-family MuseoSansCyrl500
        background inherit
        border none
        border-bottom 1px solid rgba(52, 52, 62, 0.2)
        width 80px
        margin-right 30px
        outline none
        font-size 14px
        font-weight 500
        line-height 1.29
        text-align left
        color #34343e
        position relative
        z-index 1

    #datepickerFrom, #datepickerTo
        cursor pointer

    #datepickerFrom::-webkit-input-placeholder, #datepickerTo::-webkit-input-placeholder
        opacity 1
        line-height 1.29
        font-size 14px

    .vdp-datepicker__calendar
        background-color #f7f7f7
        box-shadow 0 5px 20px 0 rgba(0, 0, 0, 0.12)
        border 0 !important
        padding 7px
        font-family MuseoSansCyrl500 !important

        header
            .next, .prev
                display flex
                justify-content center
                align-items center
                height 40px

                .arrow
                    width 7.5px

        .day-header
            font-family MuseoSansCyrl500 !important
            color #0d1717 !important
            font-size 12px !important

        .day:hover, .month:hover, .year:hover
            background-color #f0f0f0 !important
            border 1px solid #f0f0f0 !important

        .selected
            background-color #f0f0f0 !important

        @media (max-width: 425px)
            input#datepickerFrom, input#datepickerTo
                margin-right 0

</style>

<style lang="stylus" scoped>
    .cursor-p
        cursor pointer

    .bottom
        background-color #f0f0f0
        padding 16px
        display flex
        justify-content space-between
        align-items center

        .date
            display flex
            flex-direction column
            flex-grow 1
            padding-left 15px

            .date-title
                font-family MuseoSansCyrl500
                font-size 14px
                color #34343e
                text-transform uppercase
                margin-top 0

            .datepicker-wrap
                display flex

        .docs
            display flex
            flex-direction column

            button:last-of-type
                margin-bottom 0

        .info
            display flex

            .stats-col
                display flex
                flex-direction column

                .title-opt-span, .result-opt-span
                    font-family MuseoSansCyrl500
                    font-size 14px
                    color #34343e

                .title-opt-span
                    padding 5px
                    align-self flex-start

                    .title
                        padding 5px
                        margin 0 10px 0 10px

                .result-opt-span
                    padding 5px
                    margin 0 10px 0 10px
                    align-self flex-end
                    white-space nowrap

                .sent
                    color #b10303

                .count
                    padding 5px
                    margin 0 10px 0 10px

    @media (max-width: 1100px)
        .bottom
            .docs
                .buttons
                    width 130px

    @media (max-width: 1024px)
        .bottom
            .date
                width 190px
                padding-left 0

                .buttons
                    width 130px

                .datepicker-wrap
                    width 190px

                input#datepickerFrom, input#datepickerTo
                    margin-right 15px

    @media (max-width: 425px)
        input#datepickerFrom, input#datepickerTo
            margin-right 0

        .searchPanel
            margin-top 24px

        .bottom
            flex-direction column

            .info
                width 100%
                justify-content space-between

            .date
                width 100%
                padding 0
                align-items center
                margin-bottom 20px

                .datepicker-wrap
                    width 100%
                    justify-content space-around

            .docs
                width 100%
                margin-bottom 20px
                align-items center

        .title-opt-span
            padding 5px 0

            .title
                padding 5px 0
                margin 0

        .result-opt-span
            padding 5px 0
            margin 0

</style>