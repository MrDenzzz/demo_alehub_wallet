<template>
    <div class="group-status-buttons">
        <div class="filters-block">
            <button type="button"
                    class="circle"
                    v-for="item in status"
                    :id="item.id"
                    :class="calcStatusClass(item)"
                    @click="changeButtonStatus(item.id)">
                <img :src="item.src" :alt="item.title">
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'GroupStatusButton',
        props: {},
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(
                [
                    'status'
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
    .filters-block
        position relative
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        height 192px

        &:before
            content ""
            position absolute
            left -7px
            top calc(50% - 6px)
            bottom 0
            width 0
            height 0
            border-left 6px solid #a6aaae
            border-top 6px solid transparent
            border-bottom 6px solid transparent

        @media (max-width 768px)
            flex-direction row
            width 192px
            top 8px
            left -96px

        @media (max-width 620px)
            flex-direction column
            align-items center

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