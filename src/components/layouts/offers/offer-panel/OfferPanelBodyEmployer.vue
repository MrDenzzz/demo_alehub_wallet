<template>
    <div class="offer-panel-body-employer">
        <div class="main-body">
            <h3 class="name">
                {{ employerName }}
            </h3>
            <div class="rating">
                {{ employerRating }}
            </div>
        </div>
        
        <div class="save"
            :class="{saved: saved}"
            @click="saveOffer(offerId)"></div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: 'OfferPanelBodyEmployer',
        props: {
            employerName: {
                type: String,
                required: true
            },
            employerRating: {
                type: [String, Number],
                required: true
            },
            saved: {
                type: Boolean,
                required: false
            },
            offerId: {
                type: Number,
                required: false
            }
        },
        methods: {
            ...mapMutations({
                saveOffer: 'saveOffer'
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .offer-panel-body-employer
        justify-content space-between

    .offer-panel-body-employer, .main-body
        display flex
        align-items center

        .name, .rating
            font-family MuseoSansCyrl500
            color #34343e
            height 30px

        .name
            font-size 18px
            font-weight 300
            line-height 1.33
            opacity .8
            display flex
            align-items center
            margin 0

        .rating
            background-color #ffd24f
            border-radius 2px
            height 16px
            margin-left 14px
            padding 4px 6px 2px 6px
            font-size 11px
            font-weight bold
            display flex
            align-items center

        .save
            background url(../../../../../static/img/star-off.svg)
            background-size contain
            background-repeat no-repeat
            background-position center
            width 16px
            height 16px
            cursor pointer

            &.saved
                background url(../../../../../static/img/star-on.svg)
                background-size contain
                background-repeat no-repeat
                background-position center
</style>