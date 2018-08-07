<template>
    <div class="offer-panel">
        <div class="offer-panel-wrap">
            <offer-panel-header :offer-name="offer.name"
                                :offer-price="offer.price"/>


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
                    {{ offer.description }}
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
                    ends in {{ offer.end }} days
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

        <offer-panel-timeline :offer-contractors="offer.contractors"/>
    </div>
</template>

<script>
    import OfferPanelHeader from './offer-panel/OfferPanelHeader';
    import OfferPanelBody from './offer-panel/OfferPanelBody';
    import OfferPanelTimeline from './offer-panel/OfferPanelTimeline';

    import formatPriceModule from '../../../modules/FormatPrice';

    import {mapGetters} from 'vuex';

    export default {
        name: 'OfferPanel',
        components: {
            OfferPanelHeader,
            OfferPanelBody,
            OfferPanelTimeline
        },
        props: {
            offer: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                currency: 'ALE',
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
                    return emp.id === this.offer.employerId;
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
                this.offer.requirements.forEach(offReq => {
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
                this.offer.contractors.forEach(offConts => {
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
                return formatPriceModule(price, this.currency, this.$i18n.locale);
            }
        },
        mounted() {

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