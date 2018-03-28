<template>
    <div class="searchPanel">
        <transactions-tool-panel-operation/>
        <transactions-tool-panel-filter :current-transactions="currentTransactions" />
    </div>
</template>

<script>
    import TransactionsToolPanelFilter from '../layouts/TransactionsToolPanelFilter';
    import TransactionsToolPanelOperation from '../layouts/TransactionsToolPanelOperation';

    import {mapGetters} from 'vuex';

    export default {
        name: 'transactions-tool-panel',
        components: {
            TransactionsToolPanelOperation,
            TransactionsToolPanelFilter,
        },
        props: {
            currentTransactions: {
                type: Array,
                required: true
            }
        },
        data() {
            return {

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