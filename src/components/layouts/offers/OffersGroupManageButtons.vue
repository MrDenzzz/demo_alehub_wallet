<template>
    <div class="offers-group-manage-buttons">
        <div class="col col__center">
            <transition name="fade-triangle">
                <div class="triangle"
                     v-if="openedGroupManageButtons">
                </div>
            </transition>
        </div>
        <div class="col col__space-between">
            <transition name="fade-create">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupManageButtons">
                    <span class="title">
                    {{ manage.create.title }}
                    </span>
                </button>
            </transition>

            <transition name="fade-favorites">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupManageButtons">
                    <span class="title">
                    {{ manage.favorites.title }}
                    </span>
                </button>
            </transition>

            <transition name="fade-search">
                <button type="button"
                        class="circle circle-gray circle-filter"
                        v-if="openedGroupManageButtons">
                    <span class="title">
                    {{ manage.search.title }}
                    </span>
                </button>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'OffersGroupManageButtons',
        computed: {
            ...mapGetters(
                [
                    'manage',
                    'openedGroupManageButtons'
                ]
            )
        }
    }
</script>

<style lang="stylus" scoped>
    .fade-create-active
        transition all .3s ease-out

    .fade-create-leave-active
        transition all .3s ease-in

    .fade-create-enter, .fade-create-leave-to
        transform translate(-50px, 50px)
        opacity 0

    .fade-favorites-active
        transition all .3s ease-out

    .fade-favorites-leave-active
        transition all .3s ease-in

    .fade-favorites-enter, .fade-favorites-leave-to
        transform translate(-50px, 30px)
        opacity 0

    .fade-search-active
        transition all .3s ease-out

    .fade-search-leave-active
        transition all .3s ease-in

    .fade-search-enter, .fade-search-leave-to
        transform translate(-50px, -30px)
        opacity 0

    .fade-triangle-active
        transition all .3s ease-out

    .fade-triangle-leave-active
        transition all .3s ease-in

    .fade-triangle-enter, .fade-triangle-leave-to
        transform translate(-50px, 0)
        opacity 0

    .offers-group-manage-buttons
        position absolute
        top -77px
        height 144px
        display flex
        align-items center

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
</style>