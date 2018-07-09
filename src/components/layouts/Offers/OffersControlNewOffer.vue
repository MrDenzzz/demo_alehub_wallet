<template>
    <div class="offers-control-new-offer">
        <div class="circle circle-yellow">
            <span>go</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OffersControlNewOffer'
    }
</script>

<style lang="stylus" scoped>
    .offers-control-new-offer
        position absolute
        top -18px

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

        &.circle-yellow
            background-color #ffd24f

</style>