<template>
    <div class="offers-control-line">
        <offers-control-new-offer/>
        <offers-control-toggle-filter/>
        <offers-control-toggle-state/>
        <div class="divider-container">
            <div class="divider"
                 v-for="n in 12" :key="n"></div>
        </div>
    </div>
</template>

<script>
    import OffersControlNewOffer from './OffersControlNewOffer';
    import OffersControlToggleFilter from './OffersControlToggleFilter';
    import OffersControlToggleState from './OffersControlToggleState';

    export default {
        name: 'OffersControlLine',
        components: {
            OffersControlNewOffer,
            OffersControlToggleFilter,
            OffersControlToggleState
        }
    }
</script>

<style lang="stylus" scoped>
    /*#c5cdd7*/
    .offers-control-line
        position relative
        width 35px
        height 550px
        background-color #e7eaee

        .divider-container
            display flex
            flex-direction column
            justify-content space-between
            align-items center
            height 100%

            .divider
                width 30px
                height 1px
                background-color #ffffff
</style>