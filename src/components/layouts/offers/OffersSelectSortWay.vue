<template>
    <div class="offers-select-sort-way">
        <select-widget :identifier="identifier"
                       :opened="opened"
                       :options="options"/>
    </div>
</template>

<script>
    import SelectWidget from './SelectWidget';

    export default {
        name: 'OffersSelectSortWay',
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
                default: false,
                required: true
            }
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
    .offers-select-sort-way
        margin-right 10px
</style>