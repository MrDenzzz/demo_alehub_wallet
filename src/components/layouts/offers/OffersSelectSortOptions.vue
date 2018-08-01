<template>
    <div class="offers-select-sort-options">
        <select-widget :options="options"/>
    </div>
</template>

<script>
    import SelectWidget from './SelectWidget';

    export default {
        name: 'OffersSelectSortOptions',
        components: {
            SelectWidget
        },
        data() {
            return {
                options: [
                    {
                        title: this.$t('components.offersSelectSortOptions.price'),
                        value: false
                    },
                    {
                        title: this.$t('components.offersSelectSortOptions.date'),
                        value: true
                    },
                    {
                        title: this.$t('components.offersSelectSortOptions.rating'),
                        value: false
                    },
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>