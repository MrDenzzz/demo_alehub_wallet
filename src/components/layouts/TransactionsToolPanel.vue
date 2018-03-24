<template>
    <div class="searchPanel">
        <transactions-tool-panel-operation/>

        <transactions-tool-panel-filter/>

        <modal-share-transactions/>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import FormattingPrice from '../layouts/FormattingPrice';
    import TransactionsToolPanelFilter from '../layouts/TransactionsToolPanelFilter';
    import TransactionsToolPanelOperation from '../layouts/TransactionsToolPanelOperation';
    import ModalShareTransactions from '../modals/ShareTransactions';

    import {mapGetters} from 'vuex';

    export default {
        name: 'transactions-tool-panel',
        components: {
            Datepicker,
            FormattingPrice,
            ModalShareTransactions,
            TransactionsToolPanelOperation,
            TransactionsToolPanelFilter,
            // ModalSend,
            // ModalRequest
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

        },
        created() {

        },
        mounted() {
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
        }
    }
</script>

<style lang="stylus" scoped>
    .searchPanel
        width 100%
        margin-bottom 24px
</style>

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
        white-space nowrap

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
