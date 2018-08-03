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
                    {{ offerEmployerName }}
                </span>
                </div>
                <div class="offer-panel-employer-rating">
                <span>
                    {{ offerEmployerRating }}
                </span>
                </div>
            </div>
            <div class="offer-panel-description">
                <p>
                    {{ offer1.description }}
                </p>
            </div>
            <div class="offer-panel-requirements">
                <div class="requirements">
                    <div class="title">
                        Requirements:
                    </div>
                    <div class="requirement"
                         v-for="requirement in offerRequirements">
                        <span>
                            {{ requirement.title }}
                        </span>
                    </div>
                </div>
                <div class="end-date">
                    ends in {{ offer1.end }} days
                </div>
            </div>
            <div class="offer-panel-contractors">
                <div class="contractor"
                     v-for="contractor in offerContractors">
                    <span class="contractor-position"
                        :class="calcContractorPositionClass(offerContractorPosition(contractor))">
                        {{ offerContractorPosition(contractor) }}
                    </span>
                    <span class="contractor-name">
                        {{ contractor.name }}
                    </span>
                </div>
            </div>
        </div>
        <offer-panel-timeline :contractors="offer.contractors"/>
    </div>
</template>

<script>
    import OfferPanelTimeline from './offer-panel/OfferPanelTimeline';

    import {mapGetters} from 'vuex';

    export default {
        name: 'OfferPanel',
        components: {
            OfferPanelTimeline
        },
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
        computed: {
            ...mapGetters(
                [
                    'employers',
                    'positions',
                    'contractors',
                    'requirements',
                    'conditions'
                ]
            ),
            /**
             * get offer employer data
             *
             * @returns {Object}
             */
            offerEmployer: function () {
                return this.employers.find(emp => {
                    return emp.id === this.offer1.employerId;
                });
            },
            /**
             * get offer employer name
             *
             * @returns {String}
             */
            offerEmployerName: function () {
                return this.offerEmployer.name;
            },
            /**
             * get offer employer rating
             *
             * @returns {Number}
             */
            offerEmployerRating: function () {
                return this.offerEmployer.rating;
            },
            /**
             * get requirements offer data
             *
             * @returns {Array}
             */
            offerRequirements: function () {
                let reqs = [];
                this.offer1.requirements.forEach(offReq => {
                    let tmpReq = this.requirements.find(req => {
                        return offReq.requirementId === req.id;
                    });

                    if (tmpReq)
                        reqs.push(tmpReq);
                });
                return reqs;
            },
            /**
             * get offer contractors data
             *
             * @returns {Array}
             */
            offerContractors: function () {
                let contractors = [];
                this.offer1.contractors.forEach(offConts => {
                    let tmpConts = this.contractors.find(conts => {
                        return offConts.contractorId === conts.id;
                    });

                    contractors.push(tmpConts);
                });
                return contractors;
            }
        },
        methods: {
            /**
             * get offer contractor position title
             *
             * @returns {String}
             */
            offerContractorPosition: function (contractor) {
                return this.positions.find(position => {
                    return position.id === contractor.positionId;
                }).title;
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
            formatPrice: function (price) {
                return price.toLocaleString(this.$i18n.locale) + ' ' + this.currency;
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
                        text-transform uppercase

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
</style>