<template>
    <!--<transition name="fade">-->
    <div id="group-filter-buttons"
         class="group-filter-buttons">
        <!--&lt;!&ndash;<transition-group name="fade" tag="div">&ndash;&gt;-->
        <!--<button type="button"-->
        <!--class="circle circle-gray circle-filter"-->
        <!--v-for="(filter, i) in filters"-->
        <!--:key="i"-->
        <!--:id="contractorTypeType(filter.id)"-->
        <!--:class="[calcClass(filter), calcClassEnabled()]"-->
        <!--@click="changeStateButton(filter.id)">-->
        <!--<span class="title">-->
        <!--{{ filter.title }}-->
        <!--</span>-->
        <!--</button>-->
        <!--</transition-group>-->

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
    <!--</transition>-->
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'GroupFilterButtons',
        props: {
            // filterElementOptions: {
            //     type: Object,
            //     require: true
            // }
        },
        data() {
            return {
                filters: [],
            }
        },
        watch: {
            /**
             * when the property filterElementOption changes, the filter state changes accordingly
             *
             * @param opt changed option
             */
            // filterElementOptions: function (opt) {
            //     // this.changeStateButtonFilter(opt.id);
            //     // this.foldAnotherFilter();
            //     // this.currentFilter(opt.id).opened = opt.opened;
            //     // this.currentFilter(opt.id).folded = opt.folded;
            //     // this.dispatchChangeFilter();
            // }
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

    .fade-ch-active
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

    .fade-enter-active
        transition all .3s ease-out

    .fade-leave-active
        transition all .3s ease-in

    .fade-enter, .fade-leave-to
        transform translateX(-50px)
        opacity 0

    /*.fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        transform translateX(-50px)
        opacity 0*/

    .group-filter-buttons
        height 192px
        display flex
        flex-direction column
        align-items center
        justify-content space-between

        .circle-filter
            cursor pointer

            &:active
                -webkit-box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                -moz-box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                transform scale(0.95)

            .title
                color #fcfcfc

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