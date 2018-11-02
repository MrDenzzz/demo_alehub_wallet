<template>
    <div class="offer-panel-timeline-grid">
        <div class="dots"
             v-for="interval in intervals">

            <div class="dot"
                 :style="calcDotPosition(interval.from)"
                 :class="calcDotClass(interval.position)">
            </div>
            <div class="dot"
                 :style="calcDotPosition(interval.to)"
                 :class="calcDotClass(interval.position)">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'OfferPanelTimelineGrid',
        props: {
            offerContractors: {
                type: Array,
                required: true
            },
            minTime: {
                type: Number,
                default: 0,
                required: true
            },
            maxTime: {
                type: Number,
                default: 1,
                required: true
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
             * return array of date intervals with contractor's position
             *
             * @return {Array}
             */
            intervals: function () {
                let intervals = [];

                this.offerContractors.forEach(oC =>
                    oC.date.forEach(d =>
                        intervals.push(
                            {
                                position: this.contractorContractors(oC).position,
                                from: d.from,
                                to: d.to
                            }
                        )
                    )
                );

                return intervals;
            }
        },
        data() {
            return {
                key: 1
            }
        },
        methods: {
            /**
             * calculates dot class by contractor's position
             *
             * @param position
             * @return {String}
             */
            calcDotClass: function (position) {
                switch(position.toLowerCase()) {
                    case 'ch':
                        return 'dot-ch';
                    case 'ts':
                        return 'dot-ts';
                    case 'ex':
                        return 'dot-ex';
                    case 'qa':
                        return 'dot-qa';
                    default:
                        return '';
                }
            },
            /**
             * calculates dot position by contractor's time interval
             *
             * @param time
             * @return {String}
             */
            calcDotPosition: function (time) {
                let left = (time - this.minTime) * 100 / (this.maxTime - this.minTime);
                return 'left: ' + left + '%';
            },
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
        },
        mounted() {
        }
    }
</script>

<style lang="stylus" scoped>
    $padding-l = 16px
    $padding-t = 8px

    $dot-ch-b = #ffd24f
    $dot-ts-b = #d26e6e
    $dot-ex-b = #6e9ad2
    $dot-qa-b = #abd26e

    .offer-panel-timeline-grid
        position relative
        width 100%
        height 8px
        display flex
        align-items flex-end

        .dots
            .dot
                position absolute
                bottom 0
                height 3px
                width 3px
                border-radius 50%
                background-color black

                &.dot-ch
                    background-color $dot-ch-b

                &.dot-ts
                    background-color $dot-ts-b

                &.dot-ex
                    background-color $dot-ex-b

                &.dot-qa
                    background-color $dot-qa-b
</style>