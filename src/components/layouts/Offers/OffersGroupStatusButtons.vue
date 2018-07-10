<template>
    <div class="group-status-buttons">
        <div class="col col__center">
            <transition name="fade-triangle">
                <div class="triangle"
                     v-if="openedGroupStatusButtons">
                </div>
            </transition>
        </div>
        <div class="col col__space-between">
            <transition name="fade-progress">
                <button type="button"
                        class="circle"
                        v-if="openedGroupStatusButtons"
                        :id="status[0].id"
                        :class="calcStatusClass(status[0])"
                        @click="changeButtonStatus(status[0].id)">
                    <img :src="status[0].src" :alt="status[0].title">
                </button>
            </transition>

            <transition name="fade-ready">
                <button type="button"
                        class="circle"
                        v-if="openedGroupStatusButtons"
                        :id="status[1].id"
                        :class="calcStatusClass(status[1])"
                        @click="changeButtonStatus(status[1].id)">
                    <img :src="status[1].src" :alt="status[1].title">
                </button>
            </transition>

            <transition name="fade-wait">
                <button type="button"
                        class="circle"
                        v-if="openedGroupStatusButtons"
                        :id="status[2].id"
                        :class="calcStatusClass(status[2])"
                        @click="changeButtonStatus(status[2].id)">
                    <img :src="status[2].src" :alt="status[2].title">
                </button>
            </transition>

            <transition name="fade-cancel">
                <button type="button"
                        class="circle"
                        v-if="openedGroupStatusButtons"
                        :id="status[3].id"
                        :class="calcStatusClass(status[3])"
                        @click="changeButtonStatus(status[3].id)">
                    <img :src="status[3].src" :alt="status[3].title">
                </button>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'GroupStatusButton',
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapGetters(
                [
                    'status',
                    'openedGroupStatusButtons'
                ]
            ),
        },
        methods: {
            /**
             *
             * @param item of array status buttons
             */
            calcStatusClass: function (item) {
                if (item.active)
                    return item.class + ' ' + item.class + '__active';
                else
                    return item.class;
            },
            /**
             *
             *
             * @param id status button
             */
            changeButtonStatus: function (id) {
                this.$store.dispatch('makeFilterOfStatusOffer',
                    id
                ).then((resp) => {
                    console.log(resp);
                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .fade-progress-active
        transition all .3s ease-out

    .fade-progress-leave-active
        transition all .3s ease-in

    .fade-progress-enter, .fade-progress-leave-to
        transform translate(-50px, 50px)
        opacity 0

    .fade-ready-active
        transition all .3s ease-out

    .fade-ready-leave-active
        transition all .3s ease-in

    .fade-ready-enter, .fade-ready-leave-to
        transform translate(-50px, 30px)
        opacity 0

    .fade-wait-activeslack
        transition all .3s ease-out

    .fade-wait-leave-active
        transition all .3s ease-in

    .fade-wait-enter, .fade-wait-leave-to
        transform translate(-50px, -30px)
        opacity 0

    .fade-cancel-active
        transition all .3s ease-out

    .fade-cancel-leave-active
        transition all .3s ease-in

    .fade-cancel-enter, .fade-cancel-leave-to
        transform translate(-50px, -50px)
        opacity 0

    .fade-triangle-active
        transition all .3s ease-out

    .fade-triangle-leave-active
        transition all .3s ease-in

    .fade-triangle-enter, .fade-triangle-leave-to
        transform translate(-50px, 0)
        opacity 0

    .group-status-buttons
        position absolute
        bottom 120px
        display flex
        flex-direction row
        align-items center
        height 192px

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

        @media (max-width 768px)
            flex-direction row
            width 192px
            top 8px
            left -96px

        @media (max-width 620px)
            flex-direction column
            align-items center

        .triangle
            content ""
            bottom 0
            width 0
            height 0
            border-left 6px solid #a6aaae
            border-top 6px solid transparent
            border-bottom 6px solid transparent

        .circle
            cursor pointer
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

            &:active
                -webkit-box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                -moz-box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                box-shadow 0 0 3px 0 rgba(0, 0, 0, .5)
                transform scale(0.95)

            &.continues,
            &.check,
            &.stop,
            &.cancel
                background-color #a6aaae
                -webkit-box-shadow 0 0 6px 0 rgba(0, 0, 0, .3)
                -moz-box-shadow 0 0 6px 0 rgba(0, 0, 0, .3)
                box-shadow 0 0 6px 0 rgba(0, 0, 0, .3)

            &.continues
                &:hover
                    background-color rgba(38, 189, 81, .4)

            &.check
                &:hover
                    background-color rgba(255, 210, 79, .4)

            &.stop
                &:hover
                    background-color rgba(255, 79, 79, .4)

            &.cancel
                &:hover
                    background-color rgba(51, 26, 26, .4)

            &.continues__active,
            &.check__active,
            &.stop__active,
            &.cancel__active
                -webkit-box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)
                -moz-box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)
                box-shadow 0 0 12px 0 rgba(0, 0, 0, .5)

            &.continues__active
                background-color rgba(38, 189, 81, 1)

                &:hover
                    background-color rgba(38, 189, 81, 1)

            &.check__active
                background-color rgba(255, 210, 79, 1)

                &:hover
                    background-color rgba(255, 210, 79, 1)

            &.stop__active
                background-color rgba(255, 79, 79, 1)

                &:hover
                    background-color rgba(255, 79, 79, 1)

            &.cancel__active
                background-color rgba(51, 26, 26, 1)

                &:hover
                    background-color rgba(51, 26, 26, 1)

</style>