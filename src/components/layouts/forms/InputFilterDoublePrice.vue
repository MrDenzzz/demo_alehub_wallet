<template>
    <div class="form-group">
        <label>
            {{ $t('offersFilter.price.title') }}
        </label>
        <div class="double-input-block">
            <div class="single-input">
                <label for="from">
                    {{ $t('offersFilter.price.from') }}
                </label>
                <input type="text" id="from"
                       v-model="from"
                       @blur="emitChangePriceFrom(from)">
            </div>
            <div class="single-input">
                <label for="to">
                    {{ $t('offersFilter.price.to') }}
                </label>
                <input type="text" id="to"
                       v-model="to"
                       @blur="emitChangePriceTo(to)">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputDoublePrice',
        data() {
            return {
                from: '',
                to: ''
            }
        },
        methods: {
            emitChangePriceFrom: function (from) {
                this.$parent.$emit('changePriceFrom', from);
            },
            emitChangePriceTo: function (to) {
                this.$parent.$emit('changePriceTo', to);
            }
        }
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
            flex-direction column

            .single-input
                position relative
                display flex
                align-items center
                border 1px solid #979797
                background-color #f7f7f7
                border-radius 2px
                padding-left 8px

                &:first-child
                    margin-bottom 10px

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
</style>