<template>
    <div class="offer-panel-header">
        <h3 class="offer-panel-header-title" @click="goToOffer(offerId)">
            {{ offerName }}
        </h3>
        <h3 class="offer-panel-header-price">
            {{ formatPrice(offerPrice) }}
        </h3>
    </div>
</template>

<script>
    import formatPriceModule from '../../../../modules/FormatPrice';

    export default {
        name: 'OfferPanelHeader',
        props: {
            offerName: {
                type: String,
                default: 'Default offer name',
                required: true
            },
            offerPrice: {
                type: Number,
                default: 1,
                required: true
            },
            offerId: {
                type: Number,
                default: 0,
                required: true
            }
        },
        data() {
            return {
                currency: 'ALE'
            }
        },
        methods: {
            /**
             * format price
             *
             * @param price
             * @returns {string}
             */
            formatPrice: function(price) {
                return formatPriceModule(price, this.currency, this.$i18n.locale);
            },
            goToOffer: function (id) {
                this.$router.push(`/offer/${id}`)
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .offer-panel-header
        display flex
        justify-content space-between
        align-items flex-start
        height 30px

        .offer-panel-header-title,
        .offer-panel-header-price
            font-family MuseoSansCyrl500
            font-size 18px
            line-height 1.33
            color #34343e
            margin 0

        .offer-panel-header-title
            cursor pointer

        .offer-panel-header-price
            font-weight bold
            text-align right
</style>