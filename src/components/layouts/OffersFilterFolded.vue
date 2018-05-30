<template>
    <div class="folded-filter">
        <div class="title">
            Title
        </div>
        <button type="button" class="unfold" @click="toUnfold">
            <img src="../../../static/img/arrow-down-light.svg" alt="">
        </button>
    </div>
</template>

<script>
    export default {
        name: 'OffersFilterFolded',
        data() {
            return {

            }
        },
        methods: {
            toUnfold: function () {
                this.$parent.$emit('onFold', false);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .folded-filter
        position fixed
        bottom 20px
        left 20px
        width 150px
        padding 5px 10px
        display flex
        justify-content space-between
        align-items center
        background-color #34343e

        .title
            text-transform unset

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