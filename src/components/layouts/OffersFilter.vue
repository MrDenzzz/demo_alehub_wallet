<template>
    <div class="dialog" v-if="qaIsActive">
        <form>

            <input-name/>

            <input-double-rating/>

            <input-double-price/>

            <input-prompt-checkbox-list/>

            <input-certification-list/>

            <input-verified-list/>

            <button type="button"
                    class="buttons btn btn-yellow"
                    @click="clear">
                Clear
            </button>

        </form>
    </div>
</template>

<script>
    import InputName from './forms/InputFilter';
    import InputDoubleRating from './forms/InputFilterDoubleRating';
    import InputDoublePrice from './forms/InputFilterDoublePrice';
    import InputPromptCheckboxList from './forms/InputFilterPromptCheckboxList';
    import InputCertificationList from './forms/InputFilterCertificationList';
    import InputVerifiedList from './forms/InputFilterVerifiedList';

    export default {
        name: 'OffersFilter',
        components: {
            InputName,
            InputDoubleRating,
            InputDoublePrice,
            InputPromptCheckboxList,
            InputVerifiedList,
            InputCertificationList
        },
        data() {
            return {
                qaIsActive: true
            }
        },
        methods: {
            clear: function () {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    .dialog
        width 208px
        border-radius 4px
        background-color #fafafa
        position absolute
        z-index 5
        box-shadow 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        left 54px
        top 158px
        padding 16px

        .btn
            margin-left 0
            width 100%
            height 26px
            padding 0
            font-size 12px
            color #34343e

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

            .one-line
                width 100%
                display flex
                justify-content space-between
                align-items flex-start

                button
                    padding 0
                    border none
                    background-color transparent
                    font-family MuseoSansCyrl500
                    font-size 12px
                    color #34343e
                    opacity 0.5

            .double-input-block
                display flex

                .double-input
                    position relative
                    display flex
                    align-items center
                    border 1px solid #979797
                    border-radius 2px
                    padding-left 8px

                    label
                        margin-bottom 0
                        font-family MuseoSansCyrl500
                        font-size 12px
                        line-height 1.17
                        color #34343e

                    input
                        border none
                        flex-grow 1
                        background-color transparent
                        font-family MuseoSansCyrl700
                        color #979797
                        font-size 12px

                    &:first-child
                        margin-right 12px

            .form-checkbox.country
                overflow-y scroll
                max-height 140px

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

                &.country
                    margin-top 12px

                    label
                        span:first-letter
                            color #ab7713
</style>