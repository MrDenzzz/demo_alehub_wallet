<template>
    <div class="offer-panel-body">
        <offer-panel-body-employer :employer-name="offerEmployerName"
                                   :employer-rating="offerEmployerRating"
                                   :saved="offerSaved"
                                   :offer-id="offerId"/>

        <offer-panel-body-description :description="offerDescription"/>

        <offer-panel-body-requirements :requirements="offerRequirements"
                                       :end="offerEnd"/>

        <offer-panel-body-contractors :offer-contractors="offerContractors"/>
    </div>
</template>

<script>
    import OfferPanelBodyEmployer from './OfferPanelBodyEmployer';
    import OfferPanelBodyDescription from './OfferPanelBodyDescription';
    import OfferPanelBodyRequirements from './OfferPanelBodyRequirements';
    import OfferPanelBodyContractors from './OfferPanelBodyContractors';

    export default {
        name: 'OfferPanelBody',
        props: {
            offerEmployerName: {
                type: String,
                default: 'Default employer name',
                required: true
            },
            offerEmployerRating: {
                type: [String, Number],
                default: 0,
                required: true
            },
            offerDescription: {
                type: String,
                default: 'Default offer description',
                required: true
            },
            offerRequirements: {
                type: Array,
                default: [],
                required: true
            },
            offerEnd: {
                type: [String, Number],
                default: 'Default offer end',
                required: true
            },
            offerContractors: {
                type: Array,
                default: [],
                required: true
            },
            offerSaved: {
                type: Boolean,
                default: false,
                required: false
            },
            offerId: {
                type: Number,
                default: 0,
                required: false
            }
        },
        components: {
            OfferPanelBodyEmployer,
            OfferPanelBodyDescription,
            OfferPanelBodyRequirements,
            OfferPanelBodyContractors
        }
    }
</script>

<style lang="stylus" scoped>

</style>