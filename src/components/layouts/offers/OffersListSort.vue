<template>
    <div class="offers-list-sort">
        <offers-select-sort-way/>
        <offers-select-sort-options/>
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
            return {

            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>

</style>