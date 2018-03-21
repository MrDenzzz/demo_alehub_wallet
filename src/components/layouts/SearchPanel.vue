<template>
    <div class="searchPanel">
        <div class="top" style="display: flex; justify-content: space-between; align-items: center;">
            <div class="searchControl" @click="makeFocusSearch" style="display: flex; justify-content: flex-start;">
                <img src="../../assets/img/search-ic.svg" width="16" height="16">
                <input type="text" id="search-transactions" placeholder="Search Transactions" @input="searchTransaction"
                       v-model="searchText">
            </div>
            <!--<div class="filters">-->
                <!--<span-->
                        <!--@click="switchFilter()"-->
                        <!--class="cursor-p"-->
                        <!--:class="{ 'active': !hideFilter}"-->
                <!--&gt;-->
                    <!--Date range-->
                <!--</span>-->
            <!--</div>-->
        </div>
        <div class="bottom">
            <div class="date">
                <h3 class="date-title">
                    Select a date range
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
                    Download PDF
                </button>
                <button class="buttons btn-default" @click="openModal('shareTransactions')">
                    Share
                </button>
            </div>
            <div class="info" style="display: flex;">
                <div class="stats-col" style="display: flex; flex-direction: column;">
                    <div class="title-opt-span">
                        <span class="title">
                            Received
                        </span>
                    </div>
                    <div class="title-opt-span sent">
                        <span class="title">
                            Sent
                        </span>
                    </div>
                    <div class="title-opt-span">
                        <span class="title">
                            Starting
                        </span>
                    </div>
                    <div class="title-opt-span">
                        <span class="title">
                            Total
                        </span>
                    </div>
                </div>
                <div class="stats-col" style="display: flex; flex-direction: column;">
                    <div class="result-opt-span">
                        <span class="count">
                            <FormattingPrice
                                    :value="currentReceiveBalance()"
                            />
                        </span>
                        ALC
                    </div>
                    <div class="result-opt-span sent">
                        <span class="count">
                            <FormattingPrice
                                    :value="currentSentBalance()"
                            />
                        </span>
                        ALC
                    </div>
                    <div class="result-opt-span">
                        <span class="count">
                            <FormattingPrice
                                    :value="currentBalanceBeginPeriod()"
                            />
                        </span>
                        ALC
                    </div>
                    <div class="result-opt-span">
                        <span class="count">
                            <FormattingPrice
                                    :value="currentBalanceEndPeriod()"
                            />
                        </span>
                        ALC
                    </div>
                </div>
            </div>
        </div>

        <ShareTransactions/>

    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import FormattingPrice from '../layouts/FormattingPrice';
    import ShareTransactions from '../modals/ShareTransactions';

    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: 'searchPanel',
        components: {
            Datepicker,
            FormattingPrice,
            ShareTransactions
        },
        props: {
            totalTransactions: [String, Number],
            startingTransactions: [String, Number],
            checkActivities: [Number, String],
            currentTransactions: [Object, Array]
        },
        data() {
            return {
                dateFrom: null,
                dateTo: null,
                searchText: ''
            }
        },
        watch: {
            dateFrom: function (val) {
                this.$parent.$emit('changeDateFrom', val);
            },
            dateTo: function (val) {
                this.$parent.$emit('changeDateTo', val);
            }
        },
        computed: {
            ...mapGetters([
                'transactions'
            ]),
            currentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            hideFilter: function () {
                return this.$store.state.Transactions.hideFilter;
            },
            currentBalance: function () {
                return this.currentWallet.balance;
            },
        },
        methods: {
            ...mapMutations({
                setHideFilter: 'SET_HIDE_FILTER',
            }),
            openModal: function (name) {
                this.$modal.show(name);
            },
            searchTransaction: function () {
                this.$parent.$emit('searchTransaction', this.searchText)
            },
            makeFocusSearch: function () {
                document.getElementById('search-transactions').focus();
            },

            switchFilter: function () {
                (this.hideFilter) ? this.setHideFilter(false) : this.setHideFilter(true);
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
                if (this.checkActivities)
                    return this.startingTransactions;
                return 0;
            },
            currentBalanceEndPeriod: function () {
                if (this.checkActivities)
                    return this.totalTransactions;
                return 0;
            },
            currentSentBalance: function () {
                let sentTransactions = this.transactions.filter(item => {
                    return item.balanceInfo.after - item.balanceInfo.before < 0;
                });

                if (sentTransactions.length > 1) {
                    return sentTransactions.reduce(
                        (sum, current) => {
                            return {total: parseInt(sum.count) + parseInt(current.count)};
                        }
                    ).total;
                } else if (sentTransactions.length === 1) {
                    return sentTransactions[0].count;
                }
                return 0;
            },
            currentReceiveBalance: function () {
                let receiveBalance = this.currentTransactions.filter(item => {
                    return item.type === 'received';
                });
                if (receiveBalance.length > 1) {
                    return receiveBalance.reduce(
                        (sum, current) => {
                            return {total: parseInt(sum.total) + parseInt(current.total)};
                        }
                    ).total;
                } else if (receiveBalance.length === 1) {
                    return receiveBalance[0].total;
                }
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

<style lang="scss" scoped>
    .searchPanel {
        width: 100%;
        margin-bottom: 24px;
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/

        & .filters {
            span {
                opacity: 0.5;
                font-family: MuseoSansCyrl300;
                font-size: 14px;
                line-height: 1.29;
                text-align: right;
                color: #34343e;
                min-width: 20px;

                &:not(:last-child) {
                    margin-right: 18px;
                }

                &.active {
                    opacity: 1;
                }

                &:hover {
                    &:not(.active) {
                        cursor: pointer;
                        opacity: 1;
                    }
                }
            }
        }

        & .searchControl {
            /*display: flex;*/
            /*align-items: center;*/
            width: calc(100% - 350px); // переписать динамически
            cursor: pointer;

            & input {
                background: none;
                outline: none;
                border: none;
                border-bottom: 1px solid #ccc;
                opacity: 0.5;
                font-family: MuseoSansCyrl300;
                font-size: 14px;
                line-height: 1.29;
                color: #34343e;
                margin-left: 18px;
                padding: 0;
                margin-top: 0;

                &:focus {
                    width: 100% !important;
                }
            }
        }
    }
</style>

<style lang="stylus">
    #search-transactions
        width auto
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

            /*.next:after, .prev:after*/
                /*content initial !important*/

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

    .top
        padding-bottom 18px
        border-bottom 1px solid #d1d1d1
        margin-bottom 24px

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

    .sent
        color #b10303

    .result-opt-span
        padding 5px
        margin 0 10px 0 10px
        align-self flex-end

        .count
            padding 5px
            margin 0 10px 0 10px

    @media (max-width: 425px)
        input#datepickerFrom, input#datepickerTo
            margin-right 0

        .searchPanel
            margin-top 24px

        .bottom
            flex-direction column

            & .info
                width 100%
                justify-content space-between

            & .date 
                width 100%
                padding 0
                align-items center
                margin-bottom 20px

                & .datepicker-wrap
                    width 100%
                    justify-content space-around

            & .docs
                width 100%
                margin-bottom 20px
                align-items center
        
        .title-opt-span
            padding 5px 0

            & .title
                padding 5px 0
                margin 0

        .result-opt-span
            padding 5px 0
            margin 0

</style>
