<template>
    <div class="offer-panel">
        <div class="offer-panel-wrap">
            <offer-panel-header :offer-name="offer.name"
                                :offer-price="offer.price"/>

            <offer-panel-body :offer-employer-name="offerEmployerName"
                              :offer-employer-rating="offerEmployerRating"
                              :offer-description="offer.description"
                              :offer-requirements="offerRequirements"
                              :offer-end="offer.end"
                              :offer-contractors="offerContractors"
                              :offer-saved="offer.saved"
                              :offer-id="offer.id"/>
        </div>

        <offer-panel-timeline :offer-contractors="offer.contractors"/>
    </div>
</template>

<script>
    import OfferPanelHeader from './OfferPanelHeader';
    import OfferPanelBody from './OfferPanelBody';
    import OfferPanelTimeline from './OfferPanelTimeline';

    import {mapGetters} from 'vuex';

    export default {
        name: 'OfferPanel',
        components: {
            OfferPanelHeader,
            OfferPanelBody,
            OfferPanelTimeline,

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
                this.offer.contractors.forEach(oC => {
                    let tC = this.contractors.find(c => {
                        return oC.contractorId === c.id;
                    });

                    contractors.push(tC);
                });
                return contractors;
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
</style>