<template>
    <div class="offers-control">
        <div class="offers-control__datepicker">
            <offers-datepicker-from/>
            <offers-datepicker-to/>
        </div>
        <offers-control-line/>
        <div class="offers-control__group-buttons">
            <offers-group-manage-buttons/>
            <offers-group-filter-buttons/>
            <offers-group-status-buttons/>
        </div>
    </div>
</template>

<script>
    import OffersFilter from './OffersFilter';
    import OffersGroupManageButtons from './OffersGroupManageButtons';
    import OffersGroupFilterButtons from './OffersGroupFilterButtons';
    import OffersGroupStatusButtons from './OffersGroupStatusButtons';
    import OffersControlLine from './OffersControlLine';
    import OffersControlToggleFilter from './OffersControlToggleFilter';
    import OffersDatepickerFrom from './OffersDatepickerFrom';
    import OffersDatepickerTo from './OffersDatepickerTo';

    export default {
        name: 'OffersControl',
        components: {
            OffersFilter,
            OffersGroupManageButtons,
            OffersGroupFilterButtons,
            OffersGroupStatusButtons,
            OffersControlLine,
            OffersControlToggleFilter,
            OffersDatepickerFrom,
            OffersDatepickerTo
        }
    }
</script>

<style lang="stylus" scoped>
    .offers-control
        display flex

        .offers-control__group-buttons
            position relative
            width 120px
            display flex
            justify-content center
            align-items center
</style>