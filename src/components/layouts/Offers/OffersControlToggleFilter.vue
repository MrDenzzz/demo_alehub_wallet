<template>
    <div class="offers-control-toggle-filter">
        <button id="enable-filters"
                class="circle circle-big circle-yellow circle-main"
                @click="toggleGroupFilterButtons">
            <img src="../../../../static/img/ale-logo.svg"
                 alt="ale logo" width="21px" height="25px">
        </button>
    </div>
</template>

<script>
    export default {
        name: 'OffersControlToggleFilter',
        methods: {
            toggleGroupFilterButtons: function () {
                this.$store.dispatch('toggleGroupFilterButtons'
                ).then(resp => {

                }).catch(err => {

                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .offers-control-toggle-filter
        position absolute
        top calc(50% - 24px)
        left -6.5px

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

        &.circle-big
            width 48px
            height 48px
            min-width 48px
            min-height 48px

        &.circle-yellow
            background-color #ffd24f

        &.circle-main
            cursor pointer
</style>