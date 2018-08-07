<template>
    <div class="offer-panel-timeline">
        <div class="line" v-for="contractor in offerContractors">
            <div class="segment"
                 v-for="date in contractor.date"
                 :class="calcLineClass(contractorContractors(contractor).position)"
                 :style="calcLineWidth(contractor.id, date)">
                <span class="tooltip"
                      :class="calcTooltipClass(contractorContractors(contractor).position)">
                  {{ formatDate(date.from) }} - {{ formatDate(date.to) }}
                </span>
            </div>
        </div>

        <offer-panel-timeline-grid :offer-contractors="offerContractors"
                                   :min-time="minTime"
                                   :max-time="maxTime"/>
    </div>
</template>

<script>
    import OfferPanelTimelineGrid from './OfferPanelTimelineGrid';

    import {mapGetters} from 'vuex';

    import moment from 'moment';

    export default {
        name: 'OfferPanelTimeline',
        components: {
            OfferPanelTimelineGrid
        },
        props: {
            offerContractors: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                lines: [],
                classes: {
                    segment: {
                        ch: 'segment-ch',
                        ts: 'segment-ts',
                        ex: 'segment-ex',
                        qa: 'segment-qa'
                    },
                    tooltip: {
                        ch: 'tooltip-ch',
                        ts: 'tooltip-ts',
                        ex: 'tooltip-ex',
                        qa: 'tooltip-qa'
                    }
                }
            }
        },
        computed: {
            ...mapGetters(
                [
                    'contractors',
                    'positions'
                ]
            ),
            /**
             * calculating the minimum time on the timeline
             *
             * @returns {Number}
             */
            minTime: function () {
                let min = 9007199254740991;

                this.offerContractors.forEach(offerContractor => {
                    offerContractor.date.forEach(date => {
                        if (date.from < min)
                            min = date.from;
                    });
                });

                return min;
            },
            /**
             * calculating the maximum time on the timeline
             *
             * @returns {Number}
             */
            maxTime: function () {
                let max = 0;

                this.offerContractors.forEach(offerContractor => {
                    offerContractor.date.forEach(date => {
                        if (date.to > max)
                            max = date.to;
                    });
                });

                return max;
            }
        },
        methods: {
            /**
             * return contractor object
             *
             * @param contractor
             * @return {Object}
             */
            contractorContractors: function (contractor) {
                let tmpC = this.contractors.find(c => c.id === contractor.contractorId);
                return {
                    id: contractor.id,
                    name: tmpC.name,
                    position: this.contractorPosition(tmpC),
                    date: contractor.date
                }
            },
            /**
             * return contractor position
             *
             * @param contractor
             * @return {String}
             */
            contractorPosition: function (contractor) {
                return this.positions.find(p => p.id === contractor.positionId).title;
            },
            /**
             * calculates the width and indentation of the block based on the contractor's date
             *
             * @param id
             * @param date
             * @returns {string}
             */
            calcLineWidth: function (id, date) {
                let width = (date.to - date.from) * 100 / (this.maxTime - this.minTime),
                    start = (date.from - this.minTime) * 100 / (this.maxTime - this.minTime);

                return 'width:' + width + '%' + ';' + 'left: ' + start  + '%';
            },
            /**
             * calculates the class of timeline line's based on the contractor's position
             *
             * @param position
             * @returns {string}
             */
            calcLineClass: function (position) {
                switch (position.toLowerCase()) {
                    case 'ch':
                        return this.classes.segment.ch;
                    case 'ts':
                        return this.classes.segment.ts;
                    case 'ex':
                        return this.classes.segment.ex;
                    case 'qa':
                        return this.classes.segment.qa;
                    default:
                        return '';
                }
            },
            /**
             * calculates the class of timeline line's tooltip based on the contractor's position
             *
             * @param position
             * @returns {string}
             */
            calcTooltipClass: function (position) {
                switch (position.toLowerCase()) {
                    case 'ch':
                        return this.classes.tooltip.ch;
                    case 'ts':
                        return this.classes.tooltip.ts;
                    case 'ex':
                        return this.classes.tooltip.ex;
                    case 'qa':
                        return this.classes.tooltip.qa;
                    default:
                        return '';
                }
            },
            /**
             * format raw date
             *
             * @param date
             * @returns {string}
             */
            formatDate: function (date) {
                return moment(date).format('Do MMM YYYY');
            },
        }
    }
</script>

<style lang="stylus" scoped>
    $timeline-p-t-b = 8px
    $timeline-p-l-r = 16px
    $timeline-h = 82px
    $timeline-b = #e8e8e8

    $line-h = 12px

    $line-ch-b = #ffd24f
    $line-ts-b = #d26e6e
    $line-ex-b = #6e9ad2
    $line-qa-b = #abd26e

    $tooltip-top = 12px
    $tooltip-color = #ffffff
    $tooltip-f-s = 11px
    $tooltip-border-r = 0 0 6px 6px

    $tooltip-ch = #b7aa83
    $tooltip-ts = #9a5f5f
    $tooltip-ex = #5f7592
    $tooltip-qa = #89a065

    .offer-panel-timeline
        width 100%
        padding-top $timeline-p-t-b
        padding-bottom $timeline-p-t-b
        padding-left $timeline-p-l-r
        padding-right $timeline-p-l-r
        background-color $timeline-b
        display flex
        flex-direction column
        position relative

        .line
            position relative
            height $line-h
            width 100%
            display flex

            .segment
                height 100%
                display block
                position absolute

                &.segment-ch
                    background $line-ch-b

                &.segment-ts
                    background $line-ts-b

                &.segment-ex
                    background $line-ex-b

                &.segment-qa
                    background $line-qa-b

                &:hover
                    .tooltip
                        height auto
                        opacity 1
                        padding-top 5px
                        padding-bottom 5px

                .tooltip
                    opacity 0
                    top $tooltip-top
                    color $tooltip-color
                    font-size $tooltip-f-s
                    border-radius $tooltip-border-r
                    font-family MuseoSansCyrl300
                    text-align center
                    padding 0 10px
                    position absolute
                    z-index 1
                    height 0
                    transition all .3s linear

                    &.tooltip-ch
                        background-color $tooltip-ch

                    &.tooltip-ts
                        background-color $tooltip-ts

                    &.tooltip-ex
                        background-color $tooltip-ex

                    &.tooltip-qa
                        background-color $tooltip-qa
</style>