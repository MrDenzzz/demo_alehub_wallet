<template>
    <div class="form-group">
        <label>
            {{ $t('offersFilter.rating.title') }}
        </label>
        <div class="double-input-block">
            <div class="double-input">
                <label for="from">
                    {{ $t('offersFilter.rating.from') }}
                </label>
                <input type="text" id="from">
            </div>
            <div class="double-input">
                <label for="to">
                    {{ $t('offersFilter.rating.to') }}
                </label>
                <input type="text" id="to">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputDoubleRating'
    }
</script>

<style lang="stylus" scoped>
    .form-group
        display flex
        flex-direction column
        align-items flex-start
        margin-bottom 24px

        label
            margin-bottom 12px
            font-family MuseoSansCyrl500
            font-size 13px
            font-weight bold
            color #34343e

        .double-input-block
            display flex

            .double-input
                position relative
                display flex
                align-items center
                border 1px solid #979797
                background-color #f7f7f7
                border-radius 2px
                padding-left 8px

                label
                    margin-bottom 0
                    font-family MuseoSansCyrl500
                    font-size 12px
                    line-height 1.17
                    color #34343e

                input
                    flex-grow 1
                    font-family MuseoSansCyrl700
                    font-size 12px
                    border none
                    border-radius 2px
                    background-color transparent
                    width 100%
                    padding 6px 8px
                    color #34343e

                &:first-child
                    margin-right 12px
</style>