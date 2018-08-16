<template>
    <div class="offer-panel-body-contractors">
        <div class="contractor"
             v-for="contractor in offerContractors">
            <div class="contractor-position"
                 :class="calcContractorPositionClass(offerContractorPosition(contractor))">
                {{ offerContractorPosition(contractor) }}
            </div>
            <div class="contractor-name"
                 @click="toggleContractorPanel(contractor.id)">
                {{ contractor.name }}
                <offer-panel-contractor-dialog v-if="checkContractorPanelOpened(contractor.id)"
                                               :contractor="contractor"/>
            </div>
        </div>
    </div>
</template>

<script>
    import OfferPanelContractorDialog from './OfferPanelContractorDialog';

    import {mapGetters} from 'vuex';

    export default {
        name: 'OfferPanelBodyContractors',
        components: {
            OfferPanelContractorDialog
        },
        props: {
            offerContractors: {
                type: Array,
                default: [],
                required: true
            }
        },
        data() {
            return {
                panels: []
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
            },
            /**
             * check contractor panel opened by contractor id
             *
             * @param id
             * @returns {*}
             */
            checkContractorPanelOpened: function (id) {
                return this.panels.find(p => p.id === id).opened;
            },
            /**
             * toggle contractor panel by contractor id
             *
             * @param id
             */
            toggleContractorPanel: function (id) {
                this.panels.find(p => p.id === id).opened = !this.panels.find(p => p.id === id).opened;
            }
        },
        created() {
            this.offerContractors.forEach(oC => {
                this.panels.push({id: oC.id, opened: false});
            });
        }
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
                cursor pointer
                margin-left 8px

                &:hover
                    font-weight 700
</style>