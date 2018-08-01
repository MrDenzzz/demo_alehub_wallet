<template>
    <div class="offers-list-sort">
        <div class="aaa">
            <offers-select-sort-way/>
            <offers-select-sort-options/>
        </div>
    </div>
</template>

<script>
    import OffersSelectSortWay from './OffersSelectSortWay';
    import OffersSelectSortOptions from './OffersSelectSortOptions';

    export default {
        name: 'OffersListSort',
        components: {
            OffersSelectSortWay,
            OffersSelectSortOptions
        },
        data() {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style lang="stylus" scoped>
    .offers-list-sort
        display flex
        justify-content flex-end

        .aaa
            display flex
            position absolute
</style>