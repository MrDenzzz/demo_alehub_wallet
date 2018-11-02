<template>
    <div class="offers-control-toggle-state">
        <button type="button"
                class="circle circle-green"
                @click="toggleGroupFilterButtons">
            to
        </button>
    </div>
</template>

<script>
    export default {
        name: 'OffersControlToggleState',
        methods: {
            toggleGroupFilterButtons: function () {
                this.$store.dispatch('toggleGroupStatusButtons'
                ).then(resp => {

                }).catch(err => {

                });
            }
        }
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
            cursor pointer
            background-color #1bac2c
</style>