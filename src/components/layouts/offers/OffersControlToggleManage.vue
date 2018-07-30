<template>
    <div class="offers-control-new-offer">
        <button class="circle circle-yellow"
                @click="toggleGroupManageButtons">
            <span>go</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'OffersControlNewOffer',
        methods: {
            toggleGroupManageButtons: function () {
                this.$store.dispatch('toggleGroupManageButtons',
                ).then(resp => {

                }).catch(err => {

                });
            }
        }
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
            cursor pointer
            background-color #ffd24f

</style>