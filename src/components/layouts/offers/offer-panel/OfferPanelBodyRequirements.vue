<template>
    <div class="offer-panel-body-requirements">
        <div class="requirements">
            <div class="title">
                {{ $t('components.offerPanelBodyRequirements.title') }}:
            </div>
            <div class="requirement"
                 v-for="requirement in requirements">
                <span>
                    {{ requirement.title }}
                </span>
            </div>
        </div>
        <div class="end-date">
            ends in {{ end }} days
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OfferPanelBodyRequirements',
        props: {
            requirements: {
                type: Array,
                required: true
            },
            end: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .offer-panel-body-requirements
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
                padding-left 6px
                padding-right 6px
                margin-right 14px
                display flex
                align-items center

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
</style>