<template>
    <div class="offers-select-sort-way">
        <select-widget :options="options"/>
    </div>
</template>

<script>
    import SelectWidget from './SelectWidget';

    export default {
        name: 'OffersSelectSortWay',
        components: {
            SelectWidget
        },
        data() {
            return {
                options: [
                    {
                        title: this.$t('components.offersSelectSortWay.decrease'),
                        value: false
                    },
                    {
                        title: this.$t('components.offersSelectSortWay.increase'),
                        value: true
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>