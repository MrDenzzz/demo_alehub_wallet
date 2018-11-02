<template>
    <div class="offers-pagination">
        <div class="pagination-button button-prev">
            <img src="../../../../static/img/arrows/arrow-left.svg"
                 alt="button prev">
        </div>
        <div class="pagination-button button-item">
            <span>
                1
            </span>
        </div>
        <div class="pagination-button button-next">
            <img src="../../../../static/img/arrows/arrow-right.svg"
                 alt="button next">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OffersPagination',
        props: {
            numberOffers: {
                type: [Number, String],
                default: 3,
                required: true
            },
        },
        data() {
            return {

            }
        },
        methods: {
            name: function () {

            }
        },
    }
</script>

<style lang="stylus" scoped>
    .offers-pagination
        display flex
        align-items center

        .pagination-button
            cursor pointer
            height 24px
            min-width 24px
            display flex
            justify-content center
            align-items center

            &:hover
                background-color #ffdd78

            img
                height 14px

            span
                font-family MuseoSansCyrl500
                color #34343e
                font-size 16px

            &.button-item
                padding 3px 8px
</style>