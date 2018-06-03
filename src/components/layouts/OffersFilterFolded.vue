<template>
    <transition name="fade-bottom">
        <div class="folded-filter"
             :style="{ 'bottom': queue * 30 + 'px' }">
            <div class="title">
                {{ title }}
            </div>
            <button type="button" class="unfold"
                    @click="toUnfold">
                <img src="../../../static/img/arrow-down-light.svg" alt="to fold">
            </button>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'OffersFilterFolded',
        data() {
            return {}
        },
        props: {
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            queue: {
                type: Number,
                required: true
            }
        },
        methods: {
            toUnfold: function () {
                this.$parent.$emit('onFold', {id: this.id, opened: true, folded: false});
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .fade-bottom-enter-active
        transition all .2s ease-out

    .fade-bottom-leave-active
        transition all .2s ease-in

    .fade-bottom-enter, .fade-bottom-leave-to
        transform translateY(100px)
        opacity 0


    .folded-filter
        z-index 3
        position fixed
        left 20px
        width 150px
        padding 5px 10px
        display flex
        justify-content space-between
        align-items center
        background-color #34343e
        transition all .3s ease-in

        .title
            font-family MuseoSansCyrl500
            text-transform unset
            color #fcfcfc

        .unfold
            cursor pointer
            width 25px
            background-color transparent
            border none

            &:focus
                outline none

            img
                width 100%
                transform rotateX(180deg)
</style>