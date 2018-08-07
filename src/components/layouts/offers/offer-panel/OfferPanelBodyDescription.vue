<template>
    <div class="offer-panel-body-description">
        <p class="description">
            {{ description }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'OfferPanelBodyDescription',
        props: {
            description: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .offer-panel-body-description
        font-family MuseoSansCyrl300
        font-size 16px

        .description
            margin 8px 0 12px 0
</style>