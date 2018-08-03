<template>
    <div class="offers-panel-suggest-new-offer">
        <span class="title">
            {{ $t('components.offersPanelSuggestNewOffer.title') }}
        </span>
        <button class="buttons btn-yellow">
            {{ $t('components.offersPanelSuggestNewOffer.button') }}
        </button>
    </div>
</template>

<script>
    export default {
        name: 'OffersPanelSuggestNewOffer'
    }
</script>

<style lang="stylus" scoped>
    $container-background = #f0f0f0
    $container-m-t = 46px
    $container-p = 16px

    $color = #34343e
    $line-height = 1.25
    $font-size = 16px
    $title-m-b = 12px

    .offers-panel-suggest-new-offer
        display flex
        flex-direction column
        align-items center
        background-color $container-background
        margin-top $container-m-t
        padding $container-p

        .title
            font-family MuseoSansCyrl500
            font-size $font-size
            color $color
            line-height $line-height
            margin-bottom $title-m-b

        .buttons
            font-size $font-size
            color $color
            line-height $line-height
            width 100%
            margin-bottom 0



</style>