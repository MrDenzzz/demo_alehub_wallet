<template>
    <div class="offer-panel-timeline">
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
    .offer-panel-timeline
        width 100%
        padding 8px 16px
        height 70px
        background-color #e8e8e8
        display flex
        flex-direction column

        .line
            height 12px
            display block
            position relative

            &.line-ch
                background #ffd24f
                transition background 5s ease

            &.line-ts
                background #d26e6e

            &.line-ex
                background #6e9ad2

            &.line-qa
                background #abd26e

            &:hover
                .tooltip
                    height auto
                    opacity 1
                    padding-top 5px
                    padding-bottom 5px

            .tooltip
                opacity 0
                top 12px
                background-color black
                color #fff
                font-size 11px
                font-family MuseoSansCyrl300
                text-align center
                border-radius 0 0 6px 6px
                padding 0 10px
                position absolute
                z-index 1
                height 0
                transition all .3s linear

                &.tooltip-ch
                    background-color #b7aa83

                &.tooltip-ts
                    background-color #9a5f5f

                &.tooltip-ex
                    background-color #5f7592

                &.tooltip-qa
                    background-color #89a065
</style>