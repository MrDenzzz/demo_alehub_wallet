<template>
    <div class="offer-panel">
        <div class="offer-panel-wrap">
            <div class="offer-panel-header">
                <h3 class="offer-panel-header-title">
                    {{ offer1.name }}
                </h3>
                <span class="offer-panel-header-price">
                {{ formatPrice(offer1.price) }}
            </span>
            </div>
            <div class="offer-panel-employer">
                <div class="offer-panel-employer-name">
                <span>
                    {{ offer.employer }}
                </span>
                </div>
                <div class="offer-panel-employer-rating">
                <span>
                    {{ offer.rating }}
                </span>
                </div>
            </div>
            <div class="offer-panel-description">
                <p>
                    {{ offer.description }}
                </p>
            </div>
            <div class="offer-panel-requirements">
                <div class="requirements">
                    <div class="title">
                        Requirements:
                    </div>
                    <div class="requirement"
                         v-for="requirement in offer.requirements">
                        <span>
                            {{ requirement.name }}
                        </span>
                    </div>
                </div>
                <div class="end-date">
                    ends in {{ offer.end }} days
                </div>
            </div>
            <div class="offer-panel-contractors">
                <div class="contractor"
                     v-for="contractor in offer.contractors">
                    <span class="contractor-position"
                        :class="calcContractorPositionClass(contractor.position)">
                        {{ contractor.position }}
                    </span>
                    <span class="contractor-name">
                        {{ contractor.name }}
                    </span>
                </div>
            </div>
        </div>
        <div class="offer-panel-timeline">
            <div class="timeline-line"
                 v-for="contractor in offer.contractors"
                 :class="calcLineClass(contractor.position)"
                 :style="calcLineWidth(contractor)">
                <span class="tooltip"
                      :class="calcTooltipClass(contractor.position)">
                    {{ formatDate(contractor.date[0].from )}} - {{ formatDate(contractor.date[0].to) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'OfferPanel',
        props: {
            offer1: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                currency: 'ALE',
                offer: {
                    id: 1,
                    name: 'NodeJS telegram bot',
                    description: 'It is required to develop a telegram for a crypto-currency start-up. It must be done ' +
                    'quickly, beautifully and inexpensively. With us you will receive many invaluable experiences and ' +
                    'pleasant memories.',
                    employer: 'Effective Energy LTD',
                    rating: 9.2,
                    price: '3,200 ALE',
                    requirements: [
                        {
                            id: 1,
                            name: 'JavaScript',
                        },
                        {
                            id: 2,
                            name: 'NodeJS',
                        },
                        {
                            id: 3,
                            name: 'Telegram',
                        },
                        {
                            id: 4,
                            name: 'Bot',
                        },
                        {
                            id: 5,
                            name: 'High skills',
                        }
                    ],
                    end: 18,
                    contractors: [
                        {
                            id: 1,
                            name: 'First',
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
                            name: 'Second',
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
                            name: 'Third',
                            position: 'EX',
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
            /**
             * calculates the width and indentation of the block based on the contractor's data
             *
             * @param contractor
             * @returns {string}
             */
            calcLineWidth: function (contractor) {
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

                return 'width:' + width + '%' + ';' + 'margin-left: ' + start + '%';
            },
            calcLineClass: function (position) {
                switch (position.toLowerCase()) {
                    case 'ch':
                        return 'timeline-line-ch';
                    case 'ts':
                        return 'timeline-line-ts';
                    case 'ex':
                        return 'timeline-line-ex';
                    case 'qa':
                        return 'timeline-line-qa';
                    default:
                        return '';
                }
            },
            /**
             * selects a class based on contractor data
             *
             * @param position
             */
            calcContractorPositionClass: function (position) {
                switch (position.toLowerCase()) {
                    case 'ch':
                        return 'contractor-position-ch';
                    case 'ts':
                        return 'contractor-position-ts';
                    case 'ex':
                        return 'contractor-position-ex';
                    case 'qa':
                        return 'contractor-position-qa';
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
            formatPrice: function (price) {
                return price.toLocaleString(this.$i18n.locale) + ' ' + this.currency;
            },
            /**
             *
             *
             * @param position
             * @returns {string}
             */
            calcTooltipClass: function (position) {
                switch (position.toLowerCase()) {
                    case 'ch':
                        return 'tooltip-ch';
                    case 'ts':
                        return 'tooltip-ts';
                    case 'ex':
                        return 'tooltip-ex';
                    case 'qa':
                        return 'tooltip-qa';
                    default:
                        return '';
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    $margin-bottom = 16px

    .offer-panel
        width 100%
        padding 16px 0 0 0
        background-color #f0f0f0
        margin-bottom $margin-bottom

        .offer-panel-wrap
            padding 0 16px

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
                    height 30px

                .offer-panel-employer-name
                    font-size 18px
                    line-height 1.33
                    opacity .8
                    display flex
                    align-items center

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

            .offer-panel-description
                font-family MuseoSansCyrl300
                font-size 16px

                p
                    margin 8px 0 12px 0

            .offer-panel-requirements
                display flex
                align-items center
                justify-content space-between
                margin-bottom 10px

                .requirements
                    display flex

                    .title
                        font-family MuseoSansCyrl500
                        line-height 1.5
                        font-size 16px
                        color #34343e
                        margin-right 14px

                    .requirement
                        font-family MuseoSansCyrl500
                        background-color #dedfdf
                        border-radius 2px
                        padding 2px 6px
                        margin-right 14px

                        span
                            font-size 12px
                            color #0d1717
                            opacity .8

                .end-date
                    font-family MuseoSansCyrl300
                    color #34343e
                    font-size 16px
                    text-align right
                    opacity .6

            .offer-panel-contractors
                display flex
                font-family MuseoSansCyrl300
                font-size 14px
                line-height 1.9

                .contractor
                    height 30px
                    margin-right 16px
                    margin-bottom 12px

                    .contractor-position
                        font-weight bold
                        padding 2px 4px
                        border-radius 2px

                        &.contractor-position-ch
                            background-color #ffd24f

                        &.contractor-position-ts
                            background-color #d26e6e

                        &.contractor-position-ex
                            background-color #6e9ad2

                        &.contractor-position-qa
                            background-color #abd26e

                    .contractor-name
                        margin-left 8px

    .offer-panel-timeline
        width 100%
        padding 8px 16px
        height 70px
        background-color #e8e8e8
        display flex
        flex-direction column

        .timeline-line
            height 12px
            display block
            position relative

            &.timeline-line-ch
                background #ffd24f
                transition background 5s ease

                /*&:hover
                    background repeating-linear-gradient(
                            -55deg,
                            #ffd24f,
                            #ffd24f 10px,
                            #b7aa83 10px,
                            #b7aa83 20px
                    );*/

            &.timeline-line-ts
                background #d26e6e

                /*&:hover
                    background repeating-linear-gradient(
                            -55deg,
                            #d26e6e,
                            #d26e6e 10px,
                            #9a5f5f 10px,
                            #9a5f5f 20px
                    );*/

            &.timeline-line-ex
                background #6e9ad2

                /*&:hover
                    background repeating-linear-gradient(
                            -55deg,
                            #6e9ad2,
                            #6e9ad2 10px,
                            #5f7592 10px,
                            #5f7592 20px
                    );*/

            &.timeline-line-qa
                background #abd26e

                /*&:hover
                    background repeating-linear-gradient(
                            -55deg,
                            #abd26e,
                            #abd26e 10px,
                            #89a065 10px,
                            #89a065 20px
                    );*/

            &:hover
                .tooltip
                    /*visibility visible*/
                    height auto
                    opacity 1
                    padding-top 5px
                    padding-bottom 5px

            .tooltip
                /*visibility hidden*/
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