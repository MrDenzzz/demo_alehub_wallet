<template>
    <div class="offers-control-toggle-state">
        <div class="circle circle-green">
            to
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OffersControlToggleState'
    }
</script>

<style lang="stylus" scoped>
    .offers-control-toggle-state
        position absolute
        bottom -18px

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

        &.circle-green
            background-color #1bac2c
</style>