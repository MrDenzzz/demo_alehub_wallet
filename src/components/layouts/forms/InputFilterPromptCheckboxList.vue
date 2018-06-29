<template>
    <div class="form-group">
        <div class="one-line">
            <label for="country">
                {{ title }}
            </label>
            <button>
                {{ selectAll }}
            </button>
        </div>
        <input type="text" id="country">
        <div class="form-checkbox country">
            <label class="control control-checkbox"
                   v-for="item in list">
                <input type="checkbox">
                <div class="control-indicator"></div>
                <span>{{ item.name }}</span>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputPromptCheckboxList',
        props: {
            title: {
                type: String,
                required: true,
            },
            selectAll: {
                type: String
            },
            list: {
                type: Array,
                required: true
            },
            clear: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            /**
             * watch of the property 'clear', if the property 'clear' is true, it clears the model of the input fields
             *
             * @param val
             */
            clear: function (val) {
                if (val) {
                    // this.from = '';
                    // this.to = '';
                    // this.emitChangeRatingFrom(this.from);
                    // this.emitChangeRatingTo(this.to);
                }
            }
        },
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