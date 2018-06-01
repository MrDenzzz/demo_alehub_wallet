<template>
    <div class="group-filter-buttons" id="group-filter-buttons">
        <button type="button"
                class="circle circle-gray circle-filter"
                v-for="item in filters"
                :id="item.id"
                :class="calcClass(item.id, item.opened, item.folded)"
                @click="changeStateButtonFilter(item.id)">
        <span class="title">
            {{ item.title }}
        </span>
        </button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'GroupFilterButtons',
        props: {
            filterElementOptions: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                filters: [],
            }
        },
        watch: {
            filterElementOptions: function (opt) {
                this.changeStateButtonFilter(opt.id);
                this.foldAnotherFilter();
                let current = this.currentFilter(opt.id);
                current.opened = opt.opened;
                current.folded = opt.folded;
                this.dispatchChangeFilter();
            }
        },
        computed: {
            ...mapGetters(
                [
                    'filtersCondition'
                ]
            )
        },
        methods: {
            calcClass: function (id, opened, folded) {
                if (!this.filters.find(item => item.id === id) &&
                    typeof opened === 'boolean' && typeof folded === 'boolean') {
                    console.error('Wrong arguments value');
                    return false;
                }

                if (!opened && !folded)
                    return id;
                else if (opened && !folded)
                    return id + '__active';
                else if (!opened && folded)
                    return id + '__active-fold';

                console.error('Missing IF statement in calcClass');
                return false;
            },
            currentFilter: function (id) {
                return this.filters.find(item => item.id === id);
            },
            foldAnotherFilter: function () {
                this.filters.forEach(item => {
                    if (item.opened) {
                        item.opened = false;
                        item.folded = true;
                        this.changeFoldQueue(item.id);
                    }
                });
            },
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
            dispatchChangeFilter: function () {
                this.$store.dispatch('changeFiltersCondition',
                    this.filters
                ).then((resp) => {
                    // console.log(resp);
                }).catch(() => {
                    console.log('error change filters condition');
                });
            },
            changeStateButtonFilter: function (id) {
                let current = this.currentFilter(id);

                if (!current.opened && !current.folded) {
                    current.opened = true;
                    this.setCorrectStateOtherButtonFilter(id, current.opened, current.folded);
                    this.dispatchChangeFilter();
                } else if (current.opened && !current.folded) {
                    current.opened = false;
                    current.folded = true;
                    this.changeFoldQueue(id);
                    this.dispatchChangeFilter();
                }  else if (!current.opened && current.folded) {
                    current.folded = false;
                    this.changeFoldQueue(id);
                    this.dispatchChangeFilter();
                }
            },
        },
        created() {
            this.filters = this.filtersCondition;
        }
    }
</script>

<style lang="stylus" scoped>
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

            &.ts__active, &.ts-ex__active, &.ch__active, &.qa__active,
            &.ts__active-fold, &.ts-ex__active-fold, &.ch__active-fold, &.qa__active-fold
                -webkit-box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)
                -moz-box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)
                box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)

            &.ts__active-fold
                background linear-gradient(
                        to bottom,
                        #b63c2c,
                        #b63c2c 50%,
                        #fff 50%,
                        #b63c2c 100%,
                        #fff 100%,
                        #fff
                )
                background-size 100% 3px

            &.ts__active-fold
                background linear-gradient(
                        to bottom,
                        #b63c2c,
                        #b63c2c 50%,
                        #fff 50%,
                        #b63c2c 100%,
                        #fff 100%,
                        #fff
                )
                background-size 100% 3px

            &.ts-ex__active-fold
                background linear-gradient(
                        to bottom,
                        #0391a6,
                        #0391a6 50%,
                        #fff 50%,
                        #0391a6 100%,
                        #fff 100%,
                        #fff
                )
                background-size 100% 3px

            &.ch__active-fold
                background linear-gradient(
                        to bottom,
                        #e09a00,
                        #e09a00 50%,
                        #fff 50%,
                        #e09a00 100%,
                        #fff 100%,
                        #fff
                )
                background-size 100% 3px

            &.qa__active-fold
                background linear-gradient(
                        to bottom,
                        #7e20c0,
                        #7e20c0 50%,
                        #fff 50%,
                        #7e20c0 100%,
                        #fff 100%,
                        #fff
                )
                background-size 100% 3px

            &.ts__active
                background-color #b63c2c

            &.ts-ex__active
                background-color #0391a6

            &.ch__active
                background-color #e09a00

            &.qa__active
                background-color #7e20c0

</style>