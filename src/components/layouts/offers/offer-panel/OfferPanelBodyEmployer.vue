<template>
    <div class="offer-panel-body-employer">
        <h3 class="name">
            {{ employerName }}
        </h3>
        <div class="rating">
            {{ employerRating }}
        </div>
    </div>
</template>

<script>
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
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .offer-panel-body-employer
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
</style>