<template>
    <div class="searchPanel">
        <transactions-tool-panel-operation :reset-search="resetSearch"/>
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
            },
            resetSearch: {
                type: Boolean
            }
        },
        mounted() {
            this.$on('successResetSearchToTool', function () {
                this.$parent.$emit('successResetSearchToTool');
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .searchPanel
        width 100%
        margin-bottom 24px
</style>