<template>
    <div class="offers-select-sort-options">
        <select-widget :identifier="identifier"
                       :opened="opened"
                       :options="options"/>
    </div>
</template>

<script>
    import SelectWidget from './SelectWidget';

    export default {
        name: 'OffersSelectSortOptions',
        components: {
            SelectWidget
        },
        props: {
            identifier: {
                type: String,
                required: true
            },
            opened: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                options: [
                    {
                        title: this.$t('components.offersSelectSortOptions.price'),
                        value: 'price'
                    },
                    {
                        title: this.$t('components.offersSelectSortOptions.date'),
                        value: 'date'
                    },
                    {
                        title: this.$t('components.offersSelectSortOptions.rating'),
                        value: 'rating'
                    },
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>