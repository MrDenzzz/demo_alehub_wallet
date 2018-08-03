<template>
    <div class="offer-panel-timeline">
        <div class="grid">
            <div class="grid-line"
                 v-for="i in contractors.length + 1">
                <div class="grid-segment" v-for="i in 10">
                    <span class="dot"></span>
                    <span class="line"></span>
                </div>
            </div>
        </div>
        <div class="line"
             v-for="contractor in contractors"
             :class="calcLineClass(contractor.position)"
             :style="calcLineWidth(contractor)">
            <span class="tooltip"
                  :class="calcTooltipClass(contractor.position)">
              {{ formatDate(contractor.date[0].from) }} - {{ formatDate(contractor.date[0].to) }}
            </span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'OfferPanelTimeline',
        props: {
            contractors: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                classes: {
                    line: {
                        ch: 'line-ch',
                        ts: 'line-ts',
                        ex: 'line-ex',
                        qa: 'line-qa'
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
            /**
             * calculating the minimum time on the timeline
             *
             * @returns {Number}
             */
            minTime: function () {
                let min = 9007199254740991;

                this.contractors.forEach(offerContractor => {
                    if (offerContractor.date[0].from < min)
                        min = offerContractor.date[0].from;
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

                this.contractors.forEach(offerContractor => {
                    if (offerContractor.date[0].to > max)
                        max = offerContractor.date[0].to;
                });

                return max;
            }
        },
        methods: {
            calcNumDot: function (i) {
                if (i === this.contractors.length)
                    return 20;
                return 10;
            },
            calcDotPosition: function (n) {
                let lineHeight = 12,
                    gridWidth = 900;

                return 'left:' + gridWidth;
            },
            /**
             * calculates the width and indentation of the block based on the contractor's data
             *
             * @param contractor
             * @returns {string}
             */
            calcLineWidth: function (contractor) {
                let width = (contractor.date[0].to - contractor.date[0].from) * 100 / (this.maxTime - this.minTime),
                    start = (contractor.date[0].from - this.minTime) * 100 / (this.maxTime - this.minTime);

                return 'width:' + width + '%' + ';' + 'margin-left: ' + start + '%';
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
                        return this.classes.line.ch;
                    case 'ts':
                        return this.classes.line.ts;
                    case 'ex':
                        return this.classes.line.ex;
                    case 'qa':
                        return this.classes.line.qa;
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
    $timeline-h = 70px
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
        height $timeline-h
        background-color $timeline-b
        display flex
        flex-direction column
        position relative

        .grid
            position absolute
            width "calc(100% - %s * 2)" % $timeline-p-l-r
            height "calc(100% - %s * 2)" % $timeline-p-t-b

            .grid-line
                position relative
                height 11.5px
                display flex
                justify-content space-between
                align-items flex-start

                .grid-segment
                    height 3px
                    display flex
                    align-items center
                    width calc(100% / 9)

                    .line
                        z-index 1
                        height 1px
                        width calc(100% - 2px)
                        background-color black

                    .dot
                        z-index 1
                        height 3px
                        width 3px
                        background-color black
                        border-radius 50%

        .line
            height $line-h
            display block
            position relative

            &.line-ch
                background $line-ch-b

            &.line-ts
                background $line-ts-b

            &.line-ex
                background $line-ex-b

            &.line-qa
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