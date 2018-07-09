<template>
    <div class="offers-control">
        <offers-control-line/>
    </div>
    <!--<div class="vertical-progress">-->
        <!--<div class="circle circle-top circle-yellow">-->
            <!--<div class="triangle-icon"></div>-->
        <!--</div>-->

        <!--<div class="whole-line">-->
            <!--<div class="selected-area">-->
                <!--<div class="marker-calendar marker-calendar-top"-->
                     <!--@click="openedFromDatepicker = !openedFromDatepicker">-->
                    <!--<div class="block">-->
                        <!--<img src="../../static/img/calendar-ic_black.svg"-->
                             <!--alt="date from" width="16px" height="16px">-->
                        <!--<div class="triangle"></div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<datepicker id="dateOffersFrom"-->
                            <!--class="dateOffersFrom"-->
                            <!--v-if="openedFromDatepicker"-->
                            <!--v-model="offersDateFrom"-->
                            <!--:language="$t('modals.pdf.lang')"-->
                            <!--:inline="true"/>-->

                <!--<div class="marker-calendar marker-calendar-bottom"-->
                     <!--@click="openedToDatepicker = !openedToDatepicker">-->
                    <!--<div class="block">-->
                        <!--<img src="../../static/img/calendar-ic_black.svg"-->
                             <!--alt="date to" width="16px" height="16px">-->
                        <!--<div class="triangle"></div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<datepicker id="dateOffersTo"-->
                            <!--class="dateOffersTo"-->
                            <!--:style="{ 'top': getSelectedAreaHeight }"-->
                            <!--v-if="openedToDatepicker"-->
                            <!--v-model="offersDateTo"-->
                            <!--:language="$t('modals.pdf.lang')"-->
                            <!--:inline="true"/>-->
            <!--</div>-->
            <!--<div class="dividers-container">-->
                <!--<div class="divider horizontal"-->
                     <!--v-for="n in 8" :key="n">-->
                <!--</div>-->
            <!--</div>-->


            <!--<div id="enable-filters"-->
                 <!--class="circle circle-big circle-yellow circle-main"-->
                 <!--@click="toggleGroupFilterButtons">-->
                <!--<img src="../../static/img/ale-logo.svg"-->
                     <!--alt="ale logo" width="21px" height="25px">-->
                <!--<div class="triangle">-->


                <!--</div>-->
            <!--</div>-->

        <!--</div>-->

        <!--<group-filter-buttons :enabled="enabledGroupFilterButtons"-->
                              <!--:filterElementOptions="changedFilterElementOptions"/>-->

        <!--<offers-filter v-if="filter.opened"-->
                       <!--:type-id="filter.typeId"-->
                       <!--:offset-top="filterOffsetTop()"/>-->

        <!--<offers-filter-folded v-for="filter in filters"-->
                              <!--v-if="filter.folded"-->
                              <!--:key="filter.id"-->
                              <!--:id="filter.id"-->
                              <!--:title="filter.title"-->
                              <!--:queue="filter.queue"/>-->

        <!--<div class="circle circle-bottom circle-green">-->
            <!--<img src="../../static/img/icons-for-circle/infinity.svg"-->
                 <!--alt="infinity" width="12px" height="6px">-->
            <!--<div class="triangle">-->
                <!--<group-status-buttons/>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    import OffersFilter from './OffersFilter';
    import OffersGroupFilterButtons from './OffersGroupFilterButtons';
    import OffersGroupStatusButtons from './OffersGroupStatusButtons';
    import OffersControlLine from './OffersControlLine';
    import OffersControlToggleFilter from './OffersControlToggleFilter';

    export default {
        name: 'OffersControl',
        components: {
            OffersFilter,
            OffersGroupFilterButtons,
            OffersGroupStatusButtons,
            OffersControlLine,
            OffersControlToggleFilter
        }
    }
</script>

<style lang="stylus" scoped>

</style>