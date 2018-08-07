<template>
    <div class="offer-panel-body">
        <offer-panel-body-employer :employer-name="offerEmployerName"
                                   :employer-rating="offerEmployerRating"/>

        <offer-panel-body-description :description="offerDescription"/>
    </div>
</template>

<script>
    import OfferPanelBodyEmployer from './OfferPanelBodyEmployer';
    import OfferPanelBodyDescription from './OfferPanelBodyDescription';

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
            }
        },
        components: {
            OfferPanelBodyEmployer,
            OfferPanelBodyDescription
        }
    }
</script>

<style lang="stylus" scoped>

</style>