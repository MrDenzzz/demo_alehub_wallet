<template>
    <div class="offers-list-sort">
        <div class="aaa">
            <offers-select-sort-way :identifier="identifier.way"
                                    :opened="opened.way"/>
            <offers-select-sort-options :identifier="identifier.options"
                                        :opened="opened.options"/>
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
            return {
                identifier: {
                    way: 'way',
                    options: 'options'
                },
                opened: {
                    way: false,
                    options: false,
                }
            }
        },
        computed: {},
        methods: {
            /**
             * recursive search for the parent element until it matches the identifier 'way'
             *
             * @param target
             * @returns {boolean}
             */
            recursiveSearchWayElement: function (target) {
                if (target.id === this.identifier.way) {
                    this.opened.way = true;
                    return true;
                } else if (target.parentElement && target.id !== this.identifier.way) {
                    this.recursiveSearchWayElement(target.parentElement);
                } else {
                    this.opened.way = false;
                    return false;
                }
            },
            /**
             * recursive search for the parent element until it matches the identifier 'options'
             *
             * @param target
             * @returns {boolean}
             */
            recursiveSearchOptionsElement: function (target) {
                if (target.id === this.identifier.options) {
                    this.opened.options = true;
                    return true;
                } else if (target.parentElement && target.id !== this.identifier.options) {
                    this.recursiveSearchOptionsElement(target.parentElement);
                } else {
                    this.opened.options = false;
                    return false;
                }

            }
        },
        mounted() {
            window.addEventListener('click', e => {
                this.recursiveSearchWayElement(e.target);
                this.recursiveSearchOptionsElement(e.target);
            });
        }
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