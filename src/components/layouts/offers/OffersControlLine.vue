<template>
    <div class="offers-control-line">
        <offers-control-toggle-manage/>
        <offers-control-toggle-filter/>
        <offers-control-toggle-status/>
        <div class="divider-container">
            <div class="divider"
                 v-for="n in 12" :key="n"></div>
        </div>
    </div>
</template>

<script>
    import OffersControlToggleManage from './OffersControlToggleManage';
    import OffersControlToggleFilter from './OffersControlToggleFilter';
    import OffersControlToggleStatus from './OffersControlToggleStatus';
    import OffersGroupFilterButtons from './OffersGroupFilterButtons';

    export default {
        name: 'OffersControlLine',
        components: {
            OffersControlToggleManage,
            OffersControlToggleFilter,
            OffersControlToggleStatus,
            OffersGroupFilterButtons
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
            justify-content space-around
            align-items center
            height 100%

            .divider
                width 30px
                height 1px
                background-color #ffffff
</style>