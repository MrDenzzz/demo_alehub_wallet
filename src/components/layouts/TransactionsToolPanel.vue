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
    }
</script>

<style lang="stylus" scoped>
    .searchPanel
        width 100%
        margin-bottom 24px
</style>