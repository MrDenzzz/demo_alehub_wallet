<template>
    <div class="offer-panel">
        <div class="offer-panel-header">
            <h3 class="offer-panel-header-title">
                {{ offer.name }}
            </h3>
            <span class="offer-panel-header-price">
                {{ offer.price }}
            </span>
        </div>
        <div class="offer-panel-employer">
            <span class="offer-panel-employer-name">
                {{ offer.employer }}
            </span>
            <div class="offer-panel-employer-rating">
                <span>
                    {{ offer.rating }}
                </span>
            </div>
        </div>
        <div class="row">
            <div v-for="contractor in offer.contractors">
                {{ contractor.position }}
                {{ contractor.name }}
            </div>
        </div>
        <div class="row">
            <div class="timeline">
                <div class="timeline-line"
                     v-for="contractor in offer.contractors"
                     :style="calcLine(contractor)">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OfferPanel',
        props: {},
        data() {
            return {
                offer: {
                    id: 1,
                    name: 'NodeJS telegram bot',
                    employer: 'Effective Energy LTD',
                    rating: 9.2,
                    price: '3,200 ALE',
                    contractors: [
                        {
                            id: 1,
                            name: 'Third',
                            position: 'CH',
                            date: [
                                {
                                    from: 1524571843000,
                                    to: 1524744643000
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'First',
                            position: 'TS',
                            date: [
                                {
                                    from: 1524644643000,
                                    to: 1525119843000
                                }
                            ]
                        },
                        {
                            id: 3,
                            name: 'Second',
                            position: 'TS EX',
                            date: [
                                {
                                    from: 1525003843000,
                                    to: 1525954243000
                                }
                            ]
                        },
                        {
                            id: 4,
                            name: 'Fourth',
                            position: 'QA',
                            date: [
                                {
                                    from: 1525522243000,
                                    to: 1526213443000
                                }
                            ]
                        }
                    ]
                }
            }
        },
        computed: {},
        methods: {
            calcLine: function (contractor) {
                let min = 9007199254740991,
                    max = 0,
                    color = '#f0f0f0';

                this.offer.contractors.forEach(offerContractor => {
                    if (offerContractor.date[0].from < min)
                        min = offerContractor.date[0].from;

                    if (offerContractor.date[0].to > max)
                        max = offerContractor.date[0].to;
                });

                let width = (contractor.date[0].to - contractor.date[0].from) * 100 / (max - min),
                    start = (contractor.date[0].from - min) * 100 / (max - min);

                switch (contractor.position) {
                    case 'Check':
                        color = '#ffd24f';
                        break;
                    case 'TS':
                        color = '#d26e6e';
                        break;
                    case 'TS EX':
                        color = '#6e9ad2';
                        break;
                    case 'QA':
                        color = '#abd26e';
                        break;
                    default:
                        color = '#f0f0f0';
                }

                return 'width:' + width + '%' + ';' + 'margin-left: ' + start + '%' + ';' + 'background-color: ' + color;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .offer-panel
        width 100%
        padding 16px
        background-color #f0f0f0

        .offer-panel-header
            display flex
            justify-content space-between
            align-items center

            .offer-panel-header-title
                font-family MuseoSansCyrl500
                font-size 18px
                line-height 1.33
                color #34343e
                height 30px
                margin 0

            .offer-panel-header-price
                height 24px
                font-family MuseoSansCyrl500
                font-size 18px
                font-weight bold
                line-height 1.33
                text-align right
                color #34343e

        .offer-panel-employer
            display flex
            align-items center

            .offer-panel-employer-name, .offer-panel-employer-rating
                font-family MuseoSansCyrl500
                color #34343e

            .offer-panel-employer-name
                font-size 18px
                line-height 1.33
                opacity .8
                height 24px

            .offer-panel-employer-rating
                background-color #ffd24f
                border-radius 2px
                height 16px
                margin-left 14px
                padding 4px 6px 2px 6px
                font-size 11px
                font-weight bold
                display flex
                align-items center

        .row
            display flex

    .timeline
        width 100%
        height 48px
        display flex
        flex-direction column

        .timeline-line
            height 12px
            display block
</style>