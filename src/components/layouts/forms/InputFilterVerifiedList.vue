<template>
    <div>
        <div class="form-group">
            <label>
                {{ title }}
            </label>
            <div class="form-radio">
                <label class="control control-radio"
                       v-for="item in options">
                    <input type="radio"
                           name="verified">
                    <div class="control-indicator"></div>
                    <span>{{ item.title }}</span>
                </label>
            </div>
        </div>
        <div class="form-group" v-if="special">
            <div class="form-checkbox">
                <label class="control control-checkbox">
                    <input type="checkbox">
                    <div class="control-indicator"></div>
                    <span class="bold-text">
                        {{ special.title }}
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputVerifiedList',
        props: {
            title: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            special: {
                type: Object
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

        input
            border-radius 2px
            background-color #f7f7f7
            border solid 1px #979797
            width 100%
            padding 6px 8px
            font-family MuseoSansCyrl500
            font-size 12px
            color #34343e

        .form-checkbox, .form-radio
            width 100%

            .control
                input:checked ~ .control-indicator
                    border solid 0.6px #979797

            .control-checkbox, .control-radio
                display flex
                align-items center
                justify-content flex-start
                width 100%

                &:last-child
                    margin-bottom 0

                span
                    padding-left 22px
                    font-family MuseoSansCyrl500
                    font-size 12px
                    color #34343e
                    font-weight 500

                    &.bold-text
                        font-size 13px
                        font-weight bold
</style>