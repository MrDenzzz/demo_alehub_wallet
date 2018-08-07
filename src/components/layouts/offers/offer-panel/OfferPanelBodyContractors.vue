<template>
    <div class="offer-panel-body-contractors">
        <div class="contractor"
             v-for="contractor in offerContractors">
            <div class="contractor-position"
                 :class="calcContractorPositionClass(offerContractorPosition(contractor))">
                {{ offerContractorPosition(contractor) }}
            </div>
            <div class="contractor-name">
                {{ contractor.name }}
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'OfferPanelBodyContractors',
        props: {
            offerContractors: {
                type: Array,
                default: [],
                required: true
            }
        },
        computed: {
            ...mapGetters(
                [
                    'positions'
                ]
            )
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
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .offer-panel-body-contractors
        display flex
        font-family MuseoSansCyrl300
        font-size 14px
        line-height 1.9

        .contractor
            height 25px
            margin-right 16px
            margin-bottom 12px
            display flex

            .contractor-position
                font-weight bold
                padding-left 4px
                padding-right 4px
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