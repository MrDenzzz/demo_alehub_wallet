<template>
    <div id="group-filter-buttons"
         class="group-filter-buttons">
        <div class="col col__center">
            <transition name="fade-triangle">
                <div class="triangle"
                     v-if="openedGroupFilterButtons">
                </div>
            </transition>
        </div>
        <div class="col col__space-between">
            <transition name="fade-ts">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupFilterButtons"
                        :id="contractorTypeType(filters[0].id)"
                        :class="[calcClass(filters[0]), calcClassEnabled()]"
                        @click="changeStateButton(filters[0].id)">
            <span class="title">
            {{ filters[0].title }}
            </span>
                </button>
            </transition>

            <transition name="fade-ts-ex">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupFilterButtons"
                        :id="contractorTypeType(filters[1].id)"
                        :class="[calcClass(filters[1]), calcClassEnabled()]"
                        @click="changeStateButton(filters[1].id)">
            <span class="title">
            {{ filters[1].title }}
            </span>
                </button>
            </transition>

            <transition name="fade-ch">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupFilterButtons"
                        :id="contractorTypeType(filters[2].id)"
                        :class="[calcClass(filters[2]), calcClassEnabled()]"
                        @click="changeStateButton(filters[2].id)">
            <span class="title">
            {{ filters[2].title }}
            </span>
                </button>
            </transition>

            <transition name="fade-qa">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupFilterButtons"
                        :id="contractorTypeType(filters[3].id)"
                        :class="[calcClass(filters[3]), calcClassEnabled()]"
                        @click="changeStateButton(filters[3].id)">
            <span class="title">
            {{ filters[3].title }}
            </span>
                </button>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'GroupFilterButtons',
        props: {
        },
        data() {
            return {
                filters: [],
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters(
                [
                    'types',
                    'filtersCondition',
                    'filter',

                    'openedGroupFilterButtons'
                ]
            )
        },
        methods: {
            /**
             * return data of type contractor
             *
             * @param contractorTypeId
             * @returns {*}
             */
            contractorType: function (contractorTypeId) {
                return this.types.find(type => type.id === contractorTypeId);
            },
            /**
             * return type of contractor
             *
             * @param contractorTypeId
             * @returns {*}
             */
            contractorTypeType: function (contractorTypeId) {
                return this.contractorType(contractorTypeId).type;
            },
            /**
             *
             *
             * @param id
             * @returns {*}
             */
            currentFilter: function (id) {
                return this.filters.find(item => item.id === id);
            },
            /**
             *
             * @param id
             */
            changeFoldQueue: function (id) {
                let current = this.currentFilter(id);

                if (current.folded) {
                    let max = Math.max.apply(Math, this.filters.map(item => item.queue));
                    current.queue = max + 1;
                } else {
                    this.filters.forEach(item => {
                        if (item.queue > current.queue)
                            item.queue -= 1;
                    });
                    current.queue = 0;
                }
            },
            calcClassEnabled: function () {
                // console.log('check class enabled');
                // if (!this.enabled)
                //     return '';
                //
                // return 'disabled-button-filter';
            },
            /**
             *
             * @param id
             * @param opened
             * @param folded
             */
            setCorrectStateOtherButtonFilter: function (id, opened, folded) {
                let others = this.filters.filter(item => item.id !== id);

                others.forEach(item => {
                    if (opened && !folded) {
                        if (item.opened) {
                            item.opened = false;
                            item.folded = true;
                            this.changeFoldQueue(item.id);
                        }
                    }
                });
            },
            /**
             *
             */
            dispatchChangeFilter: function () {
                this.$store.dispatch('changeFiltersCondition',
                    this.filters
                ).then((resp) => {
                    // console.log(resp);
                }).catch(() => {
                    console.log('error change filters condition');
                });
            },
            /**
             * dispatch action makeFilterOfContractorType
             *
             * @param typeId
             */
            dispatchMakeFilterOfContractorType: function (typeId) {
                this.$store.dispatch('makeFilterOfContractorType',
                    typeId
                ).then((resp) => {
                    // console.log(resp);
                }).catch((resp) => {
                    console.error(resp);
                });
            },
            /**
             * dispatch action resetFilterOfContractorType
             *
             * @param typeId
             */
            dispatchResetFilterOfContractorType: function (typeId) {
                this.$store.dispatch('cancelResetOfContractorType',
                    typeId
                ).then(resp => {
                    // console.log(resp);
                }).catch(err => {
                    console.error(err);
                });
            },
            /**
             * calculate class to current button
             *
             * @returns {*}
             */
            calcClass: function (filter) {
                let current = this.types.find(type => {
                    return type.id === filter.id;
                });

                return (this.filter.opened && this.filter.typeId === filter.id) ? current.type + '__active' : current.type;
            },
            /**
             * changes the state of the button
             */
            changeStateButton: function (id) {

                this.$store.dispatch('changeOpeningFilter',
                    id
                ).then(resp => {
                    console.log('success change opening filter');
                }).catch(err => {
                    console.log('error change opening filter');
                });
            },
        },
        created() {
            this.filters = this.filtersCondition;
        }
    }
</script>

<style lang="stylus" scoped>
    /*.disabled-button-filter*/
    //transition all .3s ease-out
    //transform translateY(0)

    .fade-ts-active
        transition all .3s ease-out

    .fade-ts-leave-active
        transition all .3s ease-in

    .fade-ts-enter, .fade-ts-leave-to
        transform translate(-50px, 50px)
        opacity 0

    .fade-ts-ex-active
        transition all .3s ease-out

    .fade-ts-ex-leave-active
        transition all .3s ease-in

    .fade-ts-ex-enter, .fade-ts-ex-leave-to
        transform translate(-50px, 30px)
        opacity 0

    .fade-ch-activeslack
        transition all .3s ease-out

    .fade-ch-leave-active
        transition all .3s ease-in

    .fade-ch-enter, .fade-ch-leave-to
        transform translate(-50px, -30px)
        opacity 0

    .fade-qa-active
        transition all .3s ease-out

    .fade-qa-leave-active
        transition all .3s ease-in

    .fade-qa-enter, .fade-qa-leave-to
        transform translate(-50px, -50px)
        opacity 0

    .fade-triangle-active
        transition all .3s ease-out

    .fade-triangle-leave-active
        transition all .3s ease-in

    .fade-triangle-enter, .fade-triangle-leave-to
        transform translate(-50px, 0)
        opacity 0

    .group-filter-buttons
        height 192px
        display flex
        align-items center

        .circle-filter
            cursor pointer

            &:active
                -webkit-box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                -moz-box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                transform scale(0.95)

            .title
                color #fcfcfc

        .col
            height 100%

            &.col__center
                display flex
                flex-direction column
                justify-content center

            &.col__space-between
                display flex
                flex-direction column
                justify-content space-between

        .triangle
            content ""
            bottom 0
            width 0
            height 0
            border-left 6px solid #a6aaae
            border-top 6px solid transparent
            border-bottom 6px solid transparent

        .circle
            width 36px
            min-width 36px
            height 36px
            border-radius 50%
            display flex
            justify-content center
            align-items center
            flex-direction column
            border none
            -webkit-transition all .3s ease
            -moz-transition all .3s ease
            -o-transition all .3s ease
            transition all .3s ease

            &.ts, &.ts-ex, &.ch, &.qa
                background-color #a6aaae
                -webkit-box-shadow 0 0 6px 0 rgba(0, 0, 0, .3)
                -moz-box-shadow 0 0 6px 0 rgba(0, 0, 0, .3)
                box-shadow 0 0 6px 0 rgba(0, 0, 0, .3)

            &.ts
                &:hover
                    background-color rgba(182, 60, 44, .4)

            &.ts-ex
                &:hover
                    background-color rgba(3, 145, 166, .4)

            &.ch
                &:hover
                    background-color rgba(224, 154, 0, .4)

            &.qa
                &:hover
                    background-color rgba(126, 32, 192, .4)

            &.ts__active, &.ts-ex__active, &.ch__active, &.qa__active
                -webkit-box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)
                -moz-box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)
                box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)

            &.ts__active
                background-color #b63c2c

            &.ts-ex__active
                background-color #0391a6

            &.ch__active
                background-color #e09a00

            &.qa__active
                background-color #7e20c0

    .dark
        .group-filter-buttons
            .circle-filter
                .title
                    color #34343e

</style>